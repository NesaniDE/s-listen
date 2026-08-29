import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { companies } from '@/data/companies'
import { blogPosts } from '@/data/blog'
import { getPublishedSubcategories } from '@/lib/site-structure'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()
  const parseListDate = (value: string) => new Date(`${value}-01T00:00:00.000Z`)

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/kategorie`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/top10`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/fuer-unternehmen`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/methodik`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/ueber-s-listen`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => {
    const categoryLists = top10Lists.filter((list) => list.categorySlug === c.slug)
    const latestUpdate = categoryLists
      .map((list) => parseListDate(list.updatedAt))
      .sort((left, right) => right.getTime() - left.getTime())[0]

    return {
      url: `${base}/kategorie/${c.slug}`,
      lastModified: latestUpdate || now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  })

  const subcategoryEntries: MetadataRoute.Sitemap = categories.flatMap((c) =>
    getPublishedSubcategories(c).map((s) => ({
      url: `${base}/kategorie/${c.slug}/${s.slug}`,
      lastModified: parseListDate(top10Lists.find((list) => list.slug === s.listSlug)?.updatedAt || '2026-04'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  )

  const listEntries: MetadataRoute.Sitemap = top10Lists.map((l) => ({
    url: `${base}/top10/${l.slug}`,
    lastModified: parseListDate(l.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Gleiche Schwelle wie im noindex der Profilseite: nicht indexierte Seiten
  // gehoeren nicht in die Sitemap.
  const indexableCompanies = companies.filter(
    (c) => [c.address, c.phone, c.website].filter(Boolean).length >= 2,
  )

  const companyEntries: MetadataRoute.Sitemap = indexableCompanies.map((c) => ({
    url: `${base}/unternehmen/${c.slug}`,
    lastModified: now,
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
