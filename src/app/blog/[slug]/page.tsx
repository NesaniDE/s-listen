import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, blogPosts } from '@/data/blog'
import { getCategoryBySlug } from '@/data/categories'
import { siteConfig } from '@/lib/config'
import { blogPostJsonLd, breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/jsonld'
import { createPageMetadata } from '@/lib/metadata'
import { getBlogSeoRelations } from '@/lib/seo-content'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import BlogCard from '@/components/cards/BlogCard'
import TopListCard from '@/components/cards/TopListCard'
import CompanyCard from '@/components/cards/CompanyCard'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.category, post.title, siteConfig.city, ...siteConfig.keywords],
    type: 'article',
    publishedTime: post.publishedAt,
    section: post.category,
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3)
  const { relation, relatedLists, relatedCompanies } = getBlogSeoRelations(post)
  const relatedCategory = relation?.categorySlug ? getCategoryBySlug(relation.categorySlug) : null

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Start', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: post.title, href: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd(post.title, post.excerpt, `/blog/${post.slug}`)),
        }}
      />

      <div className="section-container-narrow">
        <Breadcrumbs crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
      </div>

      <article style={{ padding: '3rem 0' }}>
        <div className="section-container-narrow">
          <span className="badge badge-purple" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            {post.category}
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            {post.title}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              marginBottom: '3rem',
            }}
          >
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span style={{ color: 'var(--text-subtle)' }}>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  color: 'var(--text)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.75,
                  letterSpacing: '-0.005em',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {(relatedCategory || relatedLists.length > 0 || relatedCompanies.length > 0) && (
            <section
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(24, 25, 30, 0.98), rgba(15, 15, 18, 0.98))',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                Thema vertiefen
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Dieser Artikel ist kein isolierter Content-Baustein, sondern Teil eines lokalen Themenclusters. Von hier
                aus kannst du direkt zur passenden Kategorie, zu verknüpften Listen und zu relevanten Unternehmensprofilen
                weitergehen.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {relatedCategory && (
                  <Link href={`/kategorie/${relatedCategory.slug}`} className="cluster-link">
                    Kategorie {relatedCategory.label}
                  </Link>
                )}
                {relatedLists.slice(0, 2).map((list) => (
                  <Link key={list.slug} href={`/top10/${list.slug}`} className="cluster-link">
                    {list.title}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        {relatedLists.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Passende Listen
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Diese Rankings passen thematisch zum Artikel
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {relatedLists.map((list) => (
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
              Lokale Adressen rund um dieses Thema
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

        <section>
          <hr className="divider" style={{ margin: '0 0 3rem' }} />

          <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
            Weiter lesen
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
            Weitere Artikel
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {related.map((entry) => (
              <BlogCard key={entry.slug} post={entry} />
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .cluster-link {
          padding: 0.75rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--text);
          background: var(--bg-elevated);
        }
        .cluster-link:hover {
          border-color: var(--border-strong);
          background: var(--surface-hover);
        }
      `}</style>
    </div>
  )
}
