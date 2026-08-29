import Link from 'next/link'
import { Category } from '@/data/categories'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/kategorie/${category.slug}`} className="card-link" style={{ display: 'block' }}>
      <div
        className="card-base"
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '160px',
        }}
      >
        <div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--text)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            {category.label}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              lineHeight: 1.5,
            }}
          >
            {category.subcategories.length} Unterkategorien
          </p>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginTop: '1.25rem',
          }}
        >
          Entdecken
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
