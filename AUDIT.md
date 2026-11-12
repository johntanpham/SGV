# Site quality audit, Nov 11, 2026

I reviewed sangabrielvalleymortgagebroker.com against Google's quality guidelines, with the stricter "Your Money or Your Life" standard that applies to mortgage and real estate sites. The audit covered thin or duplicate pages, titles, structured data, speed and broken links.

## Fixed

| Area | Finding | Fix |
|---|---|---|
| Duplicate content | The 8 city pages shared a template; worst pairs overlapped 56–59% (5-word phrase match, header and footer included). | Each city page now has a "How [city] compares" section built from its own Census numbers, a refinance paragraph that changes with the city's owner rate, and two city-specific FAQs (its median home value, and whether county down payment help applies there). The worst pair is now 52%, and much of what remains is the shared header and footer. |
| Trust (E-E-A-T) | There was no About, Contact, Licenses or Privacy page. A mortgage site without these looks anonymous to reviewers. | Built all four in English and Vietnamese (8 pages). "About" is in the header; all four are in the footer. The Licenses page links to the official NMLS and DRE record for Bao, O.A.B.M. Inc. and Jade Rose Financial. |
| Structured data | Bao's Person entry had no `sameAs` links; the business had no logo. | Added `sameAs` (his NMLS and DRE records), `alumniOf`, a profile URL, an Organization `logo` (new 512 px PNG) and `image`. The About page is a `ProfilePage` and Contact is a `ContactPage`. |
| Freshness | Data sources had no visible dates. | Every source line now shows when it was checked (Census and LACDA Nov 10; FHFA, HUD and CalHFA Nov 11). Trust pages show "Last updated". |
| Links | The CalHFA URL had never been checked. | Confirmed against CalHFA's own page. Up to 3.5% applies with an FHA first loan and 3% with a conventional loan; the site's "up to 3.5%" is accurate. All other outbound links were checked: FHFA, HUD, NMLS, LACDA, Census and Neilsberg. No broken internal links (Playwright crawls every page). |
| Header | The new nav item would have wrapped the header. | Tightened spacing; the header stays on one row at 375 px and on desktop. |

## Already good (no change needed)
- **Titles and descriptions:** all 37 are unique, every title is 60 characters or fewer, and every description is 120–160. The SEO audit script passes.
- **Speed (Lighthouse mobile):** performance 98–100, accessibility, best practices and SEO all 100, LCP about 0.63 s, CLS 0.
- **Accessibility:** axe finds 0 violations; 372 browser tests pass on phone and desktop.
- **Indexing:** canonical tags, hreflang for en, vi and x-default, sitemaps, robots.txt, and IndexNow on every deploy.

## Still to do (needs you or Bao)
1. **Google Search Console and Bing Webmaster Tools.** Verify the domain (Cloudflare DNS makes it one click) and submit `/sitemap-index.xml`. This is the biggest remaining step.
2. **Google Business Profile** for Bao at the West Covina office, linked to the site. This matters most for map results.
3. **Real reviews.** Ask past clients for Google reviews. Do not put reviews on the site until they are real and attributable.
4. **A sharper headshot** (at least 600 px wide). The current photo is 280 px.
5. **Sign-offs:** Bao reviews `CONTENT-REVIEW.md` (items 8–12 are new), `VI-REVIEW.md` and `DATA-REVIEW.md`. Jade / O.A.B.M. approve the disclosures and the Privacy page; it was written in plain language, not by a lawyer.
6. **Unique link-preview images per page.** Every page currently shares one image. It looks fine but is generic.
7. **Deeper content.** Guides (e.g. cash-out refinance in LA County, FHA limits explained) would earn links and long-tail searches. Service pages are short (about 300 words) by your request, which is fine for conversions.
8. **Citations and backlinks:** Yelp, Zillow and Realtor.com agent profiles, Vietnamese community directories, and Virchu's site linking here. Add any profile URLs to `social` in `src/config/site.ts` so they appear in the schema.
9. **Late November:** update the 2027 loan limits when FHFA publishes them.
