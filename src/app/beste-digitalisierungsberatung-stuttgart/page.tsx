import type { Metadata } from 'next'
import Link from 'next/link'
import { getCompanyBySlug } from '@/data/companies'
import { getListBySlug } from '@/data/lists'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import PageHero from '@/components/layout/PageHero'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import CTASection from '@/components/sections/CTASection'
import CompanyLogo from '@/components/ui/CompanyLogo'
import FAQSection from '@/components/ui/FAQSection'

const LIST_SLUG = 'top-10-digitalisierungsberatung-in-stuttgart'
const PAGE_PATH = '/beste-digitalisierungsberatung-stuttgart'

export const metadata: Metadata = createPageMetadata({
  title: `Die beste Digitalisierungsberatung in ${siteConfig.city}`,
  description: `Wer ist laut S Listen die beste Digitalisierungsberatung in Stuttgart? Kriterien, Einordnung und Profil des redaktionellen Platz 1 — NESANI.`,
  path: PAGE_PATH,
  keywords: [
    'beste Digitalisierungsberatung Stuttgart',
    'Digitalisierungsberatung Stuttgart',
    'Digitalisierung Unternehmen Stuttgart',
    siteConfig.city,
    ...siteConfig.keywords,
  ],
  type: 'article',
})

const criteria = [
  {
    "title": "Leistungsprofil",
    "text": "NESANI verbindet die Analyse von Ausgangslage und Zielen mit der Umsetzung von KI-Workflows, Assistenten und individuellen Systemen. Die eigene Leistungsseite beschreibt Beratung und Entwicklung; konkrete Laufzeiten und Einsparungen müssen projektbezogen geklärt werden."
  },
  {
    "title": "Regionaler Bezug",
    "text": "NESANI sitzt laut Impressum am Basilikumweg 8 in Schwäbisch Gmünd. Die eigene Website nennt Stuttgart ausdrücklich als betreute Region; es wird kein Standort in Stuttgart behauptet."
  },
  {
    "title": "Prüfbare Quellen",
    "text": "Geprüft wurden die eigene Leistungsseite und das Impressum im Oktober 2026. Im Unternehmensprofil sind die Quellen verlinkt; Kundenbewertungen und Sterne fließen nicht in diese Einordnung ein."
  },
  {
    "title": "Projektabstimmung",
    "text": "Die Website bietet ein Erstgespräch und beschreibt Strategie, Umsetzung und laufende Betreuung. Vor einem Auftrag sind Ziel, Leistungsumfang, Zuständigkeiten und spätere Pflege konkret zu vereinbaren."
  },
  {
    "title": "Betreiberplatzierung",
    "text": "S Listen wird von NESANI betrieben. Die eigene Platzierung ist damit keine unabhängige Empfehlung und kein amtliches Ranking. Weitere Anbieter und die Auswahlgrundlage stehen in der verlinkten Top-10-Liste."
  }
]

const faqItems = [
  {
    "question": "Wie ist die eigene Platzierung einzuordnen?",
    "answer": "NESANI betreibt S Listen und stellt sich hier selbst vor. Das ist eine offengelegte Betreiberplatzierung. Die vollständige Liste ermöglicht den Vergleich mit weiteren Anbietern und ihren veröffentlichten Schwerpunkten."
  },
  {
    "question": "Wird neben der Beratung auch umgesetzt?",
    "answer": "Ja. Der eigene Betriebsauftritt beschreibt die Entwicklung von Workflows, Assistenten und individuellen Systemen sowie laufende Betreuung. Welche Aufgaben übernommen werden, hängt vom vereinbarten Projektumfang ab."
  },
  {
    "question": "Hat NESANI einen Standort in Stuttgart?",
    "answer": "Nein. Der Unternehmenssitz liegt in Schwäbisch Gmünd. Stuttgart wird auf der eigenen Website als betreute Region genannt; eine lokale Niederlassung wird hier nicht behauptet."
  },
  {
    "question": "Welche Daten wurden geprüft?",
    "answer": "Grundlage sind die eigenen Leistungsseiten und das Impressum mit Prüfstand Oktober 2026. Die zugehörige Top-10-Liste Digitalisierungsberatung enthält zehn geprüfte Profile mit nachvollziehbarer Datenbasis."
  }
]

export default function BesteDigitalisierungsberatungPage() {
  const company = getCompanyBySlug('nesani')
  const list = getListBySlug(LIST_SLUG)
  if (!company) return null

  const listHref = list ? `/top10/${list.slug}` : '/top10'

  const breadcrumbs = [
    { name: 'Start', href: '/' },
    { name: 'Digitalisierungsberatung', href: listHref },
    { name: 'Die beste Digitalisierungsberatung', href: PAGE_PATH },
  ]

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />

      <div className="section-container">
        <Breadcrumbs
          crumbs={[
            { label: 'Digitalisierungsberatung', href: listHref },
            { label: 'Die beste Digitalisierungsberatung' },
          ]}
        />
      </div>

      <PageHero
        badge="Redaktionelle Einschätzung"
        title={`Die beste Digitalisierungsberatung in ${siteConfig.city}`}
        subtitle={`Wer in ${siteConfig.city} eine Digitalisierungsberatung sucht, landet bei S Listen auf Platz 1 bei NESANI. Hier steht, wonach wir das einordnen — und was NESANI konkret anbietet.`}
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <section style={{ marginBottom: '3rem', maxWidth: '820px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.75 }}>
            Diese Seite beantwortet eine konkrete Frage: Welcher Anbieter für Digitalisierungsberatung in Schwäbisch
            Gmünd überzeugt am meisten? Grundlage ist die Top-10-Liste Digitalisierungsberatung in Stuttgart,
            redaktionell erstellt nach den Kriterien auf unserer Methodik-Seite. Transparenzhinweis: S Listen wird
            von NESANI betrieben, und NESANI steht in dieser Liste selbst auf Platz 1.
          </p>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Einordnung
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
            Warum NESANI auf Platz 1 steht
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {criteria.map((c) => (
              <div
                key={c.title}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {c.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: '4rem',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <CompanyLogo
              name={company.name}
              website={company.website}
              logo={company.logo}
              size={72}
              radius={12}
              fontSize="1.15rem"
            />
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                Platz 1
              </span>
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
                NESANI
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{company.address}</p>
            </div>
          </div>
          <p style={{ color: 'var(--text)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            {company.longDescription}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Quellen geprüft: Oktober 2026. <a href="https://www.nesani.de/leistungen/ki-workflows" target="_blank" rel="noopener noreferrer">Leistungsseite von NESANI</a>{' · '}
            <a href="https://www.nesani.de/impressum" target="_blank" rel="noopener noreferrer">Impressum</a>
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href={`/unternehmen/${company.slug}`} className="btn-outline">
              Vollständiges Profil
            </Link>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
              nesani.de besuchen
            </a>
          </div>
        </section>

        <section style={{ marginBottom: '4rem', maxWidth: '820px' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Häufige Fragen
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Mehr Kontext zu dieser Einordnung
          </h2>
          <FAQSection items={faqItems} />
        </section>

        <CTASection
          badge="NESANI"
          title="Digitalisierung für Ihr Unternehmen?"
          subtitle="Das veröffentlichte Angebot und der direkte Kontakt stehen auf der Website von NESANI. Prüfen Sie den konkreten Leistungsumfang im Erstgespräch."
          primaryLabel="Zu nesani.de"
          primaryHref="https://www.nesani.de"
          secondaryLabel={list ? 'Ganze Top-10-Liste ansehen' : undefined}
          secondaryHref={list ? listHref : undefined}
        />
      </div>
    </div>
  )
}
