#!/usr/bin/env node
// Sends IndexNow only the URLs whose content changed in this production build
// (data/changed-urls.json, written by postbuild). `--all` sends every sitemap URL (used at launch).
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'sangabrielvalleymortgagebroker.com';
const { key } = JSON.parse(readFileSync(join(root, 'data', 'indexnow.json'), 'utf8'));

let urls = [];
if (process.argv.includes('--all')) {
  const dist = join(root, 'dist');
  const index = readFileSync(join(dist, 'sitemap-index.xml'), 'utf8');
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const file = join(dist, new URL(loc).pathname);
    if (existsSync(file)) for (const [, u] of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(u);
  }
} else {
  const p = join(root, 'data', 'changed-urls.json');
  urls = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : [];
}

if (!urls.length) {
  console.log('[indexnow] No changed URLs; nothing sent.');
  process.exit(0);
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }),
});
console.log(`[indexnow] Sent ${urls.length} URL(s): HTTP ${res.status}`);
if (res.status >= 400) process.exit(1);
