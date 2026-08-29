import PageHero from '@/components/layout/PageHero'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

const contactEmail = siteConfig.publisher.email

export const metadata = createPageMetadata({
  title: 'Kontakt',
  description:
    'S Listen ist redaktionelle Wissensbank für Stuttgart. Korrekturen, Entfernungsanfragen, Hinweise und Eintragsanfragen bitte über die Nesani UG.',
  path: '/kontakt',
  keywords: ['Kontakt', siteConfig.city, ...siteConfig.keywords],
})

const contactItems = [
  { label: 'Betreiber', value: 'Nesani UG (haftungsbeschränkt)', href: 'https://www.nesani.de' },
  { label: 'E-Mail', value: contactEmail, href: `mailto:${contactEmail}` },
  { label: 'Standort', value: 'Stuttgart, Baden-Württemberg' },
]

const reasons = [
  {
    title: 'Korrektur oder Entfernung',
    desc: 'Daten, Beschreibung oder Einordnung stimmen nicht mehr, oder dein Unternehmen soll geprüft entfernt werden? Schreib uns kurz — wir prüfen jede Anfrage redaktionell.',
  },
  {
    title: 'Eintrag vorschlagen',
    desc: 'Du kennst eine Adresse in Stuttgart, die in einer Top-10-Liste fehlen sollte? Sag Bescheid.',
  },
  {
    title: 'Eigenes Unternehmen',
    desc: 'Du willst dein Unternehmen optimieren oder eintragen lassen? Mehr Details auf der Seite „Für Unternehmen".',
  },
  {
    title: 'Presse & Kooperation',
    desc: `Anfragen rund um S Listen oder den Betreiber Nesani gehen ebenfalls an ${contactEmail}.`,
  },
]

export default function KontaktPage() {
  return (
    <div>
      <PageHero
        badge="Kontakt"
        title="Schreib uns"
        subtitle="S Listen ist eine redaktionelle Wissensbank — für Korrekturen, Entfernungsanfragen und Hinweise nutzen wir den direkten Weg per E-Mail."
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <div
          className="kontakt-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '3rem',
            maxWidth: '1000px',
            alignItems: 'start',
          }}
        >
          {/* Linke Spalte: Kontakt-Infos */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Kontakt-Infos
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {contactItems.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: '1.25rem 0',
                    borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          color: 'var(--text)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`mailto:${contactEmail}`}
              className="btn-primary"
              style={{ marginTop: '1.75rem', width: '100%', justifyContent: 'center' }}
            >
              E-Mail schreiben
            </a>
          </div>

          {/* Rechte Spalte: Anlässe */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Wofür der Kontakt sinnvoll ist
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {reasons.map((reason, i) => (
                <div
                  key={reason.title}
                  style={{
                    padding: '1.5rem 0',
                    borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .kontakt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
