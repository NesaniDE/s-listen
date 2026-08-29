'use client'
import { useState } from 'react'

interface FilterBarProps {
  filters?: string[]
}

export default function FilterBar({ filters = ['Alle', 'Neu', 'Beliebt', 'Top bewertet'] }: FilterBarProps) {
  const [active, setActive] = useState(filters[0])

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
      {filters.map((f) => {
        const isActive = active === f
        return (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              fontSize: '0.825rem',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: isActive ? 'var(--text)' : 'var(--border)',
              background: isActive ? 'var(--text)' : 'transparent',
              color: isActive ? 'var(--bg)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            {f}
          </button>
        )
      })}
    </div>
  )
}
