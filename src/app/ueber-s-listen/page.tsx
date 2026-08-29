import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/sections/CTASection'
import { categories } from '@/data/categories'
import { top10Lists } from '@/data/lists'
import { companies } from '@/data/companies'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Über S Listen',
  description:
    'S Listen ist eine redaktionelle Listen-Plattform exklusiv für Stuttgart — betrieben von der Nesani UG mit dem Ziel klarer lokaler Orientierung.',
  path: '/ueber-s-listen',
  keywords: ['Über S Listen', siteConfig.city, ...siteConfig.keywords],
})

export default function UeberGdListenPage() {
  const stats = [
    { value: String(categories.length), label: 'Kategorien' },
    { value: String(top10Lists.length), label: 'Listen' },
    { value: String(companies.length), label: 'Profile' },
    { value: '1', label: 'Stadt' },
  ]

  const blocks = [
    {
      title: 'Die Idee',
      text: 'S Listen soll zeigen, dass lokale Empfehlungen nicht wie ein beliebiges Branchenverzeichnis aussehen müssen. Statt überladener Trefferlisten entsteht eine kuratierte Plattform mit festen Kategorien, klaren Top-10-Seiten und sauber strukturierten Unternehmensprofilen.',
    },
    {
      title: 'Der Fokus',
      text: 'Der Startpunkt ist bewusst eng gesetzt: nur Stuttgart. Genau diese Konzentration macht die Plattform stark, weil Inhalte, Unternehmen und Nutzerkontext nicht verwässern.',
    },
    {
      title: 'Die Einordnung',
      text: 'S Listen veröffentlicht redaktionelle Einschätzungen und keine objektiven Qualitätsurteile. Listen und Reihenfolgen sollen Orientierung geben, nicht eine endgültige oder vollständige Wahrheit über lokale Anbieter behaupten.',
    },
    {
      title: 'Korrektur & Entfernung',
      text: `Unternehmen können Hinweise zu fehlerhaften Angaben, Ergänzungen oder die Prüfung einer Entfernung jederzeit per E-Mail an ${siteConfig.publisher.email} anstoßen. Transparenz und Aktualität sind wichtiger als starre Listenplätze.`,
    },
  ]

  return (
    <div>
      <PageHero
        badge="Über uns"
        title="Was ist S Listen?"
        subtitle="Eine lokale redaktionelle Listen-Plattform nur für Stuttgart — klar strukturiert, thematisch sortiert und auf Orientierung statt Absolutheit ausgelegt."
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        {/* Stats */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            marginBottom: '5rem',
          }}
          className="ueber-stats"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '2rem 1.5rem',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              }}
              className="ueber-stat"
            >
              <div
                className="font-serif"
                style={{ fontSize: '2.25rem', color: 'var(--text)', marginBottom: '0.25rem', lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>{s.label}</div>
            </div>
          ))}
        </section>

        <section style={{ maxWidth: '760px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {blocks.map((block, i) => (
              <div
                key={block.title}
                style={{
                  padding: '2rem 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <span className="eyebrow" style={{ marginBottom: '0.625rem', display: 'inline-block' }}>
                  0{i + 1}
                </span>
                <h2
                  className="section-title"
                  style={{ fontSize: '1.5rem', marginBottom: '0.875rem' }}
                >
                  {block.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>{block.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Betreiberhinweis */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2.5rem',
            marginBottom: '4rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="betreiber-grid"
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: '0.625rem', display: 'inline-block' }}>
              Betreiber
            </span>
            <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '0.625rem' }}>
              Hinter S Listen steht Nesani
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              S Listen wird von der{' '}
              <a
                href="https://www.nesani.de"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Nesani UG
              </a>{' '}
              entwickelt und betrieben — einer Digitalagentur aus Stuttgart für Websites,
              KI-Workflows und digitale Transformation.
            </p>
          </div>
          <a
            href="https://www.nesani.de"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ whiteSpace: 'nowrap' }}
          >
            nesani.de
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </section>

        <CTASection
          title="Dabei sein?"
          subtitle="Trage dein Unternehmen ein oder nimm Kontakt auf, wenn du S Listen gemeinsam weiterentwickeln willst."
          primaryLabel="Für Unternehmen"
          primaryHref="/fuer-unternehmen"
          secondaryLabel="Kontakt"
          secondaryHref="/kontakt"
        />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ueber-stat { border-left: none !important; border-top: 1px solid var(--border); }
          .ueber-stat:first-child { border-top: none; }
        }
        @media (max-width: 720px) {
          .betreiber-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
