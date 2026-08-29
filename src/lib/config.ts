const searchVerification = {
  google:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    '',
  bing:
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
    process.env.BING_SITE_VERIFICATION ||
    '',
}

export const siteConfig = {
  name: 'S Listen',
  shortName: 'S Listen',
  description:
    'Redaktionelle Top-10-Listen und lokale Empfehlungen für Stuttgart — eingeordnet für Gastro, Freizeit, Dienstleister, Beauty und Gesundheit.',
  shortDescription: 'Redaktionelle lokale Empfehlungen für Stuttgart.',
  url: 'https://www.s-listen.de',
  city: 'Stuttgart',
  cityShort: 'S',
  region: 'Baden-Württemberg',
  postalCode: '70173',
  country: 'DE',
  language: 'de',
  locale: 'de_DE',
  publisher: {
    name: 'Nesani UG (haftungsbeschränkt)',
    url: 'https://www.nesani.de',
    address: 'Basilikumweg 8, 73527 Schwäbisch Gmünd',
    email: 'info@nesani.de',
  },
  twitter: '@nesani_de',
  ogImage: '/opengraph-image',
  themeColor: '#f7f3ea',
  verification: searchVerification,
  keywords: [
    'Stuttgart',
    'S Listen',
    'Top 10 Stuttgart',
    'lokale Empfehlungen',
    'beste Restaurants Stuttgart',
    'beste Cafés Stuttgart',
    'Branchenverzeichnis Stuttgart',
    'lokale Anbieter S',
    'Stuttgart Tipps',
  ],
} as const

export const navLinks = [
  { label: 'Kategorien', href: '/kategorie' },
  { label: 'Top 10 Listen', href: '/top10' },
  { label: 'Blog', href: '/blog' },
  { label: 'Für Unternehmen', href: '/fuer-unternehmen' },
  { label: 'Über uns', href: '/ueber-s-listen' },
]

export const footerLinks = {
  platform: [
    { label: 'Kategorien', href: '/kategorie' },
    { label: 'Methodik', href: '/methodik' },
    { label: 'Blog', href: '/blog' },
    { label: 'Über S Listen', href: '/ueber-s-listen' },
  ],
  unternehmen: [
    { label: 'Für Unternehmen', href: '/fuer-unternehmen' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
}
