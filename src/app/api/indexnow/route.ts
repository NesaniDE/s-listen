import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/config'
import sitemap from '@/app/sitemap'

const INDEXNOW_KEY = 'e03471fb4cf66f9e84a0a06035701528'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/**
 * Wie weit zurueck Aenderungen gemeldet werden. Der Cron laeuft taeglich;
 * mit drei Tagen wird jede Aenderung in zwei Laeufen gemeldet, ein
 * ausgefallener Lauf geht also nicht verloren.
 */
const WINDOW_MS = 3 * 24 * 60 * 60 * 1000

/**
 * Ohne diese Zeile behandelt der App Router die Route als statisch: sie
 * liest weder Cookies noch Header noch Suchparameter, also wuerde Next.js
 * die Antwort einmal beim Build einfrieren und der taegliche Cron faende
 * jeden Tag dieselbe alte Antwort vor, statt tatsaechlich neu einzureichen.
 */
export const dynamic = 'force-dynamic'

/**
 * force-dynamic allein reicht nicht: Vercels Edge-CDN hat die Antwort
 * trotzdem unabhaengig vom Query-String zwischengespeichert (beobachtet
 * per X-Vercel-Cache: HIT). Der explizite no-store-Header verhindert das.
 */
const NO_STORE = { headers: { 'Cache-Control': 'no-store' } }

/**
 * Meldet nur Seiten, deren lastmod in der Sitemap in den letzten Tagen liegt.
 * Bing will ausdruecklich nur geaenderte URLs; taeglich alles zu melden waere
 * fuer IndexNow wie Spam. Die URLs kommen direkt aus sitemap(), damit Sitemap
 * und Meldung nie auseinanderlaufen — frueher wurden hier z. B. auch
 * Profile gemeldet, die auf noindex stehen.
 */
export async function GET() {
  try {
    const since = Date.now() - WINDOW_MS
    const urlList = sitemap()
      .filter((e) => e.lastModified && new Date(e.lastModified).getTime() >= since)
      .map((e) => e.url)

    if (urlList.length === 0) {
      return NextResponse.json({ ok: true, submitted: 0, urls: [] }, NO_STORE)
    }

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

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        submitted: urlList.length,
        urls: urlList,
      },
      NO_STORE,
    )
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500, ...NO_STORE })
  }
}
