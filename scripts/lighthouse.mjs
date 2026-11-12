#!/usr/bin/env node
// Lighthouse (mobile) on one page of each type. Fails below: performance 90, a11y/best-practices/SEO 100.
// SEO is scored with the "is-crawlable" audit skipped in preview builds, because preview is noindex on purpose.
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';

const PAGES = ['/', '/areas/', '/areas/rosemead/', '/real-estate/', '/real-estate/sell/', '/loan-officer/', '/vi/', '/vi/areas/el-monte/', '/about/bao-nguyen/'].filter((p) => existsSync(`dist${p}index.html`));
const mode = process.env.SITE_MODE === 'production' ? 'production' : 'preview';
const MIN = { performance: 90, accessibility: 100, 'best-practices': 100, seo: 100 };
mkdirSync('reports/lighthouse', { recursive: true });

const server = spawn('npx', ['wrangler', 'dev', '--ip', '127.0.0.1', '--port', '4323', '--log-level', 'warn'], { stdio: 'ignore', detached: true });
for (let i = 0; i < 60; i++) { try { if ((await fetch('http://127.0.0.1:4323/')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
let failed = false;
try {
  for (const path of PAGES) {
    const name = path === '/' ? 'home' : path.replace(/\//g, '');
    const outPath = `reports/lighthouse/${name}.json`;
    const args = [
      'lighthouse',
      `http://127.0.0.1:4323${path}`,
      '--quiet',
      '--output=json',
      `--output-path=${outPath}`,
      '--chrome-flags=--headless=new --no-sandbox',
      '--form-factor=mobile',
      '--only-categories=performance,accessibility,best-practices,seo',
    ];
    if (mode === 'preview') args.push('--skip-audits=is-crawlable');
    execFileSync('npx', args, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH || '/usr/bin/google-chrome' } });
    const r = JSON.parse(readFileSync(outPath, 'utf8'));
    const scores = Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
    const lcp = r.audits['largest-contentful-paint'].numericValue / 1000;
    const cls = r.audits['cumulative-layout-shift'].numericValue;
    const tbt = r.audits['total-blocking-time'].numericValue;
    console.log(`${path}  perf ${scores.performance} · a11y ${scores.accessibility} · bp ${scores['best-practices']} · seo ${scores.seo} · LCP ${lcp.toFixed(2)}s · CLS ${cls.toFixed(3)} · TBT ${Math.round(tbt)}ms`);
    for (const [k, min] of Object.entries(MIN)) if (scores[k] < min) { console.error(`  ✖ ${k} ${scores[k]} < ${min}`); failed = true; }
    if (lcp > 2.5) { console.error(`  ✖ LCP ${lcp.toFixed(2)}s > 2.5s`); failed = true; }
    if (cls > 0.1) { console.error(`  ✖ CLS ${cls} > 0.1`); failed = true; }
  }
} finally {
  try { process.kill(-server.pid); } catch {}
}
if (failed) process.exit(1);
console.log('✔ Lighthouse thresholds met.');
