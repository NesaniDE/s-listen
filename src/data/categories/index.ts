export interface Category {
  slug: string
  label: string
  emoji: string
  description: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  slug: string
  label: string
  listSlug: string
}

export const categories: Category[] = [
  {
    slug: 'gastro',
    label: 'Gastro',
    emoji: '',
    description: 'Restaurants, Cafés, Bars und mehr in Stuttgart.',
    subcategories: [
      { slug: 'restaurants', label: 'Restaurants', listSlug: 'top-10-restaurants-in-stuttgart' },
      { slug: 'cafes', label: 'Cafés', listSlug: 'top-10-cafes-in-stuttgart' },
      { slug: 'fruehstueck', label: 'Frühstück & Brunch', listSlug: 'top-10-fruehstueck-brunch-in-stuttgart' },
      { slug: 'burger', label: 'Burgerläden', listSlug: 'top-10-burgerladen-in-stuttgart' },
      { slug: 'italiener', label: 'Italiener', listSlug: 'top-10-italiener-in-stuttgart' },
      { slug: 'pizzerien', label: 'Pizzerien', listSlug: 'top-10-pizzerien-in-stuttgart' },
      { slug: 'doener', label: 'Dönerläden', listSlug: 'top-10-donerladen-in-stuttgart' },
      { slug: 'bars', label: 'Bars', listSlug: 'top-10-bars-in-stuttgart' },
      { slug: 'cocktailbars', label: 'Cocktailbars', listSlug: 'top-10-cocktailbars-in-stuttgart' },
      { slug: 'lieferdienste', label: 'Lieferdienste', listSlug: 'top-10-lieferdienste-in-stuttgart' },
    ],
  },
  {
    slug: 'freizeit',
    label: 'Freizeit',
    emoji: '',
    description: 'Sport, Erholung und Freizeitaktivitäten in Stuttgart.',
    subcategories: [
      { slug: 'fitnessstudios', label: 'Fitnessstudios', listSlug: 'top-10-fitnessstudios-in-stuttgart' },
      { slug: 'schwimmbader', label: 'Freibäder / Schwimmbäder', listSlug: 'top-10-schwimmbaeder-in-stuttgart' },
      { slug: 'saunen', label: 'Saunen', listSlug: 'top-10-saunen-in-stuttgart' },
      { slug: 'kletterhallen', label: 'Kletterhallen', listSlug: 'top-10-kletterhallen-in-stuttgart' },
      { slug: 'ausflugsziele', label: 'Ausflugsziele', listSlug: 'top-10-ausflugsziele-in-stuttgart' },
      { slug: 'freizeitaktivitaten', label: 'Freizeitaktivitäten', listSlug: 'top-10-freizeitaktivitaten-in-stuttgart' },
      { slug: 'familien', label: 'Orte für Familien', listSlug: 'top-10-orte-familien-in-stuttgart' },
      { slug: 'sportangebote', label: 'Sportangebote', listSlug: 'top-10-sportangebote-in-stuttgart' },
      { slug: 'date-spots', label: 'Date-Spots', listSlug: 'top-10-date-spots-in-stuttgart' },
      { slug: 'sehenswurdigkeiten', label: 'Sehenswürdigkeiten', listSlug: 'top-10-sehenswurdigkeiten-in-stuttgart' },
    ],
  },
  {
    slug: 'dienstleister',
    label: 'Dienstleister',
    emoji: '',
    description: 'Professionelle Dienstleister und Experten in Stuttgart.',
    subcategories: [
      { slug: 'friseure', label: 'Friseure', listSlug: 'top-10-friseure-in-stuttgart' },
      { slug: 'barbiere', label: 'Barbiere', listSlug: 'top-10-barbiere-in-stuttgart' },
      { slug: 'reinigungsfirmen', label: 'Reinigungsfirmen', listSlug: 'top-10-reinigungsfirmen-in-stuttgart' },
      { slug: 'steuerberater', label: 'Steuerberater', listSlug: 'top-10-steuerberater-in-stuttgart' },
      { slug: 'fotografen', label: 'Fotografen', listSlug: 'top-10-fotografen-in-stuttgart' },
      { slug: 'webagenturen', label: 'Webagenturen', listSlug: 'top-10-webagenturen-in-stuttgart' },
      { slug: 'werbeagenturen', label: 'Werbeagenturen', listSlug: 'top-10-werbeagenturen-in-stuttgart' },
      { slug: 'unternehmensberater', label: 'Unternehmensberater', listSlug: 'top-10-unternehmensberater-in-stuttgart' },
      { slug: 'it-dienstleister', label: 'IT-Dienstleister', listSlug: 'top-10-it-dienstleister-in-stuttgart' },
    ],
  },
  {
    slug: 'beauty-wellness',
    label: 'Beauty & Wellness',
    emoji: '',
    description: 'Schönheit, Pflege und Wellness in Stuttgart.',
    subcategories: [
      { slug: 'kosmetikstudios', label: 'Kosmetikstudios', listSlug: 'top-10-kosmetikstudios-in-stuttgart' },
      { slug: 'nagelstudios', label: 'Nagelstudios', listSlug: 'top-10-nagelstudios-in-stuttgart' },
      { slug: 'massagestudios', label: 'Massagestudios', listSlug: 'top-10-massagestudios-in-stuttgart' },
      { slug: 'wellnessanbieter', label: 'Wellnessanbieter', listSlug: 'top-10-wellnessanbieter-in-stuttgart' },
      { slug: 'spas', label: 'Spas', listSlug: 'top-10-spas-in-stuttgart' },
      { slug: 'tattoostudios', label: 'Tattoostudios', listSlug: 'top-10-tattoostudios-in-stuttgart' },
    ],
  },
  {
    slug: 'gesundheit',
    label: 'Gesundheit',
    emoji: '',
    description: 'Ärzte, Therapeuten und Gesundheitszentren in Stuttgart.',
    subcategories: [
      { slug: 'zahnarzte', label: 'Zahnärzte', listSlug: 'top-10-zahnarzte-in-stuttgart' },
      { slug: 'physiotherapie', label: 'Physiotherapie', listSlug: 'top-10-physiotherapie-in-stuttgart' },
      { slug: 'orthopaden', label: 'Orthopäden', listSlug: 'top-10-orthopaden-in-stuttgart' },
      { slug: 'hausarztpraxen', label: 'Hausarztpraxen', listSlug: 'top-10-hausarztpraxen-in-stuttgart' },
      { slug: 'apotheken', label: 'Apotheken', listSlug: 'top-10-apotheken-in-stuttgart' },
      { slug: 'gesundheitszentren', label: 'Gesundheitszentren', listSlug: 'top-10-gesundheitszentren-in-stuttgart' },
    ],
  },
  {
    slug: 'handwerk',
    label: 'Handwerk',
    emoji: '',
    description: 'Handwerker und Fachbetriebe in Stuttgart.',
    subcategories: [
      { slug: 'elektriker', label: 'Elektriker', listSlug: 'top-10-elektriker-in-stuttgart' },
      { slug: 'sanitarbetriebe', label: 'Sanitärbetriebe', listSlug: 'top-10-sanitarbetriebe-in-stuttgart' },
      { slug: 'malerbetriebe', label: 'Malerbetriebe', listSlug: 'top-10-malerbetriebe-in-stuttgart' },
      { slug: 'umzugsfirmen', label: 'Umzugsfirmen', listSlug: 'top-10-umzugsfirmen-in-stuttgart' },
      { slug: 'schreinereien', label: 'Schreinereien', listSlug: 'top-10-schreinereien-in-stuttgart' },
      { slug: 'dachdecker', label: 'Dachdecker', listSlug: 'top-10-dachdecker-in-stuttgart' },
    ],
  },
  {
    slug: 'wohnen-immobilien',
    label: 'Wohnen & Immobilien',
    emoji: '',
    description: 'Immobilien, Einrichtung und Wohnen in Stuttgart.',
    subcategories: [
      { slug: 'immobilienmakler', label: 'Immobilienmakler', listSlug: 'top-10-immobilienmakler-in-stuttgart' },
      { slug: 'kuchenstudios', label: 'Küchenstudios', listSlug: 'top-10-kuchenstudios-in-stuttgart' },
      { slug: 'innenausbauer', label: 'Innenausbauer', listSlug: 'top-10-innenausbauer-in-stuttgart' },
      { slug: 'mobelhauser', label: 'Möbelhäuser', listSlug: 'top-10-mobelhauser-in-stuttgart' },
      { slug: 'hausverwaltungen', label: 'Hausverwaltungen', listSlug: 'top-10-hausverwaltungen-in-stuttgart' },
    ],
  },
  {
    slug: 'auto-mobilitat',
    label: 'Auto & Mobilität',
    emoji: '',
    description: 'Kfz-Betriebe, Fahrschulen und Mobilität in Stuttgart.',
    subcategories: [
      { slug: 'autowerkstatten', label: 'Autowerkstätten', listSlug: 'top-10-autowerkstatten-in-stuttgart' },
      { slug: 'fahrschulen', label: 'Fahrschulen', listSlug: 'top-10-fahrschulen-in-stuttgart' },
      { slug: 'autohauser', label: 'Autohäuser', listSlug: 'top-10-autohauser-in-stuttgart' },
      { slug: 'reifenservices', label: 'Reifenservices', listSlug: 'top-10-reifenservices-in-stuttgart' },
      { slug: 'aufbereitungsdienste', label: 'Aufbereitungsdienste', listSlug: 'top-10-aufbereitungsdienste-in-stuttgart' },
    ],
  },
  {
    slug: 'hochzeit-events',
    label: 'Hochzeit & Events',
    emoji: '',
    description: 'Hochzeitslocations, Fotografen und Events in Stuttgart.',
    subcategories: [
      { slug: 'hochzeitslocations', label: 'Hochzeitslocations', listSlug: 'top-10-hochzeitslocations-in-stuttgart' },
      { slug: 'hochzeitsfotografen', label: 'Hochzeitsfotografen', listSlug: 'top-10-hochzeitsfotografen-in-stuttgart' },
      { slug: 'caterer', label: 'Caterer', listSlug: 'top-10-caterer-in-stuttgart' },
      { slug: 'djs', label: 'DJs', listSlug: 'top-10-djs-in-stuttgart' },
      { slug: 'eventlocations', label: 'Eventlocations', listSlug: 'top-10-eventlocations-in-stuttgart' },
      { slug: 'floristen', label: 'Floristen', listSlug: 'top-10-floristen-in-stuttgart' },
    ],
  },
  {
    slug: 'shopping',
    label: 'Shopping',
    emoji: '',
    description: 'Lokale Geschäfte, Boutiquen und Shopping in Stuttgart.',
    subcategories: [
      { slug: 'boutiquen', label: 'Boutiquen', listSlug: 'top-10-boutiquen-in-stuttgart' },
      { slug: 'backereien', label: 'Bäckereien', listSlug: 'top-10-backereien-in-stuttgart' },
      { slug: 'feinkostladen', label: 'Feinkostläden', listSlug: 'top-10-feinkostladen-in-stuttgart' },
      { slug: 'juweliere', label: 'Juweliere', listSlug: 'top-10-juweliere-in-stuttgart' },
      { slug: 'geschenkeshops', label: 'Geschenkeshops', listSlug: 'top-10-geschenkeshops-in-stuttgart' },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
