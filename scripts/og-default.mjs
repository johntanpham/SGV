#!/usr/bin/env node
// Generates the default 1200x630 link-preview image (public/og/default.png).
// Per-page images are generated in a later build step.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(join(root, 'public', 'og'), { recursive: true });
const photo = readFileSync(join(root, 'public', 'images', 'bao-nguyen.png')).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b3a35"/>
  <rect x="0" y="590" width="1200" height="40" fill="#d9a441"/>
  <text x="80" y="170" font-family="DejaVu Serif, serif" font-size="30" fill="#d9a441" font-weight="bold" letter-spacing="3">SAN GABRIEL VALLEY</text>
  <text x="80" y="255" font-family="DejaVu Serif, serif" font-size="68" fill="#ffffff" font-weight="bold">Mortgage Broker</text>
  <text x="80" y="335" font-family="DejaVu Serif, serif" font-size="68" fill="#ffffff" font-weight="bold">&amp; Realtor</text>
  <text x="80" y="420" font-family="DejaVu Sans, sans-serif" font-size="32" fill="#e3efec">Bao Nguyen · Refinance · Cash-out · Buy &amp; sell</text>
  <text x="80" y="480" font-family="DejaVu Sans, sans-serif" font-size="26" fill="#e3efec">DRE #02014645 · NMLS #1317747 · English &amp; Tiếng Việt</text>
  <clipPath id="c"><rect x="880" y="150" width="240" height="228" rx="20"/></clipPath>
  <image href="data:image/png;base64,${photo}" x="880" y="150" width="240" height="228" clip-path="url(#c)"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, 'public', 'og', 'default.png'));
console.log('Wrote public/og/default.png');
