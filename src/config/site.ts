/**
 * The one config file for the site.
 * Name, domain, contact details, licences, analytics ID and social links live here.
 * Change a value here and it updates everywhere on the next build.
 */

export const site = {
  /** Brand shown in titles (last) and the header. */
  name: 'San Gabriel Valley Mortgage Broker',
  shortName: 'SGV Mortgage Broker',
  /** Production origin. Bare domain; www redirects here. No trailing slash. */
  origin: 'https://sangabrielvalleymortgagebroker.com',
  domain: 'sangabrielvalleymortgagebroker.com',
  locale: 'en-US',
  defaultDescription:
    'Bao Nguyen is a licensed mortgage broker and real estate broker associate helping San Gabriel Valley families buy, sell, refinance and take cash out.',

  /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Empty = analytics off. */
  ga4Id: '',

  /** Social profiles (used in Organization/Person sameAs). Add real URLs only. */
  social: [] as string[],
} as const;

export const agent = {
  name: 'Bao Nguyen',
  title: 'Broker Associate',
  /** Shown as plain tel: links. Store digits only; formatting happens in code. */
  phone: '8186210094',
  email: 'bao@virchufi.com',
  /** Hidden copy of every website lead (BCC). Never shown on the site. */
  leadBcc: 'johnphamtherealtor@gmail.com',
  dreLicense: '02014645',
  nmlsId: '1317747',
  languages: ['English', 'Vietnamese'],
  photo: '/images/bao-nguyen.png',
  photoWidth: 280,
  photoHeight: 266,
} as const;

/** Real estate brokerage (Bao's DRE broker associate licence is under this broker). */
export const brokerage = {
  /** DRE record 02075357 (checked 2026-11-10): Jade Rose Financial Inc., DBA "Virchu Financial and Investment". */
  legalName: 'Jade Rose Financial Inc.',
  name: 'Virchu Financial & Investment',
  url: 'https://virchufi.com/',
  broker: 'Jade Chu',
  dreLicense: '02075357',
  regulator: 'Real estate broker, California Department of Real Estate',
  address: {
    street: '3626 S Nogales Street',
    city: 'West Covina',
    region: 'CA',
    postalCode: '91792',
    country: 'US',
  },
} as const;

/**
 * Mortgage company that sponsors Bao's MLO licence (from NMLS Consumer Access, 2026-11-10).
 * Licensed by the California DRE as a Real Estate Corporation with an MLO endorsement.
 */
export const mortgageCompany = {
  legalName: 'O.A.B.M. Inc.',
  dba: 'Virchu Capital',
  nmlsId: '1907086',
  /** DRE corporation licence (record checked 2026-11-10: licensed, MLO endorsement 1907086, expires 09/10/27). */
  dreLicense: '02101087',
  regulator: 'Licensed by the California Department of Real Estate',
} as const;

/** Values that must be filled before the production build may deploy. */
export const requiredBeforeLaunch: { label: string; value: string }[] = [
  { label: 'O.A.B.M. Inc. DRE licence number', value: mortgageCompany.dreLicense },
];

/** Links to official licence lookups shown in the footer. */
export const verifyLinks = {
  nmls: `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/${agent.nmlsId}`,
  dre: `https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=${agent.dreLicense}`,
} as const;

/**
 * Main navigation. Items appear only when `ready` is true, so the site never
 * links to a page that hasn't been built yet.
 */
export const nav: { label: string; labelVi: string; href: string; ready: boolean }[] = [
  { label: 'Loan Officer', labelVi: 'Cho vay', href: '/loan-officer/', ready: true },
  { label: 'Realtor', labelVi: 'Realtor', href: '/real-estate/', ready: true },
  { label: 'Areas', labelVi: 'Khu vực', href: '/areas/', ready: true },
  { label: 'Guides', labelVi: 'Hướng dẫn', href: '/guides/', ready: false },
  { label: 'Tools', labelVi: 'Công cụ', href: '/tools/', ready: false },
  { label: 'About', labelVi: 'Về Bao', href: '/about/bao-nguyen/', ready: true },
  // Contact page exists (/contact/) and is linked from the footer; the header's Call button covers it.
  { label: 'Contact', labelVi: 'Liên hệ', href: '/contact/', ready: false },
];

export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 10) return digits;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function telHref(digits: string): string {
  return `tel:+1${digits.replace(/\D/g, '')}`;
}
