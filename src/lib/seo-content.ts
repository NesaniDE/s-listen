import { type Category, type Subcategory } from '@/data/categories'
import { companies, type Company } from '@/data/companies'
import { top10Lists, type Top10List } from '@/data/lists'
import { type BlogPost } from '@/data/blog'
import type { FAQItem } from './content-types'
import { getPublishedSubcategories } from './site-structure'

const categoryLeadMap: Record<string, string> = {
  gastro: 'Lokale Gastro-Suchen drehen sich oft um Anlass, Lage und Stil statt nur um den Namen des Betriebs.',
  freizeit: 'Freizeit-Suchen funktionieren lokal dann gut, wenn Suchende sofort erkennen, welches Angebot zum Alltag und zur Situation passt.',
  dienstleister: 'Bei lokalen Dienstleistern zählt meistens weniger Masse als eine schnelle Einordnung von Profil, Schwerpunkt und Passung.',
  'beauty-wellness':
    'Beauty- und Wellness-Suchen sind stark an Anlass, Behandlungsstil und persönliches Wohlgefühl gebunden.',
  gesundheit: 'Gesundheitsthemen brauchen vor allem verständliche Einordnung, Spezialisierung und lokale Orientierung.',
  handwerk: 'Im Handwerk suchen Menschen meist nicht abstrakt, sondern sehr konkret nach Gewerk, Anlass und regionaler Verlässlichkeit.',
  'wohnen-immobilien':
    'Wohnen- und Immobilienthemen leben von Vertrauen, Marktbezug und einer klaren Vorstellung davon, welche Anbieter wofür stehen.',
  'auto-mobilitat':
    'Im Mobilitätsbereich helfen lokale Seiten dann, wenn sie Suchintention und Anwendungsfall sauber voneinander trennen.',
  'hochzeit-events':
    'Event- und Hochzeitsanfragen profitieren besonders von Kontext: Anlass, Größe, Stimmung und Spezialisierung.',
  shopping:
    'Lokale Shopping-Suchen werden stärker, wenn sie nicht nur Betriebe nennen, sondern typische Einkaufsmomente verständlich machen.',
}

const categorySignalMap: Record<string, string[]> = {
  gastro: ['Lage und Anlass', 'sichtbares Konzept', 'lokale Bekanntheit'],
  freizeit: ['Alltagstauglichkeit', 'Trainings- oder Nutzungskonzept', 'lokale Relevanz'],
  dienstleister: ['Profilklarheit', 'Spezialisierung', 'Vertrauenssignal im lokalen Kontext'],
  'beauty-wellness': ['Behandlungsfokus', 'Atmosphäre', 'klarer Nutzwert für Suchende'],
  gesundheit: ['Leistungsprofil', 'Spezialisierung', 'lokale Zugänglichkeit'],
  handwerk: ['Gewerk-Klarheit', 'regionaler Bezug', 'praktische Passung zum Suchanlass'],
  'wohnen-immobilien': ['Marktbezug', 'Vertrauen', 'konkrete Einordnung des Angebots'],
  'auto-mobilitat': ['Anwendungsfall', 'Erreichbarkeit', 'klare Positionierung'],
  'hochzeit-events': ['Anlass-Passung', 'Stil und Umfeld', 'praktische Relevanz'],
  shopping: ['Produktschwerpunkt', 'lokale Sichtbarkeit', 'Nutzbarkeit im Alltag'],
}

const blogRelations: Record<
  string,
  {
    categorySlug?: string
    subcategorySlug?: string
    listSlugs?: string[]
    companySlugs?: string[]
  }
