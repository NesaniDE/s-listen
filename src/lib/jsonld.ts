import { siteConfig } from './config'
import { getCompanyLogoUrl } from './company-brand'
import type { Top10List } from '@/data/lists'
import type { Company } from '@/data/companies'
import type { BlogPost } from '@/data/blog'
import type { Category } from '@/data/categories'
import type { FAQItem } from './content-types'

type Crumb = { name: string; href: string }

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.href.startsWith('http') ? c.href : `${siteConfig.url}${c.href}`,
    })),
  }
}

export function top10ListJsonLd(list: Top10List, category?: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.title,
    description: list.intro,
    numberOfItems: list.entries.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    url: `${siteConfig.url}/top10/${list.slug}`,
    inLanguage: siteConfig.locale,
    about: category
      ? {
          '@type': 'Thing',
          name: category.label,
        }
      : undefined,
    itemListElement: list.entries.map((e) => ({
      '@type': 'ListItem',
      position: e.rank,
      name: e.name,
      url: `${siteConfig.url}/unternehmen/${e.slug}`,
      item: {
        '@type': 'LocalBusiness',
        name: e.name,
        description: e.description,
        url: `${siteConfig.url}/unternehmen/${e.slug}`,
      },
    })),
  }
}

export function companyJsonLd(company: Company) {
  const isWebOrIt =
    company.subcategory === 'webagenturen' ||
    company.subcategory === 'werbeagenturen' ||
    company.subcategory === 'it-dienstleister'
  const image = getCompanyLogoUrl(company.website, company.logo)

  return {
    '@context': 'https://schema.org',
    '@type': isWebOrIt ? 'ProfessionalService' : 'LocalBusiness',
    name: company.name,
    description: company.longDescription || company.description,
    url: `${siteConfig.url}/unternehmen/${company.slug}`,
    image: image || undefined,
    telephone: company.phone || undefined,
    sameAs: company.website ? [company.website] : undefined,
    address: company.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: company.address.split(',')[0]?.trim(),
          addressLocality: siteConfig.city,
          postalCode: siteConfig.postalCode,
          addressCountry: siteConfig.country,
        }
      : undefined,
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
    knowsAbout: company.services,
    keywords: company.tags.join(', '),
  }
}

export function blogPostJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    inLanguage: siteConfig.locale,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function collectionPageJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${siteConfig.url}${path}`,
    inLanguage: siteConfig.locale,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
  }
}

export function faqJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function jsonLdScript(data: object | object[]) {
  const json = Array.isArray(data) ? data : [data]
  return json.map((d) => JSON.stringify(d)).join('\n')
}
