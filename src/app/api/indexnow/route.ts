import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/config'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { companies } from '@/data/companies'
import { blogPosts } from '@/data/blog'
import { getPublishedSubcategories } from '@/lib/site-structure'

const INDEXNOW_KEY = 'e03471fb4cf66f9e84a0a06035701528'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

function getAllUrls(): string[] {
  const base = siteConfig.url

  const staticUrls = [
    `${base}/`,
    `${base}/kategorie`,
    `${base}/top10`,
    `${base}/blog`,
    `${base}/fuer-unternehmen`,
    `${base}/methodik`,
    `${base}/ueber-s-listen`,
    `${base}/kontakt`,
    `${base}/impressum`,
    `${base}/datenschutz`,
  ]

  const categoryUrls = categories.map((c) => `${base}/kategorie/${c.slug}`)

  const subcategoryUrls = categories.flatMap((c) =>
    getPublishedSubcategories(c).map((s) => `${base}/kategorie/${c.slug}/${s.slug}`),
  )

  const listUrls = top10Lists.map((l) => `${base}/top10/${l.slug}`)

  const companyUrls = companies.map((c) => `${base}/unternehmen/${c.slug}`)

  const blogUrls = blogPosts.map((p) => `${base}/blog/${p.slug}`)

  return [...staticUrls, ...categoryUrls, ...subcategoryUrls, ...listUrls, ...companyUrls, ...blogUrls]
}

export async function GET() {
  try {
    const urlList = getAllUrls()

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(siteConfig.url).host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    })

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
