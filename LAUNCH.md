# LAUNCH.md: things only John (or Bao/Jade) can do

Tick each box when done. Menu names are current as of November 2026; if a label has moved, search the page for the words in quotes.

## Needed now (before the next checkpoint)

### ☐ 1. Fix the placeholder NMLS on the live site (today)
The current one-page site shows "NMLS #000000". Change it in whatever tool built that page to:
`Bao Nguyen, Broker Associate · DRE #02014645 · NMLS #1317747 · Virchu Financial & Investment, DRE #02075357`

### ☐ 2. O.A.B.M. Inc.'s DRE licence number (last licence detail needed)
Bao's mortgage licence is sponsored by **O.A.B.M. Inc. (dba Virchu Capital), NMLS #1907086** (confirmed on NMLS Consumer Access 2026-11-10).
1. https://www.nmlsconsumeraccess.org → search `1907086` → open O.A.B.M. INC.
2. Under **State Licenses/Registrations**, click **California - DRE** (or **View Details**) → copy the **License Number** (8 digits).
Send it to Claude. The launch command refuses to run until it's on the site.
Also ask Jade/O.A.B.M. to approve Bao advertising loans on this site.

### ✅ 3. Bao's licences (NMLS checked 2026-11-10: authorized to represent O.A.B.M. Inc.; CA DRE broker licence with MLO endorsement, active)
- **DRE:** https://www2.dre.ca.gov/PublicASP/pplinfo.asp → enter `02014645` in "License ID" → Find. Confirm: status "LICENSED", a "Mortgage Loan Originator" endorsement, responsible broker = Virchu.
- **NMLS:** https://www.nmlsconsumeraccess.org → search `1317747` → confirm the California DRE licence shows "Approved" / authorized to represent Virchu.
Tell Claude if anything differs.

### ✅ 4. GitHub
Code lives in the private repository https://github.com/johntanpham/SGV (Claude app installed on it).

### ✅ 5. Connect the repository to Cloudflare (done 2026-11-10; preview: https://sgvmb-preview.johnphamtherealtor.workers.dev) (hidden preview builds itself on every change)
1. https://dash.cloudflare.com → left menu **Workers & Pages** → **Create** (or **Create application**).
2. Choose **Import a repository** → **GitHub** → connect your GitHub account if asked (allow access to the **SGV** repository) → pick **johntanpham/SGV**.
3. Fill in:
   - **Project name:** `sgvmb-preview`
   - **Build command:** `npm run build && node scripts/guard.mjs --target preview`
   - **Deploy command:** `npx wrangler deploy --env preview`
   - **Root directory:** leave blank
4. Open **Advanced settings** → **Build variables** → add `NODE_VERSION` = `22` and `SITE_MODE` = `preview`.
5. Click **Create and deploy**. When the build finishes, the preview link (ending in `.workers.dev`) is shown at the top. Send it to Claude.
(The Cloudflare API token is not needed; deploys run inside Cloudflare.)

## Needed at launch (Claude will walk you through these when you say go)

### ☐ 6. Domain on Cloudflare
- **Workers & Pages** → `sgvmb` → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `sangabrielvalleymortgagebroker.com`.
- **www redirect:** select the domain → **Rules** → **Redirect Rules** → **Create rule** → template "Redirect from WWW to root" → Deploy.
- **https only:** domain → **SSL/TLS** → **Edge Certificates** → turn on **Always Use HTTPS**.

### ☐ 7. Let AI search crawlers in
Domain → **Security** → **Bots** (or **AI Crawl Control**):
- Turn **off** "Block AI bots" / "Block AI training bots".
- Turn **off** "Manage your robots.txt" (the site serves its own robots.txt that welcomes GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended and CCBot).
- Leave "Bot Fight Mode" off for verified bots.

### ☐ 8. Google Search Console + Bing
- https://search.google.com/search-console → **Add property** → **Domain** → `sangabrielvalleymortgagebroker.com` → choose **Cloudflare** when asked to verify → Authorize.
- **Sitemaps** (left menu) → submit `sitemap-index.xml`.
- https://www.bing.com/webmasters → **Import from Google Search Console**.

### ☐ 9. Google Analytics 4
https://analytics.google.com → **Admin** (gear) → **Create** → **Property** → name "SGV Mortgage Broker", time zone Pacific → **Web** stream → URL `sangabrielvalleymortgagebroker.com` → copy the **Measurement ID** (`G-…`) and send it to Claude. In **Admin → Data collection**, leave **Google signals off**.

### ☐ 10. Google Business Profile
Check with Jade whether Virchu already has a profile for 3626 S Nogales St. If Bao wants his own (individual practitioner), create it at https://business.google.com with the same address and phone (818) 621-0094, category "Mortgage broker", and the website URL. Don't create duplicates.

### ☐ 11. Broker sign-off
Jade Chu (responsible broker) reviews the preview and approves the advertising before launch.
