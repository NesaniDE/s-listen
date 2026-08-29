import Link from 'next/link'
import { Top10List } from '@/data/lists'

export default function TopListCard({ list }: { list: Top10List }) {
  return (
    <Link href={`/top10/${list.slug}`} className="card-link" style={{ display: 'block', height: '100%' }}>
      <div
        className="card-base"
        style={{
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="badge badge-yellow">Top 10</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{list.updatedAt}</span>
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '1.05rem',
              color: 'var(--text)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            {list.title}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {list.intro}
          </p>
        </div>

        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--text)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          Liste ansehen
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
