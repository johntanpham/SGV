// Shared helpers that read the built site in dist/. Used by postbuild, the guard and the SEO audit.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

export function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** dist/a/b/index.html -> /a/b/ ; dist/index.html -> / ; dist/404.html -> /404.html */
export function urlPathFor(distDir, file) {
  const rel = relative(distDir, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

export function htmlPages(distDir) {
  return walk(distDir)
    .filter((f) => f.endsWith('.html'))
    .map((file) => {
      const html = readFileSync(file, 'utf8');
      return { file, path: urlPathFor(distDir, file), html, ...parsePage(html) };
    });
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : null;
};

export function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

export function parsePage(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const metaContent = (name) => {
    const t = metas.find((m) => (attr(m, 'name') || '').toLowerCase() === name);
    return t ? decode(attr(t, 'content') || '') : null;
  };
  const titleM = html.match(/<title>([\s\S]*?)<\/title>/i);
  const canonM = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i);
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const mainM = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((m) => decode(m[1]));
  const srcs = [...html.matchAll(/\b(?:src|srcset)="([^"]+)"/gi)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim().split(/\s+/)[0]),
  );
  return {
    title: titleM ? decode(titleM[1].trim()) : null,
    description: metaContent('description'),
    robots: metaContent('robots'),
    canonical: canonM ? attr(canonM[0], 'href') : null,
    indexable: attr(htmlTag, 'data-indexable') === 'true',
    lang: attr(htmlTag, 'lang'),
    mainText: mainM ? decode(mainM[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() : '',
    ldBlocks,
    h1Count,
    hrefs,
    srcs,
  };
}

export function contentHash(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

/** Sitemap group for a URL path (one sitemap per page type). */
export function pageType(path) {
  const seg = path.split('/').filter(Boolean)[0] || '';
  if (seg === 'vi') return 'vi';
  if (['loans', 'real-estate', 'areas', 'guides', 'tools'].includes(seg)) return seg;
  return 'pages';
}

export function readText(p) {
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
}

/** Markers that make a build "hidden". */
export function hiddenMarkers(distDir) {
  const robots = readText(join(distDir, 'robots.txt'));
  const headers = readText(join(distDir, '_headers'));
  const pages = htmlPages(distDir);
  const robotsDisallowAll = /^Disallow:\s*\/\s*$/m.test(robots) && !/^Allow:/m.test(robots);
  const headerNoindex = /X-Robots-Tag:\s*noindex/i.test(headers);
  const intended = pages.filter((p) => p.indexable);
  const pagesNoindex = intended.filter((p) => /noindex/i.test(p.robots || '')).map((p) => p.path);
  return {
    robotsDisallowAll,
    headerNoindex,
    pagesNoindex,
    intendedCount: intended.length,
    allPagesNoindex: intended.length > 0 && pagesNoindex.length === intended.length,
  };
}