> = {
  'fruehstueck-brunch-in-gd': {
    categorySlug: 'gastro',
    subcategorySlug: 'fruehstueck',
    listSlugs: ['top-10-fruehstueck-brunch-in-stuttgart', 'top-10-cafes-in-stuttgart'],
    companySlugs: ['cafe-nomue', 'cafe-buehrs', 'ritz-b26'],
  },
  'fitnessstudio-finden-gmuend': {
    categorySlug: 'freizeit',
    subcategorySlug: 'fitnessstudios',
    listSlugs: ['top-10-fitnessstudios-in-stuttgart', 'top-10-sportangebote-in-stuttgart'],
    companySlugs: ['topfit-bahnhof', 'relex-fitnessclub', 'crossfit-gmuend'],
  },
  'guten-zahnarzt-in-gd-waehlen': {
    categorySlug: 'gesundheit',
    subcategorySlug: 'zahnarzte',
    listSlugs: ['top-10-zahnarzte-in-stuttgart', 'top-10-zahnreinigung-und-prophylaxe-in-stuttgart'],
    companySlugs: ['dental-quartier', 'dr-k', 'dr-felix-loeffler'],
  },
  'friseur-in-gd-finden': {
    categorySlug: 'dienstleister',
    subcategorySlug: 'friseure',
    listSlugs: ['top-10-friseure-in-stuttgart', 'top-10-barbiere-in-stuttgart'],
    companySlugs: ['hofielen', 'frisierbar-gd', 'the-gentlemens-barber'],
  },
  'kosmetikstudio-in-gd': {
    categorySlug: 'beauty-wellness',
    subcategorySlug: 'kosmetikstudios',
    listSlugs: ['top-10-kosmetikstudios-in-stuttgart', 'top-10-wellnessanbieter-in-stuttgart'],
    companySlugs: ['lenastyle', 'beautyforum-gmuend', 'sabine-kaiser-cosmetic'],
  },
  'warum-lokale-top-10-listen': {
    categorySlug: 'gastro',
    subcategorySlug: 'restaurants',
    listSlugs: ['top-10-restaurants-in-stuttgart', 'top-10-cafes-in-stuttgart'],
    companySlugs: ['restaurant-krietsch', 'charles-restaurant'],
  },
  'steuerberater-in-gd-waehlen': {
    categorySlug: 'dienstleister',
    subcategorySlug: 'steuerberater',
    listSlugs: ['top-10-steuerberater-in-stuttgart'],
    companySlugs: ['kanzlei-zapp-steuerberatung', 'kitzenmaier-bopp-partner', 'limes-steuerberatung'],
  },
  'werbeagentur-in-gd-finden': {
    categorySlug: 'dienstleister',
    subcategorySlug: 'werbeagenturen',
    listSlugs: ['top-10-werbeagenturen-in-stuttgart', 'top-10-digitalagenturen-in-stuttgart'],
    companySlugs: ['achtender', 'rawimedia', 'eberle-werbeagentur'],
  },
  'it-dienstleister-gd-vergleichen': {
    categorySlug: 'dienstleister',
    subcategorySlug: 'it-dienstleister',
    listSlugs: ['top-10-it-dienstleister-in-stuttgart', 'top-10-digitalisierungsberatung-in-stuttgart'],
    companySlugs: ['ls-it-services', 'bitport-it', 'eagle-peak'],
  },
}

export function getListSeoBlocks(list: Top10List, category?: Category) {
  const categoryLead = category ? categoryLeadMap[category.slug] : null
  const signals = category ? categorySignalMap[category.slug] || [] : []

  return {
    intro:
      list.seoIntro ||
      `${list.title} ordnet ein lokales Themenfeld für ${category?.label || 'Stuttgart'} redaktionell ein und verbindet konkrete Adressen mit dem typischen Suchanlass dahinter.`,
    summary:
      categoryLead ||
      `Diese Liste hilft dabei, ${list.title} lokal schneller einzuordnen und typische Suchanlässe in ${list.title.replace('Top 10 ', '')} besser abzudecken.`,
    idealFor: [
      `Suchende, die ${list.title.replace('Top 10 ', '').toLowerCase()} in ${category?.label || 'Stuttgart'} schneller vergleichen wollen`,
      'Menschen, die nicht nur Namen, sondern lokalen Kontext und Profilunterschiede sehen möchten',
      'Unternehmen, die thematisch passend in redaktionelle Cluster eingebunden werden sollen',
    ],
    signals:
      signals.length > 0
        ? signals
        : ['lokaler Bezug', 'sichtbare Positionierung', 'praktische Orientierung für Suchende'],
    faq:
      list.faq ||
      ([
        {
          question: `Wie ist ${list.title} zu verstehen?`,
          answer:
            'Die Seite ist als redaktionelle Orientierung gedacht. Sie will lokale Auswahl vereinfachen, ohne eine allgemein verbindliche oder objektive Endwertung zu behaupten.',
        },
        {
          question: `Für wen ist diese Liste besonders nützlich?`,
          answer:
            'Vor allem für Menschen, die in Stuttgart gezielt vergleichen wollen und neben Namen auch Profil, Anlass und thematische Passung sehen möchten.',
        },
        {
          question: 'Kann sich die Reihenfolge ändern?',
          answer:
            'Ja. S Listen versteht Listen als redaktionell überprüfbare Arbeitsstände. Neue Informationen, Korrekturen oder bessere Profilklarheit können spätere Anpassungen sinnvoll machen.',
        },
      ] satisfies FAQItem[]),
  }
}

