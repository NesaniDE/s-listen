'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { navLinks } from '@/lib/config'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(8, 8, 10, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, backdrop-filter 0.2s ease',
      }}
    >
      <div
        className="section-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              background: 'var(--text)',
              color: 'var(--bg)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            S
          </span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Listen
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map((link) => (
            (() => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '6px',
                    transition: 'color 0.15s ease, background-color 0.15s ease',
                  }}
                >
                  {link.label}
                </Link>
              )
            })()
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              color: 'var(--text)',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'none',
            }}
            className="mobile-menu-btn"
            aria-label="Menü"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            background: 'rgba(8, 8, 10, 0.96)',
            backdropFilter: 'blur(14px)',
            borderTop: '1px solid var(--border)',
            padding: '1rem 1.5rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text)',
                padding: '0.625rem 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
        .nav-link:hover { color: var(--text) !important; background: rgba(255,255,255,0.04); }
      `}</style>
    </header>
  )
}
