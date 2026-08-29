import { createPageMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Seite nicht gefunden',
  description: 'Die angeforderte Seite konnte auf S Listen nicht gefunden werden.',
  path: '/404',
  robots: { index: false, follow: true },
})

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div>
        <div
          className="font-serif"
          style={{ fontSize: '6rem', color: 'var(--text-subtle)', lineHeight: 1, marginBottom: '0.5rem' }}
        >
          404
        </div>
        <h1
          className="section-title"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1rem' }}
        >
          Seite nicht gefunden
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: '420px',
            margin: '0 auto 2.5rem',
          }}
        >
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">
            Zur Startseite
          </Link>
          <Link href="/kategorie" className="btn-outline">
            Kategorien ansehen
          </Link>
        </div>
      </div>
    </div>
  )
}
