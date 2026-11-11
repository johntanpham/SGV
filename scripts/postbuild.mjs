#!/usr/bin/env node
// Runs after `astro build`:
//  1. writes dist/_headers (security + caching, plus X-Robots-Tag in preview)
//  2. writes sitemaps split by page type, with lastmod from the content-hash ledger
//     (the ledger only changes on production builds, so dates move only when live content changes)
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlPages, contentHash, pageType } from './lib/build-inspect.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ledgerPath = join(root, 'data', 'content-ledger.json');
const mode = process.env.SITE_MODE === 'production' ? 'production' : 'preview';
const ORIGIN = 'https://sangabrielvalleymortgagebroker.com';
const today = new Date().toISOString().slice(0, 10);

// ---------- 1. _headers ----------
const security = [
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  '  X-Frame-Options: DENY',
  '  Strict-Transport-Security: max-age=31536000; includeSubDomains',
];
if (mode === 'preview') security.push('  X-Robots-Tag: noindex');
const headers = [
  '/*',
  ...security,
  '',
  '/_astro/*',
  '  Cache-Control: public, max-age=31536000, immutable',
  '',
  '/fonts/*',
  '  Cache-Control: public, max-age=31536000, immutable',
  '',
].join('\n');
writeFileSync(join(dist, '_headers'), headers);

// ---------- 2. Sitemaps ----------
const ledger = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, 'utf8')) : {};
const pages = htmlPages(dist).filter((p) => p.indexable && p.canonical && !p.path.endsWith('404.html'));
const groups = {};
let changed = 0;
for (const p of pages) {
  const hash = contentHash(p.mainText);
  const prev = ledger[p.canonical];
  let lastmod = prev?.lastmod ?? today;
  if (!prev || prev.hash !== hash) {
    lastmod = today;
    if (mode === 'production') {
      ledger[p.canonical] = { hash, lastmod };
      changed++;
    }
  }
  (groups[pageType(p.path)] ??= []).push({ loc: p.canonical, lastmod });
}
if (mode === 'production') {
  mkdirSync(dirname(ledgerPath), { recursive: true });
  writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
}

const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const indexEntries = [];
for (const [type, urls] of Object.entries(groups).sort()) {
  urls.sort((a, b) => a.loc.localeCompare(b.loc));
  const body = urls.map((u) => `  <url><loc>${xmlEscape(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n');
  writeFileSync(
    join(dist, `sitemap-${type}.xml`),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  );
  const newest = urls.map((u) => u.lastmod).sort().at(-1);
  indexEntries.push(`  <sitemap><loc>${ORIGIN}/sitemap-${type}.xml</loc><lastmod>${newest}</lastmod></sitemap>`);
}
writeFileSync(
  join(dist, 'sitemap-index.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries.join('\n')}\n</sitemapindex>\n`,
);

// Changed URLs for IndexNow (production only).
if (mode === 'production') {
  const changedUrls = Object.entries(ledger)
    .filter(([, v]) => v.lastmod === today)
    .map(([k]) => k);
  writeFileSync(join(root, 'data', 'changed-urls.json'), JSON.stringify(changedUrls, null, 2) + '\n');
}

console.log(`[postbuild] mode=${mode} pages=${pages.length} sitemaps=${Object.keys(groups).length} ledger-updates=${changed}`);
