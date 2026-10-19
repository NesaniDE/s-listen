import { companies, type Company } from '@/data/companies'
import type { Top10List } from '@/data/lists'
import { siteConfig } from '@/lib/config'

const companyBySlug = new Map(companies.map((company) => [company.slug, company]))
const templateDescription = new RegExp(String.raw`^[^.!?()]+ in ${siteConfig.city}(?:-[\p{L}]+(?: [\p{L}]+)?)?(?: \([^()]+\))?\.$`, 'iu')

/** Kartendaten allein ersetzen keine redaktionelle Beschreibung. */
export function isThinCompany(company: Company): boolean {
  return !company.longDescription?.trim() ||
    /erster Arbeitsstand/i.test(company.longDescription) ||
    templateDescription.test(company.description.trim())
}

export function isIndexableCompany(company: Company): boolean {
  return Boolean(company.website) && Boolean(company.address || company.phone) && !isThinCompany(company)
}

/** Fehlende Profilverweise gelten ebenfalls als nicht ausgearbeitet. */
export function isThinList(list: Top10List): boolean {
  if (list.intro.trimStart().startsWith('Diese Liste bündelt zehn Adressen') || !list.entries.length) return true
  const thinCount = list.entries.filter((entry) => {
    const company = companyBySlug.get(entry.slug)
    return !company || isThinCompany(company)
  }).length
  return thinCount > list.entries.length / 2
}
