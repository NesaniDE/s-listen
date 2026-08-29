import { ReactNode } from 'react'

interface PageHeroProps {
  badge?: string
  title: ReactNode
  subtitle?: string
  children?: ReactNode
  centered?: boolean
}

export default function PageHero({ badge, title, subtitle, children, centered = false }: PageHeroProps) {
  return (
    <section
      style={{
        padding: '6rem 0 3rem',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <div className="section-container">
        {badge && (
          <div
            style={{
              marginBottom: '1.25rem',
              display: 'flex',
              justifyContent: centered ? 'center' : 'flex-start',
            }}
          >
            <span className="eyebrow">{badge}</span>
          </div>
        )}

        <h1
          className="section-title animate-slide-up"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            marginBottom: subtitle ? '1.25rem' : 0,
            maxWidth: centered ? '780px' : '880px',
            margin: centered ? `0 auto ${subtitle ? '1.25rem' : 0}` : `0 0 ${subtitle ? '1.25rem' : 0}`,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.075rem',
              lineHeight: 1.6,
              maxWidth: centered ? '640px' : '720px',
              margin: centered ? '0 auto' : 0,
              marginBottom: children ? '2rem' : 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  )
}
