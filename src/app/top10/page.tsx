import PageHero from '@/components/layout/PageHero'
import TopListCard from '@/components/cards/TopListCard'
import AdSpotTeaser from '@/components/sections/AdSpotTeaser'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { collectionPageJsonLd } from '@/lib/jsonld'

export const metadata = createPageMetadata({
  title: 'Alle Top-10 Listen',
  description:
    'Übersicht aller redaktionellen Top-10-Listen für Stuttgart — Restaurants, Cafés, Fitnessstudios, Friseure, Zahnärzte und weitere lokale Themen.',
  path: '/top10',
  keywords: ['Top 10', siteConfig.city, ...siteConfig.keywords],
})

export default function Top10OverviewPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd(
              `Top-10 Listen in ${siteConfig.city}`,
              'Alle veröffentlichten redaktionellen Top-10-Listen von S Listen für Stuttgart.',
              '/top10',
            ),
          ),
        }}
      />
      <PageHero
        badge="Top-10 Übersicht"
        title="Alle aktuellen S-Listen"
        subtitle={`Aktuell ${top10Lists.length} veröffentlichte redaktionelle Listen für Stuttgart. Die Reihenfolgen spiegeln unsere Einschätzung wider und die Plattform wächst Kategorie für Kategorie.`}
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <AdSpotTeaser context="den Top-10-Listen" />
        <section style={{ maxWidth: '860px', marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
            Diese Übersicht bündelt alle bereits veröffentlichten Rankings von S Listen. Dadurch lassen sich Themen
            direkt vergleichen, einzelne Suchintentionen schneller ansteuern und neue Cluster innerhalb von
            Stuttgart besser entdecken.
          </p>
        </section>
        <div style={{ display: 'grid', gap: '4rem' }}>
          {categories.map((category) => {
            const listsForCategory = top10Lists.filter((list) => list.categorySlug === category.slug)

            return (
              <section key={category.slug}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.875rem',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <h2
                    className="section-title"
                    style={{ fontSize: '1.375rem' }}
                  >
                    {category.label}
                  </h2>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {listsForCategory.length} {listsForCategory.length === 1 ? 'Liste' : 'Listen'}
                  </span>
                </div>

                {listsForCategory.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '1.25rem',
                    }}
                  >
                    {listsForCategory.map((list) => (
                      <TopListCard key={list.slug} list={list} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '2rem',
                      border: '1px dashed var(--border)',
                      borderRadius: '12px',
                      color: 'var(--text-subtle)',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                    }}
                  >
                    Struktur angelegt, Inhalte folgen.
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
