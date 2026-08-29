import { blogPosts } from '@/data/blog'
import BlogCard from '@/components/cards/BlogCard'
import PageHero from '@/components/layout/PageHero'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'
import { collectionPageJsonLd } from '@/lib/jsonld'

export const metadata = createPageMetadata({
  title: 'Blog & Ratgeber',
  description:
    'Tipps, Hintergründe und lokale Empfehlungen für Stuttgart — redaktionell eingeordnet für Gastro, Gesundheit, Freizeit, Handel und Dienstleister.',
  path: '/blog',
  keywords: ['Blog', 'Ratgeber', siteConfig.city, ...siteConfig.keywords],
})

export default function BlogPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd(
              `Blog & Ratgeber in ${siteConfig.city}`,
              'Lokale Ratgeber, Hintergründe und thematische Einordnungen von S Listen für Stuttgart.',
              '/blog',
            ),
          ),
        }}
      />
      <PageHero
        badge="Ratgeber"
        title="Blog & Ratgeber"
        subtitle="Tipps, Hintergründe und redaktionelle Einordnungen zu lokalen Themen aus Stuttgart."
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <section style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
            Der Blog ergänzt die Listen und Profile um lokalen Kontext. Artikel sollen Suchende nicht auf einer
            isolierten Content-Seite parken, sondern gezielt in die passenden Kategorien, Rankings und
            Unternehmensprofile weiterführen.
          </p>
        </section>
        <div
          className="stagger-children"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
