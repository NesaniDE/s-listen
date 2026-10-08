import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { companies } from '@/data/companies'
import { blogPosts } from '@/data/blog'
import { getPublishedSubcategories } from '@/lib/site-structure'
import { companyLastModified, listLastModified, parseContentDate } from '@/lib/lastmod'

/** Start der Seite — Fallback, wenn sich fuer einen Eintrag kein Datum ableiten laesst. */
const LAUNCH = parseContentDate('2026-08-29')

/**
 * Feste Seiten mit dem Datum ihrer letzten inhaltlichen Aenderung — bewusst
 * nicht der Build-Zeitpunkt (siehe src/lib/lastmod.ts). Wenn sich der Inhalt
 * einer Seite aendert, `updated` auf den Tag setzen.
 */
const STATIC_ROUTES: {
  path: string
  updated: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '/', updated: '2026-09-15', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/kategorie', updated: '2026-09-02', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/top10', updated: '2026-09-15', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/blog', updated: '2026-10-08', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/fuer-unternehmen', updated: '2026-08-29', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/beste-social-media-agentur-stuttgart', updated: '2026-09-15', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/methodik', updated: '2026-09-02', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ueber-s-listen', updated: '2026-09-15', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/kontakt', updated: '2026-08-29', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/impressum', updated: '2026-08-29', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/datenschutz', updated: '2026-08-29', changeFrequency: 'yearly', priority: 0.2 },
]

const newest = (dates: Date[]) =>
  dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : LAUNCH

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: parseContentDate(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/kategorie/${c.slug}`,
    lastModified: newest(top10Lists.filter((l) => l.categorySlug === c.slug).map(listLastModified)),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const subcategoryEntries: MetadataRoute.Sitemap = categories.flatMap((c) =>
    getPublishedSubcategories(c).map((s) => {
      const list = top10Lists.find((l) => l.slug === s.listSlug)
      return {
        url: `${base}/kategorie/${c.slug}/${s.slug}`,
        lastModified: list ? listLastModified(list) : LAUNCH,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    }),
  )

  const listEntries: MetadataRoute.Sitemap = top10Lists.map((l) => ({
    url: `${base}/top10/${l.slug}`,
    lastModified: listLastModified(l),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Gleiche Schwelle wie im noindex der Profilseite: nicht indexierte Seiten
  // gehoeren nicht in die Sitemap.
  const indexableCompanies = companies.filter(
    (c) => Boolean(c.website) && Boolean(c.address || c.phone),
  )

  const companyEntries: MetadataRoute.Sitemap = indexableCompanies.map((c) => ({
    url: `${base}/unternehmen/${c.slug}`,
    lastModified: companyLastModified(c, top10Lists, LAUNCH),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...categoryEntries,
    ...subcategoryEntries,
    ...listEntries,
    ...companyEntries,
    ...blogEntries,
  ]
}
