import type { Top10List } from '@/data/lists'
import type { Company } from '@/data/companies'

/**
 * Aenderungsdaten fuer Sitemap und IndexNow.
 *
 * Bing nutzt lastmod stark, um zu entscheiden, was neu gecrawlt wird, und
 * ignoriert es, wenn es bei jedem Build auf "heute" springt. Deshalb kommen
 * alle Daten aus den Inhalten selbst, nie aus dem Build-Zeitpunkt.
 *
 * updatedAt / lastReviewedAt einer Liste: "YYYY-MM" (aeltere Eintraege) oder
 * "YYYY-MM-DD". Wenn sich eine Liste aendert, das Tagesdatum eintragen — nur
 * dann meldet /api/indexnow die Liste und ihre Profile am naechsten Tag.
 */
export function parseContentDate(value: string): Date {
  return new Date(value.length === 7 ? `${value}-01T00:00:00.000Z` : `${value}T00:00:00.000Z`)
}

/** Anzeige bleibt monatsgenau, auch wenn intern ein Tagesdatum steht. */
export function formatListMonth(value: string): string {
  return value.slice(0, 7)
}

/** "Aktualisiert"-Anzeige: das neuere von updatedAt und lastReviewedAt, monatsgenau. */
export function listUpdatedLabel(list: Top10List): string {
  return formatListMonth(listLastModified(list).toISOString())
}

export function listLastModified(list: Top10List): Date {
  const dates = [list.updatedAt, list.lastReviewedAt].filter((v): v is string => Boolean(v))
  return new Date(Math.max(...dates.map((v) => parseContentDate(v).getTime())))
}

const newest = (dates: Date[]) =>
  dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined

/**
 * Profilseiten zeigen ihre Listenplatzierungen, aendern sich also mit den
 * Listen, in denen sie stehen. Profile ohne Liste nehmen das neueste Datum
 * ihrer Kategorie, sonst den Fallback.
 */
export function companyLastModified(company: Company, lists: Top10List[], fallback: Date): Date {
  const own = lists.filter((l) => l.entries.some((e) => e.slug === company.slug))
  const category = lists.filter((l) => l.categorySlug === company.category)
  return newest(own.map(listLastModified)) ?? newest(category.map(listLastModified)) ?? fallback
}
