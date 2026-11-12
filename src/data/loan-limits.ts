/** 2026 loan limits for Los Angeles County (one value for every city in the county). */
export const loanLimits = {
  year: 2026,
  county: 'Los Angeles County',
  conforming: { oneUnit: 1_249_125, twoUnit: 1_599_375, threeUnit: 1_933_200, fourUnit: 2_402_625 },
  fha: { oneUnit: 1_249_125 },
  sources: {
    conforming: { name: 'FHFA, Conforming Loan Limit Values for 2026', url: 'https://www.fhfa.gov/data/conforming-loan-limit' },
    fha: { name: 'HUD, FHA Mortgage Limits', url: 'https://entp.hud.gov/idapp/html/hicostlook.cfm' },
  },
  /** FHFA usually publishes next year's limits in late November. Update then. Re-checked live 2026-11-11. */
  checked: '2026-11-11',
} as const;

/** LA County Development Authority Home Ownership Program (first-time buyers). */
export const hop = {
  hop80Max: 100_000,
  hop120Max: 85_000,
  /** Official participating-city list, checked 2026-11-10 (plus unincorporated LA County). */
  participatingCities: [
    'Agoura Hills', 'Arcadia', 'Artesia', 'Avalon', 'Azusa', 'Bell', 'Bell Gardens', 'Beverly Hills', 'Calabasas',
    'Claremont', 'Commerce', 'Covina', 'Cudahy', 'Culver City', 'Diamond Bar', 'Duarte', 'El Segundo',
    'Hawaiian Gardens', 'Hermosa Beach', 'Hidden Hills', 'Irwindale', 'La Cañada Flintridge', 'La Habra Heights',
    'La Mirada', 'La Puente', 'La Verne', 'Lawndale', 'Lomita', 'Malibu', 'Manhattan Beach', 'Maywood', 'Monrovia',
    'Rancho Palos Verdes', 'Rolling Hills Estates', 'San Dimas', 'San Fernando', 'San Gabriel', 'San Marino',
    'Santa Fe Springs', 'Sierra Madre', 'Signal Hill', 'South El Monte', 'South Pasadena', 'Temple City', 'Walnut',
    'West Hollywood', 'Westlake Village',
  ],
  hop80Only: ['Bell', 'La Puente', 'South El Monte'],
  source: {
    name: 'LACDA Home Ownership Program, eligible areas',
    url: 'https://www.lacda.org/home-ownership/home-ownership-program/lists/listsProvider25/home-ownership---home-ownership-program/step-3-find-a-home-within-an-eligible-area',
  },
  checked: '2026-11-10',
} as const;

export const calhfa = {
  myHomeMaxPct: 3.5,
  /** Up to 3.5% with a CalHFA FHA first loan, 3% with conventional. Checked on calhfa.ca.gov 2026-11-11. */
  checked: '2026-11-11',
  source: { name: 'CalHFA MyHome Assistance Program', url: 'https://www.calhfa.ca.gov/homebuyer/programs/myhome.htm' },
} as const;
