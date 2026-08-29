import Link from 'next/link'

type AdSpotTeaserProps = {
  context: string
  compact?: boolean
}

export default function AdSpotTeaser({ context, compact = false }: AdSpotTeaserProps) {
  return (
    <section style={{ marginBottom: compact ? '1.5rem' : '2rem' }}>
      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="eyebrow">Empfohlene Anzeige</span>
        <span
          style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-subtle)',
          }}
        >
          Sponsored
        </span>
      </div>

      <Link href="/fuer-unternehmen" className="card-link" style={{ display: 'block' }}>
        <div
          className="card-base"
          style={{
            display: 'grid',
            gridTemplateColumns: '56px 44px minmax(0, 1fr) auto',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.125rem 1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <div
              aria-label="Anzeige"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(232, 185, 72, 0.14)',
                border: '1px solid rgba(232, 185, 72, 0.3)',
                color: 'var(--accent)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.5 18 4 7.5l5 3L12 4l3 6.5 5-3L17.5 18H6.5Zm.9-2h9.2l1.2-4.7-3.6 2.2L12 8.8l-2.2 4.7-3.6-2.2L7.4 16Z" />
              </svg>
            </div>
          </div>

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, rgba(32, 33, 38, 0.98), rgba(18, 19, 24, 0.98))',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            BG
          </div>

          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--text)',
                marginBottom: '0.25rem',
                letterSpacing: '-0.015em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Beispiel GmbH
            </h3>
            <div style={{ marginBottom: '0.35rem' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '999px',
                  padding: '0.18rem 0.45rem',
                }}
              >
                Anzeige
              </span>
            </div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              So kann dein Unternehmen als sichtbare Anzeige oberhalb von {context} erscheinen.
            </p>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {['Anzeige', 'Premium', 'Sichtbarkeit'].map((tag) => (
                <span key={tag} className="badge badge-purple">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>

      <div
        style={{
          marginTop: '0.75rem',
          padding: '0 0.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>
          Sichtbarer Anzeigenplatz oberhalb von {context}. Auch dein Unternehmen kann hier als Anzeige erscheinen.
        </p>
        <Link href="/fuer-unternehmen" className="link-arrow">
          Anzeige schalten
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
