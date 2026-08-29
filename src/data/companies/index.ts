import type { FAQItem } from '@/lib/content-types'

export interface Company {
  slug: string
  name: string
  category: string
  subcategory: string
  description: string
  longDescription?: string
  address?: string
  phone?: string
  website?: string
  logo?: string
  tags: string[]
  services?: string[]
  district?: string
  specializations?: string[]
  reviewNote?: string
  faq?: FAQItem[]
  featured: boolean
}

// Noch keine Unternehmensprofile veröffentlicht.
// Einträge werden erst nach eigener Recherche vor Ort ergänzt —
// Name, Adresse, Telefon und Website müssen jeweils verifiziert sein.
export const companies: Company[] = []

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug)
}

export const featuredCompanies = companies.filter((c) => c.featured)
