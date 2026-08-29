import { companies } from '@/data/companies'
import type { FAQItem } from '@/lib/content-types'

export interface RankingEntry {
  rank: number
  name: string
  description: string
  tags: string[]
  slug: string
  website?: string
  logo?: string
}

export interface Top10List {
  slug: string
  title: string
  categorySlug: string
  subcategorySlug: string
  updatedAt: string
  intro: string
  seoIntro?: string
  whyItMatters?: string
  faq?: FAQItem[]
  lastReviewedAt?: string
  sponsoredEntry?: RankingEntry
  entries: RankingEntry[]
}

const companyMap = new Map(companies.map((company) => [company.slug, company]))

export function buildEntry(rank: number, slug: string): RankingEntry {
  const company = companyMap.get(slug)

  if (!company) {
    throw new Error(`Company with slug ${slug} not found for ranking list.`)
  }

  return {
    rank,
    name: company.name,
    description: company.description,
    tags: company.tags.slice(0, 3),
    slug: company.slug,
    website: company.website,
    logo: company.logo,
  }
}

export function buildSponsoredEntry(slug: string): RankingEntry {
  return buildEntry(0, slug)
}

// Noch keine Top-10-Listen veröffentlicht.
// Alle Unterkategorien laufen dadurch über getPlaceholderSubcategories()
// als navigierbare Platzhalter, bis die erste Liste redaktionell steht.
export const top10Lists: Top10List[] = []

export function getListBySlug(slug: string): Top10List | undefined {
  return top10Lists.find((list) => list.slug === slug)
}

export function getListsByCategory(categorySlug: string): Top10List[] {
  return top10Lists.filter((list) => list.categorySlug === categorySlug)
}

export const featuredLists = top10Lists.slice(0, 4)
