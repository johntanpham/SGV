import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** Every built page (except 404), read from dist/ so new pages are tested automatically. */
export function builtPages(dist = 'dist'): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (n === 'index.html') {
        const rel = relative(dist, d).split(sep).join('/');
        out.push(rel ? `/${rel}/` : '/');
      }
    }
  };
  walk(dist);
  return out.sort();
}
