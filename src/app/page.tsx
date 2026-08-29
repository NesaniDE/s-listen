import Link from 'next/link'
import { categories } from '@/data/categories'
import { featuredLists, top10Lists } from '@/data/lists'
import { featuredCompanies, companies } from '@/data/companies'
import { blogPosts } from '@/data/blog'
import CategoryCard from '@/components/cards/CategoryCard'
import TopListCard from '@/components/cards/TopListCard'
import CompanyCard from '@/components/cards/CompanyCard'
import BlogCard from '@/components/cards/BlogCard'
import SearchPlaceholder from '@/components/ui/SearchPlaceholder'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { getPublishedSubcategories, getPublishedSubcategoryCount } from '@/lib/site-structure'

export const metadata = createPageMetadata({
  title: `Top-10 Listen & lokale Empfehlungen in ${siteConfig.city}`,
  description:
    'S Listen bündelt redaktionelle Top-10-Listen und Unternehmensprofile für Stuttgart. Entdecke Restaurants, Cafés, Handwerk, Dienstleister und mehr.',
  path: '/',
  keywords: ['S Listen', siteConfig.city, 'Top-10 Listen', 'lokale Empfehlungen', ...siteConfig.keywords],
})

export default function HomePage() {
  const stats = [
    { value: String(categories.length), label: 'Hauptkategorien' },
    { value: String(getPublishedSubcategoryCount()), label: 'veröffentlichte Themenfelder' },
    { value: String(top10Lists.length), label: 'Top-10 Listen' },
    { value: String(companies.length), label: 'Unternehmensprofile' },
  ]

  const categoryHighlights = categories
    .map((category) => ({
      ...category,
      publishedCount: getPublishedSubcategories(category).length,
    }))
    .sort((left, right) => right.publishedCount - left.publishedCount)
    .slice(0, 6)

  const localSearchMoments = [
    {
      title: 'Essen & Ausgehen',
      description:
        'Von Restaurants über Frühstück bis Cocktailbars: starke Einstiege für Suchanfragen mit klarer lokaler Kauf- oder Besuchsabsicht.',
      href: '/kategorie/gastro',
    },
    {
      title: 'Freizeit & Alltag',
      description:
        'Fitness, Familienorte, Date-Spots und Freizeitangebote werden thematisch gebündelt statt nur lose verlinkt.',
      href: '/kategorie/freizeit',
    },
    {
      title: 'Dienstleister & Handwerk',
      description:
        'Für konkrete Suchmomente wie Friseur, Steuerberater, Webagentur, Elektriker oder Sanitärbetrieb.',
      href: '/kategorie/dienstleister',
    },
  ]

  const searchExamples = top10Lists.slice(0, 8)
  const searchItems = [
    ...categories.flatMap((category) => {
      const categoryEntry = {
        title: category.label,
        href: `/kategorie/${category.slug}`,
        type: 'Kategorie' as const,
        subtitle: category.description,
        searchText: `${category.label} ${category.description} ${category.slug}`.toLowerCase(),
      }

      const subcategoryEntries = category.subcategories.map((subcategory) => ({
        title: subcategory.label,
        href: `/top10/${subcategory.listSlug}`,
        type: 'Liste' as const,
        subtitle: `${category.label} · ${subcategory.label}`,
        searchText: `${subcategory.label} ${subcategory.slug} ${category.label} ${subcategory.listSlug}`.toLowerCase(),
      }))

      return [categoryEntry, ...subcategoryEntries]
    }),
    ...top10Lists.map((list) => ({
      title: list.title,
      href: `/top10/${list.slug}`,
      type: 'Liste' as const,
      subtitle: 'Top-10 Liste',
      searchText: `${list.title} ${list.slug} ${list.intro}`.toLowerCase(),
    })),
    ...companies.map((company) => ({
      title: company.name,
      href: `/unternehmen/${company.slug}`,
      type: 'Unternehmen' as const,
      subtitle: company.description,
      searchText: `${company.name} ${company.slug} ${company.description} ${company.tags.join(' ')} ${company.services?.join(' ') || ''}`.toLowerCase(),
    })),
  ]

  const principles = [
    {
      title: 'Lokal statt beliebig',
      desc: 'Keine deutschlandweiten Trefferlisten. Nur Stuttgart, dafür mit echtem Stadtbezug.',
    },
    {
      title: 'Redaktionell statt ungefiltert',
      desc: 'Reihenfolgen und Einordnungen sind unsere Meinung und sollen Orientierung geben, nicht absolute Wahrheit simulieren.',
    },
    {
      title: 'Cluster statt Einzelseite',
      desc: 'Kategorien, Listen, Unternehmensprofile und Blogartikel greifen ineinander und stärken sich gegenseitig.',
    },
    {
      title: 'Wachsend statt statisch',
      desc: 'Neue Themen werden bewusst in sinnvollen Clustern ergänzt, damit keine leeren Platzhalterseiten dominieren.',
    },
  ]

  return (
    <div>
      <section style={{ padding: '7rem 0 5rem' }}>
        <div className="section-container">
          <div style={{ maxWidth: '860px' }}>
            <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              Lokale Empfehlungen · {siteConfig.city}
            </span>

            <h1
              className="section-title animate-slide-up"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                marginBottom: '1.75rem',
                lineHeight: 1.05,
              }}
            >
              Top-10 Listen und lokale Empfehlungen
              <br />
              <span className="font-serif" style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                für Stuttgart.
              </span>
            </h1>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                maxWidth: '700px',
                marginBottom: '2.5rem',
              }}
            >
              S Listen bündelt redaktionelle Top-10-Listen, lokale Unternehmensprofile und thematische Ratgeber für
              Suchanfragen mit echtem Stadtbezug. Ob Restaurants, Cafés, Handwerk, Dienstleister, Freizeit oder
              Gesundheit: Die Plattform soll schnelle Orientierung geben, ohne objektive Vollständigkeit zu behaupten.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link href="/top10" className="btn-primary">
                Alle Top-10 Listen
              </Link>
              <Link href="/kategorie" className="btn-outline">
                Nach Kategorie suchen
              </Link>
            </div>

            <SearchPlaceholder items={searchItems} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0',
              marginTop: '5rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
            }}
            className="hero-stats"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                style={{
                  padding: '0.5rem 0',
                  borderLeft: index > 0 ? '1px solid var(--border)' : 'none',
                  paddingLeft: index > 0 ? '1.5rem' : 0,
                }}
                className="hero-stat"
              >
                <div
                  className="font-serif"
                  style={{ fontSize: '2.25rem', color: 'var(--text)', marginBottom: '0.25rem', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 5rem' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '2rem',
              alignItems: 'start',
            }}
            className="hub-grid"
          >
            <div
              style={{
                padding: '1.75rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(24, 25, 30, 0.98), rgba(15, 15, 18, 0.98))',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Warum diese Startseite wichtig ist
              </span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', marginBottom: '1rem' }}>
                Ein lokaler Hub statt einer bloßen Übersicht.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                Die Startseite verknüpft die wichtigsten Suchintentionen für {siteConfig.city}: Essen gehen,
                Dienstleister vergleichen, Handwerker finden, Freizeit planen oder lokale Unternehmen genauer
                einordnen. Dadurch entsteht ein klarer Einstieg für Menschen, die nicht nur einen Namen, sondern
                thematisch passende Empfehlungen suchen.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                Jede stärkere Themenroute führt von hier weiter in Kategorien, Unterkategorien, Top-10-Listen,
                Unternehmensprofile und Blogartikel. Genau diese interne Verlinkung macht S Listen für Nutzer und
                Suchmaschinen deutlich nachvollziehbarer.
              </p>
            </div>

            <div
              style={{
                padding: '1.75rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                Häufige Suchanlässe
              </span>
              <div style={{ display: 'grid', gap: '0.875rem' }}>
                {localSearchMoments.map((moment) => (
                  <Link
                    key={moment.title}
                    href={moment.href}
                    style={{
                      padding: '0.95rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      background: 'var(--bg-elevated)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{moment.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                      {moment.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <SectionHeader eyebrow="Kategorien" title="Die wichtigsten Themenfelder in S" link={{ href: '/kategorie', label: 'Alle Kategorien' }} />

          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {categoryHighlights.map((category) => (
              <Link
                key={category.slug}
                href={`/kategorie/${category.slug}`}
                style={{
                  padding: '1.1rem 1.15rem',
                  borderRadius: '14px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>{category.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {category.publishedCount} veröffentlichte Themenfelder mit passenden Listen und lokalen Einordnungen.
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <SectionHeader eyebrow="Aktuelle Listen" title="Top-10 Empfehlungen mit lokalem Kontext" link={{ href: '/top10', label: 'Alle Listen' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {featuredLists.map((list) => (
              <TopListCard key={list.slug} list={list} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Lokale Cluster
            </span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', marginBottom: '1rem' }}>
              Wie Nutzer sich durch die Plattform bewegen können.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Gute lokale Sichtbarkeit entsteht nicht nur durch einzelne Metadaten, sondern durch klare Wege:
              Startseite zu Kategorie, Kategorie zu Liste, Liste zum Unternehmen und von dort wieder in verwandte
              Themen. Genau dieses Muster bildet S Listen Schritt für Schritt aus.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--border)',
            }}
            className="principles-grid"
          >
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                style={{
                  padding: '2rem 1.5rem 2rem 0',
                  borderRight: index < principles.length - 1 ? '1px solid var(--border)' : 'none',
                  paddingLeft: index > 0 ? '1.5rem' : 0,
                }}
                className="principle-item"
              >
                <div
                  className="font-serif"
                  style={{ fontSize: '1.5rem', color: 'var(--text-subtle)', marginBottom: '1rem', lineHeight: 1 }}
                >
                  0{index + 1}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {principle.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <SectionHeader eyebrow="Beliebte Suchen" title="Direkte Einstiege in starke Listen" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {searchExamples.map((list) => (
              <Link
                key={list.slug}
                href={`/top10/${list.slug}`}
                className="subcat-link"
                style={{
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  padding: '0.6rem 0.95rem',
                  borderRadius: '999px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {list.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <SectionHeader eyebrow="Beispielprofile" title="Unternehmen mit klarer Einordnung" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1rem',
            }}
          >
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
            className="cta-grid"
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                Für Unternehmen
              </span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', marginBottom: '1rem' }}>
                Lokal sichtbar werden, ohne im Verzeichnisrauschen unterzugehen.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Unternehmen profitieren auf S Listen nicht nur von einer Profilseite, sondern von thematischer
                Einbindung in passende Listen, Kategorien und redaktionelle Cluster.
              </p>
              <Link href="/fuer-unternehmen" className="btn-primary">
                Mehr erfahren
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {['Lokale Sichtbarkeit', 'Profilseite mit Kontext', 'Interne Linkstruktur', 'Später erweiterbar'].map(
                (benefit, index) => (
                  <div
                    key={benefit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      padding: '0.875rem 0',
                      borderTop: index === 0 ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    <svg width="14" height="14" fill="none" stroke="var(--text-muted)" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{benefit}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <SectionHeader eyebrow="Ratgeber" title="Lokale Einordnung aus dem Blog" link={{ href: '/blog', label: 'Alle Artikel' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .subcat-link:hover {
          border-color: var(--border-strong) !important;
          background: var(--surface-hover) !important;
        }
        @media (max-width: 920px) {
          .hub-grid { grid-template-columns: 1fr !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .principles-grid { grid-template-columns: 1fr !important; }
          .principle-item { border-right: none !important; border-bottom: 1px solid var(--border); padding-left: 0 !important; }
          .principle-item:last-child { border-bottom: none; }
          .hero-stat { border-left: none !important; padding-left: 0 !important; padding-top: 1rem !important; padding-bottom: 1rem !important; border-top: 1px solid var(--border); }
          .hero-stat:first-child { border-top: none; padding-top: 0.5rem !important; }
        }
      `}</style>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string
  title: string
  link?: { href: string; label: string }
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '2.5rem',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          {eyebrow}
        </span>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}>
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="link-arrow">
          {link.label}
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  )
}