export function getCategorySeoBlocks(category: Category) {
  const publishedSubcategories = getPublishedSubcategories(category)

  return {
    intro:
      categoryLeadMap[category.slug] ||
      `${category.label} in Stuttgart profitieren von klarer Einordnung, damit aus einer bloßen Übersicht ein nutzbarer lokaler Themen-Hub wird.`,
    searchMoments: publishedSubcategories.slice(0, 4).map((subcategory) => subcategory.label),
    faq: [
      {
        question: `Was ist der Zweck der Kategorie ${category.label}?`,
        answer:
          'Die Kategorieseite bündelt veröffentlichte Themenfelder, passende Listen und lokale Profile zu einem gemeinsamen Einstiegspunkt für Suchende in Stuttgart.',
      },
      {
        question: 'Warum sind nicht alle Unterkategorien sofort vollständig ausgebaut?',
        answer:
          'S Listen baut Inhalte bewusst clusterweise aus. Themen ohne ausreichenden redaktionellen Kontext bleiben zwar navigierbar, werden aber bis zur vollständigen Ausarbeitung nicht als Suchziel forciert.',
      },
      {
        question: 'Wie hilft die Kategorieseite bei Google und bei der Orientierung?',
        answer:
          'Sie verbindet Hauptthema, Unterthemen, Listen und Unternehmensprofile in einer sauberen internen Linkstruktur. Das stärkt sowohl die Nutzerführung als auch die thematische Relevanz für Suchmaschinen.',
      },
    ] satisfies FAQItem[],
  }
}

export function getSubcategorySeoBlocks(category: Category, subcategory: Subcategory, hasList: boolean) {
  const title = `${subcategory.label} in ${category.label}`

  return {
    intro: hasList
      ? `${title} werden auf S Listen nicht nur gesammelt, sondern lokal eingeordnet. So entsteht aus einer bloßen Branchenübersicht eine Suchhilfe, die schneller zu passenden Anbietern und relevanten Listen führt.`
      : `${title} sind bereits als Themenfeld angelegt, aber noch nicht als vollständige Top-10-Liste ausgebaut. Bis die redaktionelle Hauptliste veröffentlicht ist, dient diese Seite vor allem als thematische Übergangsseite mit Verweisen auf verwandte Inhalte.`,
    guidance: hasList
      ? `Nutzer suchen in diesem Thema meist nicht einfach nach irgendeinem Treffer, sondern nach einer Auswahl, die zum konkreten Anlass in Stuttgart passt. Genau darauf ist diese Seite ausgerichtet.`
      : `Damit hier keine dünne Platzhalterseite indexiert wird, bleibt der Fokus aktuell auf Orientierung und interner Verlinkung statt auf einer künstlich aufgeblähten Suchseite.`,
    faq: [
      {
        question: `Was finde ich auf dieser Seite zu ${subcategory.label}?`,
        answer: hasList
          ? `Die Seite bündelt die wichtigste lokale Einstiegsperspektive für ${subcategory.label} in Stuttgart und verknüpft die redaktionelle Hauptliste mit weiteren thematisch passenden Inhalten.`
          : `Aktuell vor allem thematische Orientierung, verwandte Links und einen Hinweis darauf, dass die vollständige Hauptliste für ${subcategory.label} noch im Ausbau ist.`,
      },
      {
        question: 'Warum gibt es zusätzlich eine eigene Top-10-Liste?',
        answer:
          'Die Unterkategorieseite ist der thematische Hub, die Top-10-Liste die konkrete redaktionelle Auswahl. Zusammen erzeugen beide eine stärkere lokale Themenstruktur für Nutzer und Suchmaschinen.',
      },
      {
        question: 'Wie wächst dieses Themenfeld weiter?',
        answer:
          'S Listen baut Kategorien in Clustern aus: mit weiteren Listen, Blogartikeln, internen Links und zusätzlichen Unternehmensprofilen, sobald genug lokaler Kontext vorhanden ist.',
      },
    ] satisfies FAQItem[],
  }
}

