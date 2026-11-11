#!/usr/bin/env node
// One command per target. Cloudflare Workers Builds does the actual upload:
//   - pushes to `main`        -> sgvmb-preview (hidden; guard --target preview runs in Cloudflare)
//   - pushes to `production`  -> sgvmb (live domain; guard --target production + IndexNow run in Cloudflare)
//
//   npm run preview:deploy  -> hidden build + every check locally, then push main
//   npm run launch          -> production build + every check + guard locally, commit the
//                              content ledger (truthful lastmod / changed URLs), push main and production
import { execSync } from 'node:child_process';

const target = process.argv[2];
if (!['preview', 'production'].includes(target)) {
  console.error('Usage: node scripts/deploy.mjs preview|production');
  process.exit(1);
}
const env = { ...process.env, SITE_MODE: target };
const run = (cmd, e = env) => execSync(cmd, { stdio: 'inherit', env: e });

run('npm run build');
run('npm run check');
run(`node scripts/guard.mjs --target ${target}`);
if (process.argv.includes('--dry-run')) {
  console.log('Dry run: not pushing.');
  process.exit(0);
}
const git = 'git -c user.name="Claude" -c user.email="noreply@anthropic.com"';
if (target === 'production') {
  run('git add data/content-ledger.json data/changed-urls.json');
  try {
    run(`${git} commit -m "Content ledger update for launch"`);
  } catch {
    console.log('Ledger unchanged.');
  }
  run('git push origin main');
  run('git push origin main:production');
  // Restore the hidden build locally so nothing indexable lingers in dist/.
  run('npm run build', { ...process.env, SITE_MODE: 'preview' });
} else {
  run('git push origin main');
}
