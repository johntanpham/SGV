import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { builtPages } from './pages';

const pages = builtPages();

function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(m.text());
  });
  page.on('pageerror', (e) => problems.push(e.message));
  return problems;
}

for (const path of pages) {
  test.describe(path, () => {
    test('loads with status 200, one h1 and no console errors', async ({ page }) => {
      const problems = trackConsole(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(problems, problems.join('\n')).toEqual([]);
    });

    test('full text is in the HTML without JavaScript', async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const p = await ctx.newPage();
      await p.goto(path);
      const text = await p.locator('main').innerText();
      expect(text.length).toBeGreaterThan(200);
      await ctx.close();
    });

    test('has zero axe accessibility violations', async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) - ${v.help}`);
      expect(summary, summary.join('\n')).toEqual([]);
    });

    test('no sideways scrolling at 320px and tap targets are at least 44px', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('a, button, input, select, textarea')]
          .filter((el) => {
            // Inline links inside running text are exempt (WCAG 2.5.8 inline exception).
            if (el.tagName === 'A' && el.closest('p') && !el.classList.contains('btn')) return false;
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) return false;
            return r.height < 44 && !el.classList.contains('skip-link');
          })
          .map((el) => `${el.tagName} "${(el.textContent || '').trim().slice(0, 40)}" ${Math.round(el.getBoundingClientRect().height)}px`),
      );
      expect(small, small.join('\n')).toEqual([]);
    });

    test('keyboard: skip link is first and focus is visible', async ({ page }) => {
      await page.goto(path);
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        const s = getComputedStyle(el);
        return { isSkip: el.classList.contains('skip-link'), text: el.textContent?.trim(), lang: document.documentElement.lang, outline: s.outlineStyle, top: el.getBoundingClientRect().top };
      });
      expect(focused.isSkip).toBe(true);
      expect(focused.text).toBe(focused.lang === 'vi' ? 'Chuyển đến nội dung' : 'Skip to content');
      expect(focused.outline).not.toBe('none');
      expect(focused.top).toBeGreaterThanOrEqual(0);
    });
  });
}

test('unknown URLs return the 404 page with a 404 status', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText(/couldn't find/i);
});

test('every page shows the licence disclosures and Equal Housing Opportunity', async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const footer = page.locator('footer');
    await expect(footer).toContainText('DRE #02014645');
    await expect(footer).toContainText('NMLS #1317747');
    await expect(footer).toContainText('DRE #02075357');
    await expect(footer).toContainText('O.A.B.M. Inc.');
    await expect(footer).toContainText('NMLS #1907086');
    await expect(footer).toContainText('DRE #02101087');
    await expect(footer).toContainText('Jade Rose Financial Inc.');
    await expect(footer).toContainText('Equal Housing Opportunity');
  }
});

test('security headers are sent, and preview builds send X-Robots-Tag: noindex', async ({ request }) => {
  const res = await request.get('/');
  const h = res.headers();
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBeTruthy();
  expect(h['permissions-policy']).toBeTruthy();
  expect(h['x-frame-options']).toBe('DENY');
  if (process.env.SITE_MODE !== 'production') expect(h['x-robots-tag']).toBe('noindex');
  else expect(h['x-robots-tag']).toBeUndefined();
});

test('language switch links each page to its twin, with hreflang tags', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const toVi = page.locator('header a.lang-switch');
  await expect(toVi).toHaveAttribute('href', '/vi/');
  await expect(page.locator('link[hreflang="vi"]')).toHaveAttribute('href', 'https://sangabrielvalleymortgagebroker.com/vi/');
  await toVi.click();
  await expect(page).toHaveURL(/\/vi\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('h1')).toContainText('Môi giới vay');
  await expect(page.locator('footer')).toContainText('Khoản vay thế chấp được thực hiện qua');
  await expect(page.locator('header a.lang-switch')).toHaveAttribute('href', '/');
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://sangabrielvalleymortgagebroker.com/');
});

test('every city page links to every other city page', async ({ page }) => {
  const cityPaths = pages.filter((p) => /^\/(vi\/)?areas\/[a-z-]+\/$/.test(p));
  for (const path of cityPaths) {
    await page.goto(path);
    const prefix = path.startsWith('/vi/') ? '/vi/areas/' : '/areas/';
    const siblings = cityPaths.filter((p) => p !== path && p.startsWith(prefix));
    const hrefs = await page.locator('main a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const s of siblings) expect(hrefs, `${path} should link to ${s}`).toContain(s);
  }
});

test('FAQ sections carry FAQPage structured data', async ({ page }) => {
  for (const path of ['/', '/vi/', '/areas/', '/areas/rosemead/', '/vi/areas/rosemead/']) {
    await page.goto(path);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) || '{}');
    const faq = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq, path).toBeTruthy();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
    await expect(page.locator('section.faq h3')).toHaveCount(faq.mainEntity.length);
  }
});