export function getCompanySeoBlocks(company: Company, featuredLists: Top10List[]) {
  const focus = company.services?.slice(0, 3) || company.tags.slice(0, 3)
  const listMentions = featuredLists.slice(0, 2).map((list) => list.title)

  return {
    summary: `${company.name} ist in S Listen als lokale Adresse in Stuttgart eingeordnet. Ziel ist nicht nur ein Name im Verzeichnis, sondern ein verständliches Profil für typische Suchanlässe, Leistungen und thematische Cluster.`,
    specializations:
      company.specializations && company.specializations.length > 0 ? company.specializations : focus,
    reviewNote:
      company.reviewNote ||
      `Das Profil basiert auf aktuell sichtbaren Unternehmensinformationen, thematischer Einordnung und den Listen-Clustern, in denen ${company.name}${listMentions.length > 0 ? ` bereits auftaucht, etwa ${listMentions.join(' und ')}` : ' aktuell auftaucht'}.`,
    faq: (
      company.faq && company.faq.length > 0
        ? company.faq
        : [
            {
              question: `Wofür ist ${company.name} auf S Listen besonders relevant?`,
              answer: `${company.name} wird vor allem über seine sichtbaren Leistungen, den lokalen Bezug und die thematische Passung innerhalb von Stuttgart eingeordnet.`,
            },
            {
              question: 'Wie kann dieses Profil verbessert werden?',
              answer:
                'Durch präzisere Leistungsangaben, zusätzliche Nachweise zur Spezialisierung, klarere Kontaktinformationen und redaktionell überprüfbare Aktualisierungen.',
            },
            {
              question: 'Was bedeutet die Einbindung in Listen?',
              answer:
                'Wenn ein Unternehmen in mehreren Listen auftaucht, stärkt das die thematische Einordnung und hilft Suchenden, die Adresse im passenden Kontext wiederzufinden.',
            },
          ]
    ) satisfies FAQItem[],
  }
}

export function getBlogSeoRelations(post: BlogPost) {
  const relation = {
    categorySlug: post.relatedCategorySlug || blogRelations[post.slug]?.categorySlug,
    subcategorySlug: post.relatedSubcategorySlug || blogRelations[post.slug]?.subcategorySlug,
    listSlugs: post.relatedListSlugs || blogRelations[post.slug]?.listSlugs,
    companySlugs: post.relatedCompanySlugs || blogRelations[post.slug]?.companySlugs,
  }
  const relatedLists = relation?.listSlugs
    ? relation.listSlugs
        .map((slug) => top10Lists.find((entry) => entry.slug === slug))
        .filter((entry): entry is Top10List => Boolean(entry))
    : []
  const relatedCompanies = relation?.companySlugs
    ? relation.companySlugs
        .map((slug) => companies.find((entry) => entry.slug === slug))
        .filter((entry): entry is Company => Boolean(entry))
    : []

  return {
    relation,
    relatedLists,
    relatedCompanies,
  }
}

export function getSiblingCompanies(company: Company, limit = 3) {
  return companies
    .filter((entry) => entry.slug !== company.slug && entry.subcategory === company.subcategory)
    .sort((left, right) => Number(right.featured) - Number(left.featured))
    .slice(0, limit)
}

export function getCategoryCompanies(categorySlug: string, limit = 4) {
  return companies
    .filter((entry) => entry.category === categorySlug)
    .sort((left, right) => Number(right.featured) - Number(left.featured))
    .slice(0, limit)
}

export function getPrimaryCategoryLists(categorySlug: string, limit = 4) {
  return top10Lists.filter((entry) => entry.categorySlug === categorySlug).slice(0, limit)
}

export function getSubcategoryCompanies(subcategorySlug: string, limit = 4) {
  return companies
    .filter((entry) => entry.subcategory === subcategorySlug)
    .sort((left, right) => Number(right.featured) - Number(left.featured))
    .slice(0, limit)
}
