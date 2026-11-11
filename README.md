# sangabrielvalleymortgagebroker.com

Astro + TypeScript static site for Bao Nguyen (Virchu Financial & Investment), deployed on Cloudflare Workers static assets.

## Commands
| Command | What it does |
|---|---|
| `npm install` | Install everything (first time only) |
| `npm run dev` | Local dev server |
| `npm run build` | Build the **hidden** preview version into `dist/` |
| `npm run check` | Every check: typecheck, unit tests, SEO audit, Playwright (phone + desktop) with axe, Lighthouse mobile |
| `npm run shots` | Screenshots of every page at 320, 375 and 1440 px → `reports/screenshots/` |
| `npm run preview:deploy` | Hidden build → checks → deploy guard → `sgvmb-preview` on workers.dev |
| `npm run launch` | Production build → checks → deploy guard → live domain → IndexNow |

## Where things live
- `src/config/site.ts`: the one config file (name, domain, phone, email, licences, GA4 ID, social links).
- `src/pages/`: one file per page or page type.
- `scripts/postbuild.mjs`: security/cache headers, sitemaps, truthful `lastmod` ledger (`data/content-ledger.json`).
- `scripts/guard.mjs`: refuses to deploy a hidden build to the live site (and an indexable build to the preview).
- `LAUNCH.md`: things only John can do. `CONTENT-REVIEW.md`: claims for a human to check.
