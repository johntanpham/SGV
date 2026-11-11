# LAUNCH.md: things only John (or Bao/Jade) can do

Tick each box when done. Menu names are current as of November 2026; if a label has moved, search the page for the words in quotes.

## Needed now (before the next checkpoint)

### ☐ 1. Fix the placeholder NMLS on the live site (today)
The current one-page site shows "NMLS #000000". Change it in whatever tool built that page to:
`Bao Nguyen, Broker Associate · DRE #02014645 · NMLS #1317747 · Virchu Financial & Investment, DRE #02075357`

### ☐ 2. Get Virchu's company NMLS ID
Ask Jade, or look it up:
1. Go to https://www.nmlsconsumeraccess.org
2. Tick the box to accept the terms, type `Virchu` in the search box, press Search.
3. Open the COMPANY result and copy the "NMLS ID".
Send it to Claude. The launch command refuses to run until it's in the site.

### ☐ 3. Double-check Bao's licences (2 minutes)
- **DRE:** https://www2.dre.ca.gov/PublicASP/pplinfo.asp → enter `02014645` in "License ID" → Find. Confirm: status "LICENSED", a "Mortgage Loan Originator" endorsement, responsible broker = Virchu.
- **NMLS:** https://www.nmlsconsumeraccess.org → search `1317747` → confirm the California DRE licence shows "Approved" / authorized to represent Virchu.
Tell Claude if anything differs.

### ☐ 4. Create a free GitHub account (for the edit-it-yourself dashboard and to keep the code safe)
1. Go to https://github.com/signup
2. Enter your email, a password and a username (e.g. `johnpham-sites`). Verify the email code.
3. Choose the **Free** plan.
4. Tell Claude your username. Claude will then ask you to connect GitHub to Claude so it can create the repository.

### ☐ 5. Cloudflare API token (lets Claude deploy the hidden preview)
1. Log in at https://dash.cloudflare.com
2. Top-right person icon → **My Profile** → **API Tokens** → **Create Token**.
3. Next to **"Edit Cloudflare Workers"** click **Use template**.
4. Account Resources: *Include → your account*. Zone Resources: *Include → Specific zone → sangabrielvalleymortgagebroker.com*.
5. **Continue to summary** → **Create Token** → copy the token (shown once).
6. Also copy your **Account ID**: left menu **Workers & Pages** → it's on the right side of the overview page.
Send both to Claude. After launch you can delete ("Roll") the token from the same page at any time.

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
