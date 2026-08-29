import Link from 'next/link'
import { Company } from '@/data/companies'
import CompanyLogo from '@/components/ui/CompanyLogo'

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/unternehmen/${company.slug}`} className="card-link" style={{ display: 'block', height: '100%' }}>
      <div
        className="card-base"
        style={{
          padding: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        <CompanyLogo name={company.name} website={company.website} logo={company.logo} size={48} radius={10} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              marginBottom: '0.3rem',
              letterSpacing: '-0.015em',
            }}
          >
            {company.name}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.825rem',
              lineHeight: 1.5,
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {company.description}
          </p>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {company.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge badge-purple">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
