# EDITING.md: how to change the website yourself (no Claude needed)

Everything is done in your web browser on github.com. No software to install.

## How it works
- **`main` branch** = the hidden preview: https://sgvmb-preview.johnphamtherealtor.workers.dev
- **`production` branch** = the live site: https://sangabrielvalleymortgagebroker.com
- Save a change to `main` → Cloudflare rebuilds the preview in about 1 minute → check it → copy it to `production` → the live site updates in about 1 minute.
- Safety net: if a change breaks the build, Cloudflare does not publish it. The last good version stays live.

## Step 1: Make the change
1. Sign in at https://github.com/johntanpham/SGV
2. Click into the folders to the file you want (see the table below), for example `src` → `config` → `site.ts`.
3. Click the **pencil icon** (Edit this file) at the top right of the file.
4. Change only the text **inside the quote marks**. Don't delete quotes, commas or brackets.
5. Click the green **Commit changes…** button → leave "Commit directly to the main branch" selected → **Commit changes**.

## Step 2: Check the preview
Wait about a minute, then open https://sgvmb-preview.johnphamtherealtor.workers.dev and look at your change.
(If nothing changed after 3 minutes, the build probably failed: Cloudflare → Workers & Pages → sgvmb-preview → Deployments shows the error. Undo your edit the same way you made it.)

## Step 3: Publish to the live site
1. Open https://github.com/johntanpham/SGV/compare/production...main
2. Click **Create pull request** → **Create pull request** again.
3. Click **Merge pull request** → **Confirm merge**.
4. About a minute later the change is live at https://sangabrielvalleymortgagebroker.com

## Where things live
| To change… | Edit this file |
|---|---|
| Phone, email, licence numbers, office address, Google Analytics ID | `src/config/site.ts` |
| Home page text (English) | `src/pages/index.astro` |
| Home page text (Vietnamese) | `src/pages/vi/index.astro` |
| City facts (population, home values, ZIPs, intro sentence) | `src/data/cities.ts` |
| City page wording (all cities at once) | `src/i18n/city-copy.ts` |
| Buttons, footer and disclaimer wording (both languages) | `src/i18n/strings.ts` |
| Loan limits, LA County program amounts | `src/data/loan-limits.ts` |
| Bao's photo | `public/images/` → **Add file** → **Upload files** → upload a new `bao-nguyen.png` with the same name |

## Undo a live change in one click
Cloudflare → Workers & Pages → **sgvmb** → **Deployments** → on an earlier version click **⋯** → **Rollback**.

## Yearly reminders
- **Late November:** FHFA publishes next year's loan limits. Update `src/data/loan-limits.ts`.
- **Before Feb 2027:** Bao's and Jade Rose Financial's DRE licences renew. Licence numbers stay the same.
