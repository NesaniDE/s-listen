# S Listen

Lokale Top-10 Plattform für Stuttgart. Nach dem Vorbild von [GD Listen](https://github.com/NesaniDE/gd-listen) (Schwäbisch Gmünd).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** – Unbounded (Headings) + Sora (Body)

## Setup

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Datenstand

Erster echter Datenstand aus **OpenStreetMap** (Abruf 08/2026, Lizenz ODbL):

| Datei | Stand |
|---|---|
| `src/data/categories` | 10 Kategorien, 68 Unterkategorien für Stuttgart |
| `src/data/companies` | **481 Unternehmensprofile** mit Adresse, teils Telefon und Website |
| `src/data/lists` | **48 vollständige Top-10-Listen** |
| `src/data/blog` | leer |

**Sortierung:** Die Reihenfolge innerhalb einer Liste richtet sich nach der
Vollständigkeit der hinterlegten Angaben (Adresse, Telefon, Website, Öffnungszeiten) —
sie ist **noch keine redaktionelle Qualitätsbewertung**. Das steht so auch in jedem
Listen-Intro, damit die Seite keine Wertung behauptet, die sie nicht leisten kann.

Es werden nur Unterkategorien veröffentlicht, für die **zehn** belegte Betriebe
vorliegen. Alle übrigen laufen über `getPlaceholderSubcategories()` als navigierbare
Platzhalter weiter.

**Offen:** Vor-Ort-Prüfung der Profile, redaktionelle Rankings, Blogartikel sowie die
Unterkategorien ohne ausreichende OSM-Abdeckung.

**Lizenz:** OSM-Daten stehen unter der Open Database License. Die Namensnennung
"© OpenStreetMap-Mitwirkende" ist im Footer eingebunden und muss dort bleiben.

## Routen

| Route | Beschreibung |
|---|---|
| `/` | Homepage |
| `/kategorie` | Kategorie-Übersicht |
| `/kategorie/[category]` | Kategorie-Detail |
| `/kategorie/[category]/[subcategory]` | Unterkategorie |
| `/top10` | Listen-Übersicht |
| `/top10/[slug]` | Top-10 Listen-Seite |
| `/unternehmen/[slug]` | Unternehmensprofil |
| `/blog`, `/blog/[slug]` | Blog |
| `/fuer-unternehmen` | Pakete & Eintragen |
| `/ueber-s-listen` | Über uns |
| `/kontakt` | Kontakt |
| `/methodik` | Bewertungsmethodik |
| `/impressum`, `/datenschutz` | Rechtliches |

## Konfiguration

Zentrale Stadt- und Markendaten in `src/lib/config.ts`.
Design-System als CSS-Variablen in `src/styles/globals.css`.

**Eigener IndexNow-Key:** liegt in `public/<key>.txt` und in `src/app/api/indexnow/route.ts`.
Nicht mit anderen Nesani-Seiten teilen.

## Deployment

Vercel, Domain `www.s-listen.de`. Der Cron in `vercel.json` pingt täglich um 03:00 `/api/indexnow`.

---

Built by [Nesani](https://www.nesani.de).
