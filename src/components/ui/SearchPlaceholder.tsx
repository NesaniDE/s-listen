'use client'

import Link from 'next/link'
import { useState } from 'react'

type SearchItem = {
  title: string
  href: string
  type: 'Kategorie' | 'Liste' | 'Unternehmen'
  subtitle?: string
  searchText: string
}

export default function SearchPlaceholder({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery ? items.filter((item) => item.searchText.includes(normalizedQuery)).slice(0, 8) : []

  return (
    <div style={{ maxWidth: '640px', position: 'relative' }}>
      <div
        className="search-placeholder"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '0.2rem 0.25rem 0.2rem 1rem',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isFocused ? '0 0 0 3px rgba(232, 185, 72, 0.12)' : 'none',
        }}
      >
        <svg width="16" height="16" fill="none" stroke="var(--text-subtle)" strokeWidth={1.75} viewBox="0 0 24 24">
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 120)
          }}
          placeholder="Suche nach Kategorie, Liste oder Unternehmen"
          aria-label="Suche nach Kategorie, Liste oder Unternehmen"
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text)',
            fontSize: '0.95rem',
            padding: '0.75rem 0',
          }}
        />

        <span
          style={{
            color: 'var(--text-subtle)',
            fontSize: '0.7rem',
            padding: '0.35rem 0.55rem',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            background: 'var(--surface)',
            whiteSpace: 'nowrap',
          }}
        >
          Live
        </span>
      </div>

      {isFocused && normalizedQuery && (
        <div
          className="search-results"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.6rem)',
            left: 0,
            right: 0,
            zIndex: 20,
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
          }}
        >
          {results.length > 0 ? (
            <div style={{ display: 'grid' }}>
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.href}`}
                  href={item.href}
                  style={{
                    padding: '0.95rem 1rem',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--text)',
                    background: 'transparent',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      marginBottom: item.subtitle ? '0.3rem' : 0,
                    }}
                  >
                    <span style={{ fontWeight: 600, lineHeight: 1.4 }}>{item.title}</span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-subtle)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  {item.subtitle && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.subtitle}</div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Keine Treffer gefunden. Versuch es zum Beispiel mit `Fotografen`, `Nesani` oder `Restaurants`.
            </div>
          )}
        </div>
      )}

      <style>{`
        .search-placeholder:hover {
          border-color: var(--border-strong) !important;
        }
        .search-results a:last-child {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  )
}
