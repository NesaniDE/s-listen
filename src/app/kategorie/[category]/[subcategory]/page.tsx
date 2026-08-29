import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd } from '@/lib/jsonld'
import { getPrimaryCategoryLists, getSubcategoryCompanies, getSubcategorySeoBlocks } from '@/lib/seo-content'
import { getCategorySubcategory, hasPublishedList } from '@/lib/site-structure'
import PageHero from '@/components/layout/PageHero'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import TopListCard from '@/components/cards/TopListCard'
import CompanyCard from '@/components/cards/CompanyCard'
import FAQSection from '@/components/ui/FAQSection'
import AdSpotTeaser from '@/components/sections/AdSpotTeaser'

export async function generateStaticParams() {
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string }
}): Promise<Metadata> {
  const { category, subcategory } = getCategorySubcategory(params.category, params.subcategory)
  if (!category || !subcategory) return {}

  const published = hasPublishedList(subcategory.listSlug)
  const description = published
    ? `Redaktionelle Orientierung zu ${subcategory.label} in ${siteConfig.city} mit passender Top-10-Liste, lokalen Profilen und thematischer Einordnung.`
    : `${subcategory.label} in ${siteConfig.city} wird auf S Listen aktuell als Themenfeld aufgebaut. Diese Seite verlinkt auf bereits veröffentlichte Inhalte und bleibt bis zum Ausbau bewusst schlank.`

  return createPageMetadata({
    title: `${subcategory.label} in ${siteConfig.city}`,
    description,
    path: `/kategorie/${category.slug}/${subcategory.slug}`,
    keywords: [subcategory.label, category.label, `${subcategory.label} ${siteConfig.city}`, ...siteConfig.keywords],
    robots: published
      ? undefined
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
  })
}

export default function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const { category, subcategory } = getCategorySubcategory(params.category, params.subcategory)
  if (!category || !subcategory) notFound()

  const list = top10Lists.find((entry) => entry.slug === subcategory.listSlug)
  const published = hasPublishedList(subcategory.listSlug)
  const seoBlocks = getSubcategorySeoBlocks(category, subcategory, published)
  const relatedCompanies = getSubcategoryCompanies(subcategory.slug, 4)
  const relatedCategoryLists = getPrimaryCategoryLists(category.slug, 4).filter((entry) => entry.slug !== list?.slug)
  const path = `/kategorie/${category.slug}/${subcategory.slug}`

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd(
              `${subcategory.label} in ${siteConfig.city}`,
              seoBlocks.intro,
              path,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Start', href: '/' },
              { name: 'Kategorien', href: '/kategorie' },
              { name: category.label, href: `/kategorie/${category.slug}` },
              { name: subcategory.label, href: path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(seoBlocks.faq)) }}
      />

      <div className="section-container">
        <Breadcrumbs
          crumbs={[
            { label: 'Kategorien', href: '/kategorie' },
            { label: category.label, href: `/kategorie/${category.slug}` },
            { label: subcategory.label },
          ]}
        />
      </div>

      <PageHero
        badge={published ? category.label : `${category.label} · im Ausbau`}
        title={`${subcategory.label} in ${siteConfig.city}`}
        subtitle={`${seoBlocks.intro} ${seoBlocks.guidance}`}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-purple">{published ? 'indexierbar' : 'noindex, follow'}</span>
          <span className="badge badge-purple">{relatedCompanies.length} Profilbeispiele</span>
          <span className="badge badge-purple">{relatedCategoryLists.length + (list ? 1 : 0)} thematische Listen</span>
        </div>
      </PageHero>

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <AdSpotTeaser context={subcategory.label} />
        {list ? (
          <section style={{ marginBottom: '3rem', maxWidth: '780px' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Hauptliste
            </span>
            <TopListCard list={list} />
          </section>
        ) : (
          <section style={{ marginBottom: '3rem' }}>
            <div
              style={{
                padding: '1.5rem',
                border: '1px dashed var(--border)',
                borderRadius: '16px',
                background: 'var(--bg-elevated)',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Themenfeld im Ausbau
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Für {subcategory.label} existiert auf S Listen bereits die thematische Struktur, aber noch keine
                veröffentlichte Hauptliste. Damit keine dünne Platzhalterseite indexiert wird, bleibt diese Seite
                bewusst auf Orientierung und interne Verlinkung ausgerichtet.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Sobald genug lokaler Kontext, passende Unternehmensprofile und eine sinnvolle Top-10-Auswahl vorhanden
                sind, wird das Thema als vollwertige Liste veröffentlicht.
              </p>
            </div>
          </section>
        )}

        <section style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '1.5rem',
            }}
            className="subcategory-intro-grid"
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
                Was diese Seite leisten soll
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>{seoBlocks.guidance}</p>
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
                Weiter im Cluster
              </span>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <Link href={`/kategorie/${category.slug}`} className="cluster-link">
                  Zur Kategorie {category.label}
                </Link>
                <Link href="/top10" className="cluster-link">
                  Alle veröffentlichten Top-10-Listen
                </Link>
                <Link href="/blog" className="cluster-link">
                  Verwandte Ratgeber ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedCompanies.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Passende Unternehmen
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Lokale Profile zu {subcategory.label}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {relatedCompanies.map((company) => (
                <CompanyCard key={company.slug} company={company} />
              ))}
            </div>
          </section>
        )}

        {relatedCategoryLists.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Verwandte Listen
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Bereits veröffentlichte Themen aus {category.label}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {relatedCategoryLists.map((entry) => (
                <TopListCard key={entry.slug} list={entry} />
              ))}
            </div>
          </section>
        )}

        <section style={{ maxWidth: '820px' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Häufige Fragen
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Mehr Kontext zu {subcategory.label}
          </h2>
          <FAQSection items={seoBlocks.faq} />
        </section>
      </div>

      <style>{`
        .cluster-link {
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          color: var(--text);
          background: var(--bg-elevated);
        }
        .cluster-link:hover {
          border-color: var(--border-strong);
          background: var(--surface-hover);
        }
        @media (max-width: 860px) {
          .subcategory-intro-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
