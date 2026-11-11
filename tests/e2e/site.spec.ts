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
        return { text: el.textContent?.trim(), outline: s.outlineStyle, top: el.getBoundingClientRect().top };
      });
      expect(focused.text).toBe('Skip to content');
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
