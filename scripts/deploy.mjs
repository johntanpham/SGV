#!/usr/bin/env node
// One command per target:
//   npm run preview:deploy  -> hidden build, all checks, guard(preview), deploy to sgvmb-preview (workers.dev)
//   npm run launch          -> production build, all checks, guard(production), deploy to sgvmb (live domain)
import { execSync } from 'node:child_process';

const target = process.argv[2];
if (!['preview', 'production'].includes(target)) {
  console.error('Usage: node scripts/deploy.mjs preview|production');
  process.exit(1);
}
const env = { ...process.env, SITE_MODE: target };
const run = (cmd) => execSync(cmd, { stdio: 'inherit', env });

run('npm run build');
run('npm run check');
run(`node scripts/guard.mjs --target ${target}`);
if (process.argv.includes('--dry-run')) {
  console.log('Dry run: skipping wrangler deploy.');
  process.exit(0);
}
run(target === 'preview' ? 'npx wrangler deploy --env preview' : 'npx wrangler deploy');
if (target === 'production') run('node scripts/indexnow.mjs');
