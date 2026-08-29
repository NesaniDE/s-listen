import PageHero from '@/components/layout/PageHero'
import FAQSection from '@/components/ui/FAQSection'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Methodik',
  description:
    'Wie S Listen redaktionelle Top-10-Listen für Stuttgart einordnet — Kriterien, Prozess und transparente Hinweise ohne Anspruch auf Vollständigkeit.',
  path: '/methodik',
  keywords: ['Methodik', siteConfig.city, ...siteConfig.keywords],
})

const criteria = [
  {
    title: 'Öffentliche Reputation',
    desc: 'Sichtbarkeit, Bewertungen, Wiedererkennbarkeit und das öffentliche Gesamtbild eines Betriebs.',
  },
  {
    title: 'Leistungsprofil',
    desc: 'Wie klar ist das Angebot? Gibt es eine erkennbare Spezialisierung oder ein verständliches Konzept?',
  },
  {
    title: 'Lokaler Bezug',
    desc: 'S Listen fokussiert sich auf Stuttgart. Relevanz für die Stadt ist ein zentrales Kriterium.',
  },
  {
    title: 'Aktualität',
    desc: 'Wir prüfen, ob Unternehmen aktiv auftreten, erreichbar sind und online einen gepflegten Eindruck machen.',
  },
  {
    title: 'Nutzerperspektive',
    desc: 'Nicht nur, wer existiert, sondern wer für Suchende schnell verständlich und hilfreich einordenbar ist.',
  },
  {
    title: 'Redaktionelle Einordnung',
    desc: 'Die finale Reihenfolge spiegelt unsere redaktionelle Einschätzung wider. Sie soll Orientierung geben, ohne absoluten oder objektiven Anspruch zu erheben.',
  },
]

const faqItems = [
  {
    question: 'Sind die Listen objektiv oder vollständig?',
    answer:
      'Nein. Die Listen sind redaktionelle Einschätzungen von S Listen und kein amtliches, vollständiges oder allgemeingültiges Ranking. Sie sollen die lokale Suche vereinfachen, nicht eine endgültige Wahrheit behaupten.',
  },
  {
    question: 'Kann ich Geld zahlen, um auf Platz 1 zu kommen?',
    answer:
      'Nein. Platzierungen sollen redaktionell nachvollziehbar bleiben. Sichtbarkeitspakete für Unternehmen dürfen die Reihenfolge nicht einfach kaufen.',
  },
  {
    question: 'Wie oft werden die Listen aktualisiert?',
    answer:
      'Die erste Version ist als Startbasis gedacht. Künftig sollten Listen regelmäßig geprüft und bei Bedarf überarbeitet werden, zum Beispiel quartalsweise oder bei größeren Änderungen.',
  },
  {
    question: 'Was tue ich, wenn mein Unternehmen falsch eingetragen ist oder entfernt werden soll?',
    answer:
      `Über die Kontaktseite oder per E-Mail an ${siteConfig.publisher.email} kann eine Korrektur, Ergänzung oder die Prüfung einer Entfernung angefragt werden. Ziel ist eine saubere, aktuelle und faire Darstellung aller gelisteten Profile.`,
  },
  {
    question: 'Können Unternehmen zusätzliche Informationen einreichen?',
    answer:
      'Ja. Langfristig ist S Listen genau dafür gedacht: Unternehmen können ihr Profil mit Bildern, Leistungen, Texten und Aktualisierungen verbessern.',
  },
]

const steps = ['Lokale Auswahl', 'Profile prüfen', 'Redaktionell sortieren', 'Liste veröffentlichen']

export default function MethodikPage() {
  return (
    <div>
      <PageHero
        badge="Transparenz"
        title="Unsere Methodik"
        subtitle="Wie wir redaktionelle Listen für Stuttgart strukturieren — transparent, lokal und ohne Anspruch auf objektive Allgemeingültigkeit."
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        <section style={{ maxWidth: '720px', marginBottom: '5rem' }}>
          <p style={{ color: 'var(--text)', lineHeight: 1.75, fontSize: '1.0625rem' }}>
            S Listen versteht sich nicht als objektiver Richter über lokale Qualität, sondern als strukturierte
            Orientierung aus redaktioneller Perspektive. Die Listen werden redaktionell aufgebaut, verbinden öffentlich
            sichtbare Informationen mit einer klaren Nutzerperspektive und erheben keinen Anspruch auf Vollständigkeit
            oder auf eine für alle verbindliche Reihenfolge.
          </p>
        </section>

        <section style={{ marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Bewertungskriterien
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>
            Worauf wir achten
          </h2>
          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--border)',
            }}
            data-criteria-grid
          >
            {criteria.map((c, i) => (
              <div
                key={c.title}
                style={{
                  padding: '1.75rem 1.5rem',
                  borderBottom: '1px solid var(--border)',
                  borderRight: (i + 1) % 3 === 0 ? 'none' : '1px solid var(--border)',
                }}
                className="criteria-item"
              >
                <div
                  className="font-serif"
                  style={{ fontSize: '1.25rem', color: 'var(--text-subtle)', marginBottom: '0.875rem', lineHeight: 1 }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Der Prozess
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>
            In vier Schritten
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--border)',
            }}
            className="process-grid"
          >
            {steps.map((step, i) => (
              <div
                key={step}
                style={{
                  padding: '2rem 1.5rem 2rem 0',
                  borderRight: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                  paddingLeft: i > 0 ? '1.5rem' : 0,
                }}
                className="process-item"
              >
                <div
                  className="font-serif"
                  style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '0.75rem', lineHeight: 1 }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '720px' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            FAQ
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
            Häufige Fragen
          </h2>
          <FAQSection items={faqItems} />
        </section>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .criteria-item { border-right: none !important; }
          .process-item { border-right: none !important; padding-left: 0 !important; border-bottom: 1px solid var(--border); }
          .process-item:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
