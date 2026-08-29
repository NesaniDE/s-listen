'use client'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            style={{
              borderBottom: '1px solid var(--border)',
              padding: '1.25rem 0',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <h4
                style={{
                  fontWeight: 500,
                  fontSize: '0.975rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.question}
              </h4>
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  transition: 'transform 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                  display: 'inline-flex',
                }}
                aria-hidden="true"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            {isOpen && (
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  marginTop: '0.875rem',
                  maxWidth: '700px',
                }}
              >
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
