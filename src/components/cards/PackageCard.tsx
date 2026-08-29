interface PackageCardProps {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export default function PackageCard({ name, price, description, features, highlighted }: PackageCardProps) {
  return (
    <div
      className="card-base"
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
        background: highlighted ? 'var(--surface-hover)' : 'var(--surface)',
        borderColor: highlighted ? 'var(--border-strong)' : 'var(--border)',
      }}
    >
      {highlighted && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <span className="badge badge-yellow">Empfohlen</span>
        </div>
      )}
      <div>
        <h3
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--text)',
            marginBottom: '0.625rem',
            letterSpacing: '-0.02em',
          }}
        >
          {name}
        </h3>
        <div
          className="font-serif"
          style={{
            fontSize: '2.25rem',
            color: 'var(--text)',
            marginBottom: '0.75rem',
            lineHeight: 1,
          }}
        >
          {price}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.55 }}>{description}</p>
      </div>
      <hr className="divider" />
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          flex: 1,
        }}
      >
        {features.map((f, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              color: 'var(--text)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              style={{ marginTop: '0.2rem', flexShrink: 0, color: 'var(--text-muted)' }}
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={highlighted ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
        Anfragen
      </button>
    </div>
  )
}
