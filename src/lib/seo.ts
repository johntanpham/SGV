import { site, agent, brokerage, mortgageCompany } from '../config/site';

export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 160;

/** Absolute, canonical URL with the site's trailing-slash style. */
export function canonicalUrl(path: string): string {
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
  return `${site.origin}${p}`;
}

/** "Main words | Brand", trimmed so the brand stays last. */
export function buildTitle(main: string, { brand = true }: { brand?: boolean } = {}): string {
  if (!brand) return main;
  const suffix = ` | ${site.shortName}`;
  return main.length + suffix.length <= TITLE_MAX ? `${main}${suffix}` : main;
}

export interface Crumb {
  name: string;
  path: string;
}

export const ids = {
  website: `${site.origin}/#website`,
  organization: `${site.origin}/#organization`,
  agent: `${site.origin}/#bao-nguyen`,
  mortgageCompany: `${site.origin}/#mortgage-company`,
};

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${site.origin}/`,
    name: site.name,
    inLanguage: ['en-US', 'vi'],
    publisher: { '@id': ids.organization },
  };
}

export function organizationLd() {
  return {
    '@type': ['Organization', 'FinancialService', 'RealEstateAgent'],
    '@id': ids.organization,
    name: brokerage.name,
    url: brokerage.url,
    telephone: `+1${agent.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brokerage.address.street,
      addressLocality: brokerage.address.city,
      addressRegion: brokerage.address.region,
      postalCode: brokerage.address.postalCode,
      addressCountry: brokerage.address.country,
    },
    identifier: [{ '@type': 'PropertyValue', propertyID: 'CA DRE', value: brokerage.dreLicense }],
    employee: { '@id': ids.agent },
    ...(site.social.length ? { sameAs: site.social } : {}),
  };
}

export function agentLd() {
  return {
    '@type': 'Person',
    '@id': ids.agent,
    name: agent.name,
    jobTitle: `${agent.title}, Mortgage Loan Originator`,
    worksFor: [{ '@id': ids.organization }, { '@id': ids.mortgageCompany }],
    telephone: `+1${agent.phone}`,
    email: `mailto:${agent.email}`,
    image: `${site.origin}${agent.photo}`,
    knowsLanguage: agent.languages,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'CA DRE', value: agent.dreLicense },
      { '@type': 'PropertyValue', propertyID: 'NMLS', value: agent.nmlsId },
    ],
  };
}

export function mortgageCompanyLd() {
  return {
    '@type': ['Organization', 'FinancialService'],
    '@id': ids.mortgageCompany,
    legalName: mortgageCompany.legalName,
    name: mortgageCompany.dba,
    address: organizationLd().address,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'NMLS', value: mortgageCompany.nmlsId },
      ...(mortgageCompany.dreLicense
        ? [{ '@type': 'PropertyValue', propertyID: 'CA DRE', value: mortgageCompany.dreLicense }]
        : []),
    ],
  };
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

/** Wraps nodes in one @graph so every page ships a single JSON-LD block. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function faqLd(items: [string, string][], lang: string) {
  return {
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
