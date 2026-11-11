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

export const brokerage = {
  name: 'Virchu Financial & Investment',
  url: 'https://virchufi.com/',
  broker: 'Jade Chu',
  dreLicense: '02075357',
  /**
   * Company NMLS ID. REQUIRED before launch (California mortgage advertising rules).
   * The production build refuses to run while this is empty.
   */
  nmlsId: '',
  regulator: 'Real estate broker, California Department of Real Estate',
  address: {
    street: '3626 S Nogales Street',
    city: 'West Covina',
    region: 'CA',
    postalCode: '91792',
    country: 'US',
  },
} as const;

/** Links to official licence lookups shown in the footer. */
export const verifyLinks = {
  nmls: `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/${agent.nmlsId}`,
  dre: 'https://www2.dre.ca.gov/PublicASP/pplinfo.asp',
} as const;

/**
 * Main navigation. Items appear only when `ready` is true, so the site never
 * links to a page that hasn't been built yet.
 */
export const nav: { label: string; href: string; ready: boolean }[] = [
  { label: 'Loans', href: '/loans/', ready: false },
  { label: 'Buy & Sell', href: '/real-estate/', ready: false },
  { label: 'Areas', href: '/areas/', ready: false },
  { label: 'Guides', href: '/guides/', ready: false },
  { label: 'Tools', href: '/tools/', ready: false },
  { label: 'About Bao', href: '/about/bao-nguyen/', ready: false },
  { label: 'Contact', href: '/contact/', ready: false },
];

export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 10) return digits;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function telHref(digits: string): string {
  return `tel:+1${digits.replace(/\D/g, '')}`;
}
