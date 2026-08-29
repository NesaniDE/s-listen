import type { Metadata } from 'next'
import { siteConfig } from './config'

type MetadataType = 'website' | 'article' | 'profile'

interface CreatePageMetadataOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: MetadataType
  publishedTime?: string
  section?: string
  robots?: Metadata['robots']
}

const defaultOgImage = [
  {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.shortDescription}`,
  },
]

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
  section,
  robots,
}: CreatePageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    robots,
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      title,
      description,
      images: defaultOgImage,
      publishedTime,
      section,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitter,
      images: [siteConfig.ogImage],
    },
  }
}
