import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListBySlug, top10Lists } from '@/data/lists'
import { companies } from '@/data/companies'
import { getCategoryBySlug } from '@/data/categories'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd, faqJsonLd, top10ListJsonLd } from '@/lib/jsonld'
import { getListSeoBlocks } from '@/lib/seo-content'
import PageHero from '@/components/layout/PageHero'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import RankingCard from '@/components/cards/RankingCard'
import RelatedLists from '@/components/sections/RelatedLists'
import CTASection from '@/components/sections/CTASection'
import CompanyCard from '@/components/cards/CompanyCard'
import FAQSection from '@/components/ui/FAQSection'
import AdSpotTeaser from '@/components/sections/AdSpotTeaser'

export async function generateStaticParams() {
  return top10Lists.map((list) => ({ slug: list.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const list = getListBySlug(params.slug)
  if (!list) return {}

  const category = getCategoryBySlug(list.categorySlug)
  const description =
    list.seoIntro ||
    `${list.title}: Redaktionelle Orientierung mit Unternehmensprofilen, Bewertungen und thematischem Kontext für ${siteConfig.city}.`

  return createPageMetadata({
    title: list.title,
    description,
    path: `/top10/${list.slug}`,
    keywords: [list.title, category?.label || '', siteConfig.city, ...siteConfig.keywords].filter(Boolean),
    type: 'article',
    section: list.categorySlug,
  })
}

export default function Top10ListPage({ params }: { params: { slug: string } }) {
  const list = getListBySlug(params.slug)
  if (!list) notFound()

  const category = getCategoryBySlug(list.categorySlug)
  const seoBlocks = getListSeoBlocks(list, category)
  const featuredCompanies = list.entries
    .slice(0, 4)
    .map((entry) => companies.find((company) => company.slug === entry.slug))
    .filter((company): company is NonNullable<typeof company> => Boolean(company))

  const breadcrumbs = [
    { name: 'Start', href: '/' },
    { name: 'Kategorien', href: '/kategorie' },
    ...(category ? [{ name: category.label, href: `/kategorie/${category.slug}` }] : []),
    { name: list.title, href: `/top10/${list.slug}` },
  ]

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(top10ListJsonLd(list, category)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(seoBlocks.faq)) }}
      />

      <div className="section-container">
        <Breadcrumbs
          crumbs={[
            { label: 'Kategorien', href: '/kategorie' },
            ...(category ? [{ label: category.label, href: `/kategorie/${category.slug}` }] : []),
            { label: list.title },
          ]}
        />
      </div>

      <PageHero badge="Top-10 Liste" title={list.title} subtitle={list.intro}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-purple">Aktualisiert {list.lastReviewedAt || list.updatedAt}</span>
          <span className="badge badge-purple">10 Einträge</span>
          {category && <span className="badge badge-purple">{category.label}</span>}
        </div>
      </PageHero>

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <section style={{ marginBottom: '2rem', maxWidth: '820px' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Worum es hier geht
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.75 }}>{seoBlocks.intro}</p>
        </section>

        {list.sponsoredEntry ? (
          <section style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                marginBottom: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span className="eyebrow">Empfohlene Anzeige</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-subtle)',
                }}
              >
                Sponsored
              </span>
            </div>
            <RankingCard entry={list.sponsoredEntry} listSlug={list.slug} isSponsored />
          </section>
        ) : (
          <AdSpotTeaser context={`der Liste ${list.title}`} compact />
        )}

        <ol
          className="stagger-children"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '4rem',
          }}
        >
          {list.entries.map((entry) => (
            <li key={entry.rank}>
              <RankingCard entry={entry} listSlug={list.slug} />
            </li>
          ))}
        </ol>

        <section
          style={{
            marginBottom: '4rem',
            padding: '1.25rem 1.375rem',
            borderRadius: '12px',
            border: '1px solid rgba(232, 185, 72, 0.22)',
            background: 'rgba(232, 185, 72, 0.08)',
          }}
        >
          <span className="eyebrow" style={{ color: 'var(--accent)', marginBottom: '0.75rem', display: 'inline-block' }}>
            Redaktioneller Hinweis
          </span>
          <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Diese Liste ist eine redaktionelle Einschätzung von S Listen. Sie ist kein objektives Qualitätsranking und
            erhebt keinen Anspruch auf Vollständigkeit oder auf eine allgemein verbindliche Reihenfolge.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
            Unternehmen können Korrekturen, Ergänzungen oder die Prüfung einer Entfernung jederzeit per E-Mail an{' '}
            <a
              href={`mailto:${siteConfig.publisher.email}`}
              style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              {siteConfig.publisher.email}
            </a>{' '}
            anfragen.
          </p>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
            className="list-seo-grid"
          >
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Für wen diese Liste hilfreich ist
              </span>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {seoBlocks.idealFor.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '0.85rem 0.95rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(24, 25, 30, 0.98), rgba(15, 15, 18, 0.98))',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Woran S Listen orientiert
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {seoBlocks.signals.map((signal) => (
                  <span
                    key={signal}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredCompanies.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Profile aus dieser Liste
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Unternehmen mit thematischer Passung
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {featuredCompanies.map((company) => (
                <CompanyCard key={company.slug} company={company} />
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: '4rem', maxWidth: '820px' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Häufige Fragen
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Mehr Kontext zu dieser Top-10-Liste
          </h2>
          <FAQSection items={seoBlocks.faq} />
        </section>

        <CTASection
          badge="Für Unternehmen"
          title="Bist du auf dieser Liste?"
          subtitle="Ergänze, korrigiere oder optimiere deinen Eintrag. Auf Anfrage prüfen wir auch eine Entfernung aus der Darstellung."
          primaryLabel="Jetzt eintragen"
          primaryHref="/fuer-unternehmen"
          secondaryLabel="Methodik ansehen"
          secondaryHref="/methodik"
        />

        <RelatedLists currentSlug={list.slug} categorySlug={list.categorySlug} />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .list-seo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
