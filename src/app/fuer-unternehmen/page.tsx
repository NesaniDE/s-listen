import PackageCard from '@/components/cards/PackageCard'
import PageHero from '@/components/layout/PageHero'
import FAQSection from '@/components/ui/FAQSection'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Für Unternehmen',
  description:
    'Werde Teil von S Listen — redaktionelle Sichtbarkeit für lokale Unternehmen in Stuttgart. Informationen zu Paketen, Ablauf und häufigen Fragen.',
  path: '/fuer-unternehmen',
  keywords: ['Für Unternehmen', siteConfig.city, ...siteConfig.keywords],
})

const packages = [
  {
    name: 'Basic',
    price: 'Kostenlos',
    description: 'Ein einfacher Unternehmenseintrag, wenn dein Betrieb redaktionell passend aufgenommen wird.',
    features: ['Basis-Profil', 'Nennung in passenden Listen', 'Lokale Sichtbarkeit ohne Anzeigenplatz'],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'Auf Anfrage',
    description: 'Eine sichtbare Anzeige in einer Kategorie oder Liste deiner Wahl.',
    features: [
      'Anzeige oberhalb einer passenden Kategorie oder Liste',
      'Kennzeichnung als Anzeige',
      'Verlinkung auf dein Unternehmensprofil',
      'Kategorie nach Absprache wählbar',
    ],
    highlighted: true,
  },
  {
    name: 'Business',
    price: 'Auf Anfrage',
    description: 'Für Unternehmen, die in mehreren Kategorien oder Listen sichtbar sein möchten.',
    features: [
      'Mehrere Anzeigenplätze nach Bedarf',
      'Kategorien und Listen frei abstimmbar',
      'Geeignet für Kampagnen oder laufende Sichtbarkeit',
      'Individuelle Laufzeit und Platzierung',
    ],
    highlighted: false,
  },
]

const faqItems = [
  {
    question: 'Wie kommt mein Unternehmen auf eine Liste?',
    answer:
      'Grundsätzlich redaktionell: S Listen beobachtet lokale Kategorien und baut daraus Listen-Seiten. Unternehmen können zusätzlich anfragen, ob ihr Profil ergänzt, korrigiert oder überarbeitet werden soll.',
  },
  {
    question: 'Kann ich meinen Eintrag bearbeiten lassen?',
    answer:
      'Ja. Langfristig ist genau das vorgesehen: bessere Texte, zusätzliche Informationen, Leistungen, Kontaktpunkte und später auch Bilder oder besondere Hinweise.',
  },
  {
    question: 'Wie wird die Reihenfolge bestimmt?',
    answer:
      'Die Reihenfolge ist redaktionell und orientiert sich an lokaler Relevanz, Profilklarheit und Nutzwert für Suchende. Sie stellt unsere Einschätzung dar und ist nicht einfach kaufbar.',
  },
  {
    question: 'Kann ich eine Korrektur oder Entfernung meines Unternehmens anfragen?',
    answer:
      `Ja. Hinweise zu fehlerhaften Angaben, Ergänzungen oder die Bitte um Prüfung einer Entfernung können jederzeit an ${siteConfig.publisher.email} gesendet werden.`,
  },
  {
    question: 'Ist S Listen nur für Stuttgart?',
    answer:
      'Ja, der Startfokus ist bewusst eng gesetzt. Genau das macht die Plattform lokal klarer und stärker als ein generisches Verzeichnis.',
  },
]

const benefits = [
  { title: 'Lokaler Fokus', desc: 'S Listen konzentriert sich nicht auf ganz Deutschland, sondern auf Stuttgart.' },
  { title: 'Klare Kategorien', desc: 'Unternehmen erscheinen im passenden thematischen Kontext, nicht irgendwo.' },
  { title: 'Mehr Einordnung', desc: 'Profile zeigen mehr als nur Name, Adresse und Telefonnummer.' },
  { title: 'Skalierbar', desc: 'Die Plattform ist so angelegt, dass sie Stück für Stück erweitert werden kann.' },
]

const steps = ['Anfrage senden', 'Profil abstimmen', 'Eintrag veröffentlichen', 'Später ausbauen']

export default function FuerUnternehmenPage() {
  return (
    <div>
      <PageHero
        badge="Für Unternehmen"
        title="Werde Teil von S Listen"
        subtitle="Die Plattform ist auf Stuttgart fokussiert. Listen und Reihenfolgen sind redaktionelle Einschätzungen und keine objektiven Qualitätsurteile."
      />

      <div className="section-container" style={{ paddingBottom: '6rem' }}>
        {/* Benefits */}
        <section style={{ marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Vorteile
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>
            Warum S Listen?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--border)',
            }}
            className="benefits-grid"
          >
            {benefits.map((b, i) => (
              <div
                key={b.title}
                style={{
                  padding: '2rem 1.5rem 2rem 0',
                  borderRight: i < benefits.length - 1 ? '1px solid var(--border)' : 'none',
                  paddingLeft: i > 0 ? '1.5rem' : 0,
                }}
                className="benefit-item"
              >
                <div
                  className="font-serif"
                  style={{ fontSize: '1.5rem', color: 'var(--text-subtle)', marginBottom: '1rem', lineHeight: 1 }}
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
                  {b.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section style={{ marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Pakete
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Mögliche Pakete
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              marginBottom: '2.5rem',
              maxWidth: '600px',
            }}
          >
            Die Pakete zeigen die geplanten Möglichkeiten: kostenloser Grundeintrag, einzelne Anzeige oder flexible
            Sichtbarkeit in mehreren Kategorien und Listen.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Ablauf
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>
            So könnte der Ablauf aussehen
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

        {/* FAQ */}
        <section style={{ maxWidth: '720px', marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            FAQ
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
            Häufige Fragen
          </h2>
          <FAQSection items={faqItems} />
        </section>

        {/* Final CTA */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Interesse an einem Eintrag?
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Die Website ist bereits inhaltlich gestartet. Unternehmen können ihre Daten später gezielt ergänzen oder
            erweitern lassen. Korrekturen oder die Prüfung einer Entfernung sind ebenfalls jederzeit auf Anfrage
            möglich.
          </p>
        </section>

        {/* Betreiber */}
        <section
          style={{
            marginTop: '4rem',
            padding: '2rem',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            background: 'var(--bg-elevated)',
          }}
        >
          <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Betreiber
          </span>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Umgesetzt von Nesani
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '1.5rem',
            }}
          >
            {siteConfig.name} wird von der Nesani UG (haftungsbeschränkt) aus Schwäbisch Gmünd entwickelt und
            redaktionell gepflegt — einer Digitalagentur für Websites, KI-Workflows und Automatisierung. Wer über
            den Eintrag hinaus an einer eigenen Website oder an automatisierten Abläufen arbeitet, findet dort den
            direkten Ansprechpartner.
          </p>
          <a
            href="https://www.nesani.de"
            target="_blank"
            rel="noopener"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            nesani.de
          </a>
        </section>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .benefit-item { border-right: none !important; padding-left: 0 !important; border-bottom: 1px solid var(--border); }
          .benefit-item:last-child { border-bottom: none; }
          .process-item { border-right: none !important; padding-left: 0 !important; border-bottom: 1px solid var(--border); }
          .process-item:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
