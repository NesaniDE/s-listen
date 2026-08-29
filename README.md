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

## Datenstand ⚠️

**Die Plattform steht, die Inhalte nicht.** Das Repo startet bewusst ohne Rankings:

| Datei | Stand |
|---|---|
| `src/data/categories` | ✅ 10 Kategorien, 68 Unterkategorien für Stuttgart |
| `src/data/companies` | ⬜ leer — Profile erst nach eigener Recherche |
| `src/data/lists` | ⬜ leer — Top-10-Listen erst nach Redaktion |
| `src/data/blog` | ⬜ leer |

Solange keine Liste zu einer Unterkategorie existiert, behandelt `getPlaceholderSubcategories()`
sie automatisch als navigierbaren Platzhalter — die Seite ist also vollständig funktionsfähig
und wächst kategorieweise mit.

**Wichtig:** Unternehmensdaten (Name, Adresse, Telefon, Website) müssen vor Veröffentlichung
verifiziert sein. Die Einträge aus `gd-listen` sind echte Gmünder Betriebe und dürfen nicht
nach Stuttgart übertragen werden.

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
