import Link from 'next/link'
import { footerLinks, siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '5rem 0 2.5rem',
        marginTop: '8rem',
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
          className="footer-grid"
        >
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
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
                }}
              >
                S
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                Listen
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Redaktionelle Top-10-Listen für {siteConfig.city}. Lokal. Kuratiert. Ohne Branchenbuch-Ballast.
            </p>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', lineHeight: 1.65, maxWidth: '360px', marginTop: '0.875rem' }}>
              Ein Projekt der{' '}
              <a
                href="https://www.nesani.de"
                target="_blank"
                rel="noopener"
                className="footer-link"
              >
                Nesani UG
              </a>
              {' '}— digitale Produkte aus {siteConfig.city}.
            </p>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', lineHeight: 1.65, maxWidth: '360px', marginTop: '0.5rem' }}>
              Korrekturen oder Entfernungsanfragen per E-Mail an {siteConfig.publisher.email}.
            </p>
          </div>

          <FooterColumn title="Plattform" links={footerLinks.platform} />
          <FooterColumn title="Unternehmen" links={footerLinks.unternehmen} />
          <FooterColumn title="Rechtliches" links={footerLinks.legal} />
        </div>

        <hr className="divider" style={{ marginBottom: '1.5rem' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} S Listen — {siteConfig.city}
          </p>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
            <a
              href="https://www.nesani.de"
              target="_blank"
              rel="noopener"
              className="footer-link"
              style={{ color: 'var(--text-muted)', fontWeight: 500 }}
            >
              Nesani UG — Web & digitale Produkte aus Schwäbisch Gmünd
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .footer-link { color: var(--text-muted); transition: color 0.15s ease; }
        .footer-link:hover { color: var(--text); }
        @media (max-width: 760px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4
        style={{
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer-link" style={{ fontSize: '0.875rem' }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
