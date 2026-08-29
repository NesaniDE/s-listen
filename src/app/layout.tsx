import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import { siteConfig } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-source',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif-source',
})

const verification = {
  ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
  ...(siteConfig.verification.bing
    ? {
        other: {
          'msvalidate.01': siteConfig.verification.bing,
        },
      }
    : {}),
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.publisher.name, url: siteConfig.publisher.url }],
  creator: siteConfig.publisher.name,
  publisher: siteConfig.publisher.name,
  applicationName: siteConfig.name,
  category: 'directory',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  verification,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.shortDescription}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/favicon-32.png'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: 'light',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.publisher.name,
    url: siteConfig.publisher.url,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  areaServed: {
    '@type': 'City',
    name: siteConfig.city,
  },
  founder: {
    '@type': 'Organization',
    name: siteConfig.publisher.name,
    url: siteConfig.publisher.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable}`}>
        <Header />
        <main style={{ minHeight: '70vh' }}>{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
