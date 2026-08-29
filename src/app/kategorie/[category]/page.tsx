import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, categories } from '@/data/categories'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd } from '@/lib/jsonld'
import { getCategoryCompanies, getCategorySeoBlocks, getPrimaryCategoryLists } from '@/lib/seo-content'
import { getPlaceholderSubcategories, getPublishedSubcategories } from '@/lib/site-structure'
import PageHero from '@/components/layout/PageHero'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import TopListCard from '@/components/cards/TopListCard'
import CompanyCard from '@/components/cards/CompanyCard'
import FAQSection from '@/components/ui/FAQSection'
import AdSpotTeaser from '@/components/sections/AdSpotTeaser'

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.category)
  if (!category) return {}

  const publishedSubcategories = getPublishedSubcategories(category)
  const description = `${category.description} Redaktionell kuratierte Unternehmensprofile, Top-10-Listen und Themenfelder für ${siteConfig.city}.`

  return createPageMetadata({
    title: `${category.label} in ${siteConfig.city}`,
    description,
    path: `/kategorie/${category.slug}`,
    keywords: [category.label, `${category.label} ${siteConfig.city}`, ...siteConfig.keywords],
  })
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category)
  if (!category) notFound()

  const publishedSubcategories = getPublishedSubcategories(category)
  const placeholderSubcategories = getPlaceholderSubcategories(category)
  const lists = getPrimaryCategoryLists(category.slug, 8)
  const relatedCompanies = getCategoryCompanies(category.slug, 4)
  const seoBlocks = getCategorySeoBlocks(category)
  const path = `/kategorie/${category.slug}`

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd(
              `${category.label} in ${siteConfig.city}`,
              `${category.description} Redaktionell gebündelte Themen, Listen und Unternehmensprofile für ${siteConfig.city}.`,
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
              { name: category.label, href: path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(seoBlocks.faq)) }}
      />

      <div className="section-container">
        <Breadcrumbs crumbs={[{ label: 'Kategorien', href: '/kategorie' }, { label: category.label }]} />
      </div>

      <PageHero
        badge="Kategorie"
        title={`${category.label} in ${siteConfig.city}`}
        subtitle={`${category.description} ${seoBlocks.intro}`}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-purple">{publishedSubcategories.length} veröffentlichte Themenfelder</span>
          <span className="badge badge-purple">{lists.length} verknüpfte Listen</span>
          <span className="badge badge-purple">{relatedCompanies.length} Profilbeispiele</span>
        </div>
      </PageHero>

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <AdSpotTeaser context={`der Kategorie ${category.label}`} />
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '1.5rem',
            }}
            className="category-intro-grid"
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
                Lokale Einordnung
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                {seoBlocks.intro}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                Wer in {siteConfig.city} nach {category.label.toLowerCase()} sucht, landet oft bei sehr unterschiedlichen
                Unterthemen. Diese Seite bündelt deshalb veröffentlichte Themenfelder, redaktionelle Listen und lokale
                Unternehmensprofile an einem Ort.
              </p>
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
                Wichtige Suchmomente
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {seoBlocks.searchMoments.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-elevated)',
                      fontSize: '0.8rem',
                      color: 'var(--text)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Veröffentlichte Themenfelder
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            {publishedSubcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/kategorie/${category.slug}/${subcategory.slug}`}
                className="subcat-link"
                style={{
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  padding: '0.55rem 0.9rem',
                  borderRadius: '10px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {subcategory.label}
              </Link>
            ))}
          </div>
        </section>

        {lists.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                  Top-10 Listen
                </span>
                <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
                  Redaktionelle Einstiege für {category.label}
                </h2>
              </div>
              <Link href="/top10" className="link-arrow">
                Alle Listen
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {lists.map((list) => (
                <TopListCard key={list.slug} list={list} />
              ))}
            </div>
          </section>
        )}

        {relatedCompanies.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Passende Unternehmensprofile
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Lokale Adressen innerhalb dieser Kategorie
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

        {placeholderSubcategories.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <div
              style={{
                padding: '1.5rem',
                border: '1px dashed var(--border)',
                borderRadius: '16px',
                background: 'var(--bg-elevated)',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Themen im Ausbau
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Einige Unterthemen sind inhaltlich schon vorgesehen, werden aber erst dann als starke Suchziele
                ausgebaut, wenn genug redaktioneller Kontext vorhanden ist. Bis dahin priorisiert S Listen die bereits
                veröffentlichten Cluster.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {placeholderSubcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/kategorie/${category.slug}/${subcategory.slug}`}
                    style={{
                      padding: '0.5rem 0.8rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {subcategory.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section style={{ maxWidth: '820px' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Häufige Fragen
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Mehr Kontext zu {category.label} auf S Listen
          </h2>
          <FAQSection items={seoBlocks.faq} />
        </section>
      </div>

      <style>{`
        .subcat-link:hover {
          border-color: var(--border-strong) !important;
          background: var(--surface-hover) !important;
        }
        @media (max-width: 860px) {
          .category-intro-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
