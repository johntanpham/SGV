#!/usr/bin/env node
// Full-page screenshots of every built page at 320, 375 and 1440 px wide -> reports/screenshots/
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const WIDTHS = [320, 375, 1440];
const out = 'reports/screenshots';
mkdirSync(out, { recursive: true });

const pages = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n === 'index.html') {
      const rel = relative('dist', d).split(sep).join('/');
      pages.push(rel ? `/${rel}/` : '/');
    }
  }
})('dist');
pages.push('/this-page-does-not-exist/');

const server = spawn('npx', ['wrangler', 'dev', '--ip', '127.0.0.1', '--port', '4322', '--log-level', 'warn'], { stdio: 'ignore', detached: true });
for (let i = 0; i < 60; i++) { try { if ((await fetch('http://127.0.0.1:4322/')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' });
try {
  for (const path of pages) {
    for (const w of WIDTHS) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: w < 800 ? 2 : 1 });
      await page.goto(`http://127.0.0.1:4322${path}`, { waitUntil: 'networkidle' });
      const name = (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '_')) + `-${w}.png`;
      await page.screenshot({ path: join(out, name), fullPage: true });
      await page.close();
      console.log(`  ${name}`);
    }
  }
} finally {
  await browser.close();
  try { process.kill(-server.pid); } catch {}
}
