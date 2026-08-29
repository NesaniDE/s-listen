import PageHero from '@/components/layout/PageHero'
import { siteConfig } from '@/lib/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung für S Listen — transparente Informationen zur Datenverarbeitung, zu eingesetzten Diensten und zu deinen Rechten nach DSGVO und BDSG.',
  path: '/datenschutz',
})

const sections = [
  {
    title: 'Verantwortliche Stelle',
    text:
      `Verantwortlich für diese Website ist die Nesani UG (haftungsbeschränkt), Basilikumweg 8, 73527 Schwäbisch Gmünd, E-Mail: ${siteConfig.publisher.email}. Diese Hinweise bilden den aktuellen technischen Stand der Website vom 25. April 2026 ab.`,
  },
  {
    title: 'Hosting und Server-Logfiles',
    text:
      'Beim Aufruf der Website können technisch erforderliche Verbindungsdaten verarbeitet werden, zum Beispiel IP-Adresse, Datum und Uhrzeit, angefragte URL, Referrer, Browsertyp und Betriebssystem. Diese Verarbeitung ist für einen sicheren und stabilen Betrieb der Website erforderlich.',
  },
  {
    title: 'Redaktionelle Unternehmensprofile und Listen',
    text:
      'S Listen verarbeitet Unternehmensdaten wie Name, Anschrift, Website, Telefonnummer, Kategorien, Beschreibungen und redaktionelle Einordnungen, um lokale Listen und Profilseiten bereitzustellen. Die Inhalte dienen der redaktionellen Orientierung und können auf öffentlich zugänglichen Informationen, eigenen Recherchen und Nutzerhinweisen beruhen.',
  },
  {
    title: 'Kontakt per E-Mail',
    text:
      'Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben und den Nachrichteninhalt ausschließlich zur Bearbeitung deines Anliegens. Das gilt auch für Korrektur-, Ergänzungs- oder Entfernungsanfragen zu Unternehmensprofilen und Listen.',
  },
  {
    title: 'Cookies und lokale Speicherungen',
    text:
      'Nach heutigem Stand setzt diese Website keine optionalen Analyse- oder Marketing-Cookies ein. Verwendet werden nur technisch erforderliche Cookies sowie vergleichbare lokale Speicherungen, soweit sie für den Betrieb der Website oder für grundlegende Funktionen wie das Ausblenden des Cookie-Hinweises notwendig sind.',
  },
  {
    title: 'Externe Inhalte und Verlinkungen',
    text:
      'Unternehmenslogos werden aktuell aus öffentlich erreichbaren Favicon-Quellen abgeleitet und über die Website ausgeliefert. Außerdem enthält S Listen externe Links zu Websites Dritter. Beim bewussten Anklicken solcher Links gelten die Datenschutzbestimmungen der jeweiligen Anbieter.',
  },
  {
    title: 'Reichweitenmessung mit Vercel Analytics & Speed Insights',
    text:
      'Diese Website nutzt Vercel Analytics und Vercel Speed Insights (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA) zur anonymen Reichweitenmessung und zur Messung technischer Performance-Kennzahlen wie Core Web Vitals. Beide Dienste arbeiten cookielos und ohne persistente IDs: Es werden keine personenbezogenen Daten in einem klassischen Tracking-Profil gespeichert, IP-Adressen werden nur kurzzeitig zur Sitzungs-Hash-Bildung verwendet und nicht dauerhaft gespeichert. Erfasst werden Seitenaufrufe, Referrer, Geräte- und Browser-Kategorien sowie technische Performance-Werte. Rechtsgrundlage ist unser berechtigtes Interesse an einer technisch zuverlässigen, schnellen und anonym nachvollziehbaren Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen: https://vercel.com/docs/analytics und https://vercel.com/legal/privacy-policy.',
  },
  {
    title: 'Sonstige Analyse- und Marketing-Dienste',
    text:
      'Über die genannte Reichweitenmessung hinaus werden auf dieser Website keine weiteren optionalen Tracking-, Analyse- oder Marketing-Dienste eingebunden. Falls sich das technisch ändert, wird diese Datenschutzerklärung vor dem Einsatz entsprechend angepasst.',
  },
  {
    title: 'Deine Rechte',
    text:
      `Du hast im Rahmen der gesetzlichen Vorgaben insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch. Hinweise zu redaktionellen Profilen, fehlerhaften Angaben oder der Wunsch nach Prüfung einer Entfernung können an ${siteConfig.publisher.email} gerichtet werden.`,
  },
]

export default function DatenschutzPage() {
  return (
    <div>
      <PageHero badge="Rechtliches" title="Datenschutzerklärung" />

      <div className="section-container-narrow" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sections.map((s, i) => (
            <div
              key={s.title}
              style={{
                padding: '1.5rem 0',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <h2
                className="section-title"
                style={{ fontSize: '1.05rem', marginBottom: '0.625rem' }}
              >
                {String(i + 1).padStart(2, '0')}. {s.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
