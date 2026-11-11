#!/usr/bin/env node
// Deploy guard. Inspects the BUILT output (not settings) before anything is deployed.
//   --target production : refuses a hidden build, and refuses if required licence details are missing.
//   --target preview    : refuses a build that isn't fully hidden.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hiddenMarkers, htmlPages } from './lib/build-inspect.mjs';

export function checkBuild(distDir, target) {
  const m = hiddenMarkers(distDir);
  const problems = [];
  if (m.intendedCount === 0) problems.push('No indexable pages found in the build.');

  if (target === 'production') {
    if (m.robotsDisallowAll) problems.push('robots.txt disallows everything (hidden build).');
    if (m.headerNoindex) problems.push('_headers sends X-Robots-Tag: noindex (hidden build).');
    if (m.pagesNoindex.length) problems.push(`${m.pagesNoindex.length} indexable page(s) carry noindex, e.g. ${m.pagesNoindex[0]}`);
    const home = htmlPages(distDir).find((p) => p.path === '/');
    if (home && !/Company NMLS #\d+/.test(home.html)) problems.push('Company NMLS ID is missing from the disclosures (required before launch).');
  } else if (target === 'preview') {
    if (!m.robotsDisallowAll) problems.push('Preview robots.txt must disallow everything.');
    if (!m.headerNoindex) problems.push('Preview must send X-Robots-Tag: noindex.');
    if (!m.allPagesNoindex) problems.push('Every preview page must carry noindex.');
  } else {
    problems.push(`Unknown target "${target}".`);
  }
  return { ok: problems.length === 0, problems, markers: m };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const args = process.argv.slice(2);
  const target = args[args.indexOf('--target') + 1];
  const dir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
  const res = checkBuild(dir, target);
  if (!res.ok) {
    console.error(`\n✖ Deploy guard REFUSED (${target}):`);
    for (const p of res.problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`✔ Deploy guard passed for ${target}.`);
}
