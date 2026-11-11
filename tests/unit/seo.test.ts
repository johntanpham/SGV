import { describe, it, expect } from 'vitest';
import { canonicalUrl, buildTitle, breadcrumbLd, organizationLd, agentLd, mortgageCompanyLd } from '../../src/lib/seo';
import { formatPhone, telHref, agent, brokerage, mortgageCompany } from '../../src/config/site';
import { robotsBody, AI_CRAWLERS } from '../../src/pages/robots.txt';
import { pageType, urlPathFor, parsePage, contentHash } from '../../scripts/lib/build-inspect.mjs';

describe('canonicalUrl', () => {
  it('adds the origin and a trailing slash', () => {
    expect(canonicalUrl('/loans/fha')).toBe('https://sangabrielvalleymortgagebroker.com/loans/fha/');
    expect(canonicalUrl('/')).toBe('https://sangabrielvalleymortgagebroker.com/');
  });
  it('leaves files alone', () => {
    expect(canonicalUrl('/robots.txt')).toBe('https://sangabrielvalleymortgagebroker.com/robots.txt');
  });
});

describe('buildTitle', () => {
  it('puts the brand last when it fits in 60 chars', () => {
    expect(buildTitle('FHA Loans in the SGV')).toBe('FHA Loans in the SGV | SGV Mortgage Broker');
  });
  it('drops the brand rather than exceed 60 chars', () => {
    const long = 'Cash-Out Refinance in Monterey Park: How Much You Can Take';
    expect(buildTitle(long)).toBe(long);
  });
});

describe('phone helpers', () => {
  it('formats US numbers', () => {
    expect(formatPhone('8186210094')).toBe('(818) 621-0094');
    expect(telHref('8186210094')).toBe('tel:+18186210094');
  });
});

describe('structured data', () => {
  it('breadcrumbs are numbered with absolute URLs', () => {
    const b = breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Loans', path: '/loans/' },
    ]);
    expect(b.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Loans',
      item: 'https://sangabrielvalleymortgagebroker.com/loans/',
    });
  });
  it('agent carries both licence numbers', () => {
    const ids = agentLd().identifier.map((i) => i.value);
    expect(ids).toContain(agent.dreLicense);
    expect(ids).toContain(agent.nmlsId);
  });
  it('mortgage company carries its NMLS ID and trade name', () => {
    const m = mortgageCompanyLd();
    expect(m.identifier[0]?.value).toBe(mortgageCompany.nmlsId);
    expect(m.name).toBe('Virchu Capital');
    expect(m.legalName).toBe('O.A.B.M. Inc.');
  });
  it('organization carries the brokerage DRE number', () => {
    expect(organizationLd().identifier[0]?.value).toBe(brokerage.dreLicense);
  });
});

describe('robots.txt', () => {
  it('preview disallows everything and lists no sitemap', () => {
    const r = robotsBody('preview');
    expect(r).toMatch(/^Disallow: \/$/m);
    expect(r).not.toMatch(/Sitemap:/);
  });
  it('production allows, blocks parameter URLs, names AI crawlers and lists the sitemap', () => {
    const r = robotsBody('production');
    expect(r).toMatch(/^Allow: \/$/m);
    expect(r).toMatch(/Disallow: \/\*\?/);
    for (const bot of AI_CRAWLERS) expect(r).toContain(`User-agent: ${bot}`);
    expect(r).toContain('Sitemap: https://sangabrielvalleymortgagebroker.com/sitemap-index.xml');
  });
});

describe('build inspection helpers', () => {
  it('maps files to URL paths', () => {
    expect(urlPathFor('/d', '/d/index.html')).toBe('/');
    expect(urlPathFor('/d', '/d/areas/alhambra/index.html')).toBe('/areas/alhambra/');
  });
  it('groups URLs by page type for sitemaps', () => {
    expect(pageType('/')).toBe('pages');
    expect(pageType('/areas/rosemead/')).toBe('areas');
    expect(pageType('/vi/')).toBe('vi');
  });
  it('hashes only main content', () => {
    const a = parsePage('<html data-indexable="true"><head><title>A</title></head><main><p>Hello</p></main><footer>2026</footer></html>');
    const b = parsePage('<html data-indexable="true"><head><title>A</title></head><main><p>Hello</p></main><footer>2027</footer></html>');
    expect(contentHash(a.mainText)).toBe(contentHash(b.mainText));
  });
});
