'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'gd-cookie-banner-dismissed'

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== '1')
    } catch {
      setVisible(true)
    }
  }, [])

  function dismissBanner() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Ignore storage errors and simply close the banner for the current session.
    }

    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: '1rem',
        right: '1rem',
        bottom: '1rem',
        zIndex: 80,
      }}
    >
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          background: 'rgba(17, 17, 20, 0.96)',
          border: '1px solid var(--border-strong)',
          borderRadius: '16px',
          padding: '1rem 1rem 1rem 1.125rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.28)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div style={{ flex: '1 1 480px' }}>
          <p style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.375rem' }}>
            Cookie-Hinweis
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Diese Website verwendet nach heutigem Stand nur technisch notwendige Cookies und vergleichbare lokale
            Speicherungen, etwa um diesen Hinweis auszublenden. Es werden derzeit keine optionalen Analyse- oder
            Marketing-Cookies eingesetzt. Details stehen in der{' '}
            <Link
              href="/datenschutz"
              style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
          <Link href="/datenschutz" className="btn-outline">
            Datenschutz
          </Link>
          <button type="button" className="btn-primary" onClick={dismissBanner}>
            Verstanden
          </button>
        </div>
      </div>
    </div>
  )
}
