import { describe, it, expect, beforeAll } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkBuild } from '../../scripts/guard.mjs';

const page = (robots: string, nmls = true) =>
  `<!doctype html><html lang="en" data-indexable="true"><head><title>T</title><meta name="robots" content="${robots}"></head><body><main>x</main><footer>${nmls ? 'Company NMLS #123456' : ''}</footer></body></html>`;

function fakeBuild(opts: { robots: string; headers: string; meta: string; nmls?: boolean }) {
  const dir = mkdtempSync(join(tmpdir(), 'guard-'));
  writeFileSync(join(dir, 'robots.txt'), opts.robots);
  writeFileSync(join(dir, '_headers'), opts.headers);
  writeFileSync(join(dir, 'index.html'), page(opts.meta, opts.nmls ?? true));
  return dir;
}

let hidden: string, live: string, liveNoNmls: string, mixed: string;
beforeAll(() => {
  hidden = fakeBuild({ robots: 'User-agent: *\nDisallow: /\n', headers: '/*\n  X-Robots-Tag: noindex\n', meta: 'noindex, follow' });
  live = fakeBuild({ robots: 'User-agent: *\nAllow: /\n', headers: '/*\n  X-Frame-Options: DENY\n', meta: 'index, follow, max-image-preview:large' });
  liveNoNmls = fakeBuild({ robots: 'User-agent: *\nAllow: /\n', headers: '/*\n', meta: 'index, follow, max-image-preview:large', nmls: false });
  mixed = fakeBuild({ robots: 'User-agent: *\nAllow: /\n', headers: '/*\n  X-Robots-Tag: noindex\n', meta: 'index, follow, max-image-preview:large' });
});

describe('deploy guard', () => {
  it('REFUSES to put a hidden build on the live site', () => {
    const r = checkBuild(hidden, 'production');
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toMatch(/robots\.txt disallows everything/);
  });
  it('refuses a production build that still sends X-Robots-Tag: noindex', () => {
    expect(checkBuild(mixed, 'production').ok).toBe(false);
  });
  it('refuses production while the company NMLS ID is missing', () => {
    const r = checkBuild(liveNoNmls, 'production');
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toMatch(/Company NMLS/);
  });
  it('accepts a fully indexable production build', () => {
    expect(checkBuild(live, 'production')).toMatchObject({ ok: true });
  });
  it('accepts a fully hidden preview build', () => {
    expect(checkBuild(hidden, 'preview')).toMatchObject({ ok: true });
  });
  it('REFUSES to deploy an indexable build as the preview', () => {
    expect(checkBuild(live, 'preview').ok).toBe(false);
  });
});
