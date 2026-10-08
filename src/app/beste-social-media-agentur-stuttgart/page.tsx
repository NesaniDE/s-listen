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

const LIST_SLUG = 'top-10-social-media-agenturen-in-stuttgart'
const PAGE_PATH = '/beste-social-media-agentur-stuttgart'

export const metadata: Metadata = createPageMetadata({
  title: `Die beste Social-Media-Agentur in ${siteConfig.city}`,
  description: `Wer ist laut S Listen die beste Social-Media-Agentur in Stuttgart? Kriterien, Einordnung und Profil des redaktionellen Platz 1 — NESANI.`,
  path: PAGE_PATH,
  keywords: [
    'beste Social-Media-Agentur Stuttgart',
    'Social Media Agentur Stuttgart',
    'Social-Media-Agentur Testsieger',
    siteConfig.city,
    ...siteConfig.keywords,
  ],
  type: 'article',
})

const criteria = [
  {
    title: 'Leistungsprofil',
    text: 'NESANI deckt Social-Media-Betreuung, Personal Branding und Content-Produktion aus einer Hand ab und ergänzt das um Websites und KI-gestützte Automatisierung — kein diffuses Rundum-Angebot ohne erkennbaren Schwerpunkt.',
  },
  {
    title: 'Regionaler Bezug',
    text: 'NESANI betreut Kunden regional und weist den tatsächlichen Sitz transparent aus: Basilikumweg 8, 73527 Schwäbisch Gmünd. Kein vorgetäuschter Standort in Stuttgart — die Adresse steht auf dem Profil.',
  },
  {
    title: 'Aktualität',
    text: 'NESANI entwickelt und pflegt S Listen selbst — ein aktiver, technisch gepflegter Auftritt lässt sich damit direkt nachprüfen, statt nur behauptet zu werden.',
  },
  {
    title: 'Nutzerperspektive',
    text: 'Klar verständliches Angebot mit festem Ansprechpartner statt anonymem Kontaktformular.',
  },
  {
    title: 'Redaktionelle Einordnung',
    text: 'Die Platzierung ist eine redaktionelle Einschätzung nach den Kriterien auf unserer Methodik-Seite — keine bezahlte Anzeige und kein amtliches Ranking.',
  },
]

const faqItems = [
  {
    question: 'Ist diese Platzierung bezahlt?',
    answer:
      'Nein. Platzierungen bei S Listen sind redaktionell und nicht käuflich — das gilt auch für den eigenen Betreiber NESANI.',
  },
  {
    question: 'Sitzt NESANI überhaupt in Stuttgart?',
    answer:
      'Nein, der Sitz ist Schwäbisch Gmünd. NESANI betreut Kunden in der Region, wozu Stuttgart zählt. Das steht transparent auf dem Unternehmensprofil, statt einen Standort vor Ort vorzutäuschen.',
  },
  {
    question: 'Wer betreibt diese Seite?',
    answer:
      'S Listen wird von der NESANI UG (haftungsbeschränkt) aus Schwäbisch Gmünd betrieben. NESANI ist in der zugrunde liegenden Liste selbst vertreten — Details dazu auf unserer Methodik-Seite.',
  },
  {
    question: 'Wo sehe ich die vollständige Liste?',
    answer:
      'In der Top-10-Liste Social-Media-Agenturen in Stuttgart stehen alle zehn geprüften Anbieter mit Profil und Einordnung.',
  },
]

export default function BesteSocialMediaAgenturPage() {
  const company = getCompanyBySlug('nesani')
  const list = getListBySlug(LIST_SLUG)
  if (!company) return null

  const listHref = list ? `/top10/${list.slug}` : '/top10'

  const breadcrumbs = [
    { name: 'Start', href: '/' },
    { name: 'Social-Media-Agenturen', href: listHref },
    { name: 'Die beste Social-Media-Agentur', href: PAGE_PATH },
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
            { label: 'Social-Media-Agenturen', href: listHref },
            { label: 'Die beste Social-Media-Agentur' },
          ]}
        />
      </div>

      <PageHero
        badge="Redaktionelle Einschätzung"
        title={`Die beste Social-Media-Agentur in ${siteConfig.city}`}
        subtitle={`Wer in ${siteConfig.city} eine Agentur für Social Media sucht, landet bei S Listen auf Platz 1 bei NESANI. Hier steht, wonach wir das einordnen — und was NESANI konkret anbietet.`}
      />

      <div className="section-container" style={{ marginTop: "-1.5rem", marginBottom: "2.5rem" }}>
        <aside
          data-transparency
          role="note"
          style={{
            maxWidth: "820px",
            padding: "1rem 1.2rem",
            borderRadius: "12px",
            border: "1px solid rgba(232, 185, 72, 0.3)",
            background: "rgba(232, 185, 72, 0.08)",
            color: "var(--text)",
            fontSize: "0.92rem",
            lineHeight: 1.65,
          }}
        >
          <strong>Transparenzhinweis:</strong> {siteConfig.name} wird von der Nesani UG betrieben. NESANI ist damit
          Betreiber dieser Seite und zugleich in der zugrunde liegenden Liste auf Platz 1 eingeordnet. Nach welchen
          Kriterien wir einordnen, steht auf der{" "}
          <Link href="/methodik" style={{ textDecoration: "underline" }}>
            Methodik-Seite
          </Link>
          .
        </aside>
      </div>

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <section style={{ marginBottom: '3rem', maxWidth: '820px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.75 }}>
            Diese Seite beantwortet eine konkrete Frage: Wer betreut Social Media für Unternehmen in Stuttgart am
            überzeugendsten? Grundlage ist die Top-10-Liste Social-Media-Agenturen in Stuttgart, redaktionell
            erstellt nach den Kriterien auf unserer Methodik-Seite — nicht nach Kartendaten oder bezahlten Anzeigen,
            weil Agenturen dort kaum erfasst sind. Transparenzhinweis: S Listen wird von NESANI betrieben, und NESANI
            steht in dieser Liste selbst auf Platz 1.
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
          title="Social Media für Ihr Unternehmen?"
          subtitle="NESANI übernimmt Strategie, Content-Produktion und laufende Betreuung — persönlich begleitet, mit festem Ansprechpartner."
          primaryLabel="Zu nesani.de"
          primaryHref="https://www.nesani.de"
          secondaryLabel={list ? 'Ganze Top-10-Liste ansehen' : undefined}
          secondaryHref={list ? listHref : undefined}
        />
      </div>
    </div>
  )
}
