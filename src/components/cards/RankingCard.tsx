import Link from 'next/link'
import { RankingEntry } from '@/data/lists'
import CompanyLogo from '@/components/ui/CompanyLogo'

export default function RankingCard({
  entry,
  isSponsored = false,
}: {
  entry: RankingEntry
  listSlug?: string
  isSponsored?: boolean
}) {
  return (
    <Link
      href={`/unternehmen/${entry.slug}`}
      className="card-link"
      style={{ display: 'block' }}
    >
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
          {isSponsored ? (
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
          ) : (
            <span
              className="rank-number"
              style={{
                fontSize: entry.rank === 1 ? '2.5rem' : '2rem',
                color: entry.rank <= 3 ? 'var(--text)' : 'var(--text-subtle)',
              }}
            >
              {entry.rank.toString().padStart(2, '0')}
            </span>
          )}
        </div>

        <CompanyLogo
          name={entry.name}
          website={entry.website}
          logo={entry.logo}
          size={44}
          radius={10}
          fontSize="0.75rem"
        />

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
            {entry.name}
          </h3>
          {isSponsored && (
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
          )}
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: entry.tags.length > 0 ? '0.5rem' : 0,
            }}
          >
            {entry.description}
          </p>
          {entry.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {entry.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="badge badge-purple">
                  {tag}
                </span>
              ))}
            </div>
          )}
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
          className="ranking-arrow"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
