#!/usr/bin/env node
// SEO audit over the whole build. Fails (exit 1) on any problem.
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlPages, readText } from './lib/build-inspect.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ORIGIN = 'https://sangabrielvalleymortgagebroker.com';
const mode = process.env.SITE_MODE === 'production' ? 'production' : 'preview';
const errors = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);

const pages = htmlPages(dist);
const titles = new Map();
const descs = new Map();

function resolves(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;
  let file = join(dist, decodeURIComponent(clean));
  if (clean.endsWith('/')) file = join(file, 'index.html');
  return existsSync(file);
}

for (const p of pages) {
  const isErrorPage = p.path === '/404.html';
  // Links and assets on every page, including 404.
  for (const href of p.hrefs) {
    if (href.startsWith('/') && !href.startsWith('//')) {
      if (!resolves(href)) err(p.path, `broken internal link ${href}`);
      else if (!href.split('#')[0].endsWith('/') && !/\.[a-z0-9]+$/i.test(href.split('#')[0]) && href.split('#')[0] !== '')
        err(p.path, `internal link without trailing slash ${href}`);
    }
  }
  for (const src of p.srcs) if (src.startsWith('/') && !src.startsWith('//') && !resolves(src)) err(p.path, `missing asset ${src}`);
  if (!p.canonical) err(p.path, 'no canonical tag');
  if (!p.robots) err(p.path, 'no robots meta');
  for (const block of p.ldBlocks) {
    try {
      const j = JSON.parse(block);
      if (j['@context'] !== 'https://schema.org') err(p.path, 'JSON-LD missing @context');
      const nodes = j['@graph'] || [j];
      const types = nodes.flatMap((n) => [].concat(n['@type']));
      for (const t of ['WebSite', 'Organization', 'BreadcrumbList']) if (!types.includes(t)) err(p.path, `JSON-LD missing ${t}`);
      for (const n of nodes) if (!n['@type']) err(p.path, 'JSON-LD node without @type');
    } catch (e) {
      err(p.path, `invalid JSON-LD: ${e.message}`);
    }
  }
  if (!p.ldBlocks.length) err(p.path, 'no JSON-LD');
  if (isErrorPage) {
    if (!/noindex/.test(p.robots || '')) err(p.path, '404 page must be noindex');
    continue;
  }
  if (!p.indexable) {
    if (!/noindex,\s*follow/.test(p.robots || '')) err(p.path, 'long-tail page must be "noindex, follow"');
    continue;
  }
  // Indexable pages.
  if (p.h1Count !== 1) err(p.path, `expected 1 <h1>, found ${p.h1Count}`);
  if (!p.title) err(p.path, 'no <title>');
  else {
    if (p.title.length > 60) err(p.path, `title is ${p.title.length} chars (max 60): "${p.title}"`);
    if (titles.has(p.title)) err(p.path, `duplicate title (also on ${titles.get(p.title)})`);
    titles.set(p.title, p.path);
  }
  if (!p.description) err(p.path, 'no meta description');
  else {
    const n = p.description.length;
    if (n < 120 || n > 160) err(p.path, `description is ${n} chars (want 120-160)`);
    if (descs.has(p.description)) err(p.path, `duplicate description (also on ${descs.get(p.description)})`);
    descs.set(p.description, p.path);
  }
  if (p.canonical !== `${ORIGIN}${p.path}`) err(p.path, `canonical ${p.canonical} != ${ORIGIN}${p.path}`);
  if (mode === 'production') {
    if (p.robots !== 'index, follow, max-image-preview:large') err(p.path, `robots is "${p.robots}" on an indexable page`);
  } else if (!/noindex/.test(p.robots || '')) err(p.path, 'preview build page is missing noindex');
  if (p.mainText.length < 400) err(p.path, `thin page: only ${p.mainText.length} chars of main text`);
}

// 404 page exists.
if (!existsSync(join(dist, '404.html'))) errors.push('dist/404.html missing');

// Sitemaps: every URL exists and is an indexable canonical page.
const indexable = new Set(pages.filter((p) => p.indexable && p.path !== '/404.html').map((p) => p.canonical));
const index = readText(join(dist, 'sitemap-index.xml'));
if (!index) errors.push('sitemap-index.xml missing');
const listed = new Set();
for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const file = join(dist, new URL(loc).pathname);
  if (!existsSync(file)) {
    errors.push(`sitemap index lists missing file ${loc}`);
    continue;
  }
  for (const [, u] of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    listed.add(u);
    if (!indexable.has(u)) errors.push(`sitemap lists non-indexable or missing URL ${u}`);
  }
}
for (const u of indexable) if (!listed.has(u)) errors.push(`indexable page not in any sitemap: ${u}`);

// robots.txt
const robots = readText(join(dist, 'robots.txt'));
if (mode === 'production') {
  if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap-index.xml`)) errors.push('robots.txt missing Sitemap line');
  for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'])
    if (!robots.includes(`User-agent: ${bot}`)) errors.push(`robots.txt does not name ${bot}`);
} else if (!/^Disallow:\s*\/\s*$/m.test(robots)) errors.push('preview robots.txt must disallow everything');

console.log(`[seo-audit] mode=${mode} pages=${pages.length} indexable=${indexable.size} sitemap-urls=${listed.size}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} SEO problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('✔ SEO audit passed.');
