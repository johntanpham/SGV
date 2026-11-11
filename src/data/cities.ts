/**
 * City facts. Every number has a source; check dates live in CENSUS_SOURCE / VIET_SOURCE.
 * To add a city: copy an entry, fill it from Census QuickFacts, set indexable:false until it earns impressions.
 */
export const CENSUS_SOURCE = {
  name: 'U.S. Census Bureau QuickFacts (population estimate July 1, 2025; housing and language figures from ACS 2020-2024)',
  url: 'https://www.census.gov/quickfacts/',
  checked: '2026-11-10',
};
export const VIET_SOURCE = {
  name: 'Neilsberg analysis of U.S. Census ACS data (2025)',
  url: 'https://www.neilsberg.com/insights/lists/vietnamese-population-in-los-angeles-county-ca-by-city',
};

export interface City {
  slug: string;
  name: string;
  indexable: boolean;
  population: number;
  ownerRate: number; // %
  medianValue: number; // $
  medianRent: number; // $
  householdSize: number;
  otherLanguage: number; // % age 5+ speaking a language other than English at home
  foreignBorn: number; // %
  vietnamese?: { people: number; pct: number };
  zips: string[];
  neighbors: string[]; // slugs
  intro: { en: string; vi: string };
}

export const cities: City[] = [
  {
    slug: 'alhambra',
    name: 'Alhambra',
    indexable: true,
    population: 79_820,
    ownerRate: 41.1,
    medianValue: 857_800,
    medianRent: 1_939,
    householdSize: 2.64,
    otherLanguage: 67.5,
    foreignBorn: 45.0,
    vietnamese: { people: 5_164, pct: 6.3 },
    zips: ['91801', '91803'],
    neighbors: ['monterey-park', 'san-gabriel', 'rosemead'],
    intro: {
      en: 'Alhambra sits at the western edge of the San Gabriel Valley, next to Monterey Park, San Gabriel and South Pasadena, with Main Street and Valley Boulevard running through the middle of town.',
      vi: 'Alhambra nằm ở rìa phía tây San Gabriel Valley, giáp Monterey Park, San Gabriel và South Pasadena, với hai con đường chính là Main Street và Valley Boulevard.',
    },
  },
  {
    slug: 'monterey-park',
    name: 'Monterey Park',
    indexable: true,
    population: 57_457,
    ownerRate: 51.6,
    medianValue: 863_000,
    medianRent: 1_888,
    householdSize: 2.85,
    otherLanguage: 70.3,
    foreignBorn: 50.8,
    zips: ['91754', '91755'],
    neighbors: ['alhambra', 'rosemead', 'san-gabriel'],
    intro: {
      en: 'Monterey Park is on the western side of the valley, between Alhambra and Montebello, with busy shopping and dining along Atlantic Boulevard and Garvey Avenue.',
      vi: 'Monterey Park nằm ở phía tây thung lũng, giữa Alhambra và Montebello, với khu mua sắm và ăn uống sầm uất dọc Atlantic Boulevard và Garvey Avenue.',
    },
  },
  {
    slug: 'san-gabriel',
    name: 'San Gabriel',
    indexable: true,
    population: 38_186,
    ownerRate: 50.4,
    medianValue: 945_700,
    medianRent: 1_915,
    householdSize: 3.0,
    otherLanguage: 70.7,
    foreignBorn: 51.3,
    vietnamese: { people: 4_886, pct: 12.6 },
    zips: ['91775', '91776'],
    neighbors: ['alhambra', 'rosemead', 'temple-city'],
    intro: {
      en: 'San Gabriel grew up around the San Gabriel Mission, founded in 1771. Today Valley Boulevard through San Gabriel is one of the best-known dining streets in the valley.',
      vi: 'San Gabriel hình thành quanh Mission San Gabriel, được xây dựng năm 1771. Ngày nay Valley Boulevard đoạn qua San Gabriel là một trong những con đường ăn uống nổi tiếng nhất thung lũng.',
    },
  },
  {
    slug: 'rosemead',
    name: 'Rosemead',
    indexable: true,
    population: 49_410,
    ownerRate: 47.3,
    medianValue: 807_200,
    medianRent: 1_834,
    householdSize: 3.42,
    otherLanguage: 81.0,
    foreignBorn: 59.2,
    vietnamese: { people: 9_768, pct: 19.4 },
    zips: ['91770'],
    neighbors: ['el-monte', 'san-gabriel', 'temple-city', 'monterey-park'],
    intro: {
      en: 'Rosemead, centered on Garvey Avenue and Valley Boulevard, has one of the largest shares of Vietnamese-American residents of any city in the San Gabriel Valley.',
      vi: 'Rosemead, với trung tâm là Garvey Avenue và Valley Boulevard, là một trong những thành phố có tỷ lệ người Mỹ gốc Việt cao nhất San Gabriel Valley.',
    },
  },
  {
    slug: 'temple-city',
    name: 'Temple City',
    indexable: true,
    population: 35_125,
    ownerRate: 62.9,
    medianValue: 961_800,
    medianRent: 2_135,
    householdSize: 3.05,
    otherLanguage: 67.4,
    foreignBorn: 49.4,
    zips: ['91780'],
    neighbors: ['arcadia', 'san-gabriel', 'rosemead', 'el-monte'],
    intro: {
      en: 'Temple City is a mostly residential city between Arcadia, San Gabriel and Rosemead, with its main shopping street along Las Tunas Drive.',
      vi: 'Temple City là thành phố chủ yếu là khu dân cư, nằm giữa Arcadia, San Gabriel và Rosemead, với con đường mua sắm chính là Las Tunas Drive.',
    },
  },
  {
    slug: 'el-monte',
    name: 'El Monte',
    indexable: true,
    population: 105_075,
    ownerRate: 40.2,
    medianValue: 644_000,
    medianRent: 1_736,
    householdSize: 3.56,
    otherLanguage: 82.0,
    foreignBorn: 49.1,
    vietnamese: { people: 11_247, pct: 10.5 },
    zips: ['91731', '91732', '91733'],
    neighbors: ['rosemead', 'temple-city', 'arcadia', 'west-covina'],
    intro: {
      en: 'El Monte is one of the largest cities in the San Gabriel Valley, with more than 105,000 residents, and is home to El Monte Station, a major bus and transit hub.',
      vi: 'El Monte là một trong những thành phố lớn nhất San Gabriel Valley, với hơn 105.000 cư dân, và có El Monte Station, một trạm xe buýt và giao thông công cộng lớn.',
    },
  },
  {
    slug: 'arcadia',
    name: 'Arcadia',
    indexable: true,
    population: 54_117,
    ownerRate: 58.1,
    medianValue: 1_441_800,
    medianRent: 2_191,
    householdSize: 2.82,
    otherLanguage: 61.1,
    foreignBorn: 46.2,
    zips: ['91006', '91007'],
    neighbors: ['temple-city', 'el-monte', 'san-gabriel'],
    intro: {
      en: 'Arcadia, home of Santa Anita Park and the Los Angeles County Arboretum, has some of the highest home values in the San Gabriel Valley.',
      vi: 'Arcadia, nơi có trường đua Santa Anita Park và vườn thực vật Los Angeles County Arboretum, là một trong những nơi có giá nhà cao nhất San Gabriel Valley.',
    },
  },
  {
    slug: 'west-covina',
    name: 'West Covina',
    indexable: true,
    population: 105_301,
    ownerRate: 60.3,
    medianValue: 779_800,
    medianRent: 2_245,
    householdSize: 3.23,
    otherLanguage: 59.8,
    foreignBorn: 37.1,
    vietnamese: { people: 4_580, pct: 4.3 },
    zips: ['91790', '91791', '91792'],
    neighbors: ['el-monte', 'arcadia'],
    intro: {
      en: "West Covina is one of the largest cities in the eastern San Gabriel Valley and home to Bao's office on South Nogales Street.",
      vi: 'West Covina là một trong những thành phố lớn nhất ở phía đông San Gabriel Valley và là nơi đặt văn phòng của Bao trên đường South Nogales.',
    },
  },
];

export const citiesBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));
