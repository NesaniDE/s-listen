import Link from 'next/link'

interface CTASectionProps {
  badge?: string
  title: string
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTASection({
  badge,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section
      style={{
        margin: '5rem 0',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '4rem 2.5rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {badge && (
          <div style={{ marginBottom: '1rem' }}>
            <span className="eyebrow">{badge}</span>
          </div>
        )}
        <h2
          className="section-title"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1rem' }}
        >
          {title}
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="btn-outline">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
