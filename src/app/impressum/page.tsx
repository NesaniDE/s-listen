import PageHero from '@/components/layout/PageHero'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Impressum',
  description: 'Impressum und rechtliche Pflichtangaben für S Listen — betrieben von der Nesani UG (haftungsbeschränkt), HRB 751868, aus Schwäbisch Gmünd.',
  path: '/impressum',
})

const sections = [
  {
    title: 'Angaben gemäß § 5 TMG',
    content: [
      'Nesani UG (haftungsbeschränkt)',
      'Basilikumweg 8',
      '73527 Schwäbisch Gmünd',
      'Deutschland',
    ],
  },
  {
    title: 'Registereintrag',
    content: [
      'Eintragung im Handelsregister',
      'Registergericht: Amtsgericht Ulm',
      'Registernummer: HRB 751868',
    ],
  },
  {
    title: 'Vertreten durch',
    content: ['Nedim Hasani, Geschäftsführer'],
  },
  {
    title: 'Kontakt',
    content: [`E-Mail: ${siteConfig.publisher.email}`, 'Web: https://www.nesani.de'],
  },
  {
    title: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
    content: ['Nedim Hasani', 'Basilikumweg 8', '73527 Schwäbisch Gmünd'],
  },
  {
    title: 'Redaktioneller Hinweis',
    content: [
      'Die auf S Listen veröffentlichten Listen, Reihenfolgen und Unternehmensbeschreibungen stellen redaktionelle Einschätzungen dar.',
      'Sie erheben keinen Anspruch auf Vollständigkeit, Gleichbehandlung oder auf eine objektiv richtige Rangfolge.',
      `Korrekturen, Ergänzungen oder die Prüfung einer Entfernung können per E-Mail an ${siteConfig.publisher.email} angefragt werden.`,
    ],
  },
  {
    title: 'Haftung für Inhalte',
    content: [
      'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
    ],
  },
  {
    title: 'Haftung für Links',
    content: [
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    ],
  },
  {
    title: 'Urheberrecht',
    content: [
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
    ],
  },
  {
    title: 'Streitbeilegung',
    content: [
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.',
      'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
]

export default function ImpressumPage() {
  return (
    <div>
      <PageHero badge="Rechtliches" title="Impressum" />

      <div className="section-container-narrow" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sections.map((section, i) => (
            <div
              key={section.title}
              style={{
                padding: '1.75rem 0',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <h2
                className="section-title"
                style={{ fontSize: '1.05rem', marginBottom: '0.875rem' }}
              >
                {section.title}
              </h2>
              {section.content.map((line, j) => (
                <p
                  key={j}
                  style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75 }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
