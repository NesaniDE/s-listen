import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      style={{
        padding: '1.5rem 0 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {i > 0 && (
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>/</span>
          )}
          {crumb.href && i < crumbs.length - 1 ? (
            <Link
              href={crumb.href}
              className="breadcrumb-link"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                transition: 'color 0.15s ease',
              }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text)', fontSize: '0.8rem', fontWeight: 500 }}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
      <style>{`.breadcrumb-link:hover { color: var(--text) !important; }`}</style>
    </nav>
  )
}
