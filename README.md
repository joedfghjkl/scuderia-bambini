# Scuderia Bambini — Webseite

Webseite für **Scuderia Bambini** — ein **Motorsport-Projekt für Jugendliche** in Kooperation mit der fns:köln und der Motorsportakademie.

## Ansehen
- **Einfach:** `index.html` doppelklicken (öffnet im Browser).
- **Mit lokalem Server** (empfohlen für die Animation):
  ```bash
  cd scuderia-bambini
  python3 -m http.server 8765
  # dann http://localhost:8765 öffnen
  ```

## Dateien
- `index.html` — Seitenstruktur & Inhalte
- `styles.css` — Design (Navy/Gold-Racing-Look)
- `script.js` — Startampel, Scroll-Animation, Navigation, Galerie und E-Mail-Anfragen
- `impressum.html` / `datenschutz.html` — Anbieter- und Datenschutzhinweise
- `assets/` — Logo, Video, Fotos, Sponsorenmappe, lokale Schriftarten und JavaScript-Bibliotheken

## Technik
Reines HTML/CSS/JS ohne Build-Schritt. Animation: **GSAP ScrollTrigger + MotionPath**, lokal unter `assets/vendor/` eingebunden. Schriftarten werden ebenfalls lokal geladen.
Das echte Logo wird aus `assets/logo.png` geladen; das SVG-Wappen dient als Fallback. Das animierte Auto ist als SVG umgesetzt.
Vercel Web Analytics erfasst Seitenaufrufe und ausgewählte Ereignisse. Der Website-Code übermittelt keine Formularinhalte an Analytics.

## Funktionen
- Hero mit Logo-Video und Startampel (rot → grün)
- Scroll-Animation mit Rennstrecke und Auto
- Mobile Navigation, Galerie mit Filtern und Großansicht
- Informationen zu Projekt, Rennen, Rennlizenz, Werkstatt und Partnerschaften
- Kontaktformular bereitet eine E-Mail im eigenen E-Mail-Programm vor; die Person versendet sie selbst. Kein automatischer Versand und keine Speicherung der Eingaben durch den Website-Code.
- Sponsorenmappe als PDF sowie Impressum und Datenschutzhinweise

## Inhaltlicher Stand: 28. Oktober 2026
Das Spa-Rennwochenende vom 23.–25. Oktober 2026 liegt zurück; die geplante Teilnahme von Scuderia Bambini wurde abgesagt. Der Abschnitt `#spa` dokumentiert diesen Status und bleibt als bestehendes Linkziel erhalten. Für diese Veranstaltung werden keine Fahrerplätze mehr beworben.

Sponsoring und Kontakt beziehen sich auf das laufende Motorsport-Projekt und die Nachwuchsarbeit. Neue Renntermine, Fahrerplatzangebote oder Lizenzanforderungen erst nach bestätigter Planung und anhand der jeweiligen Ausschreibung ergänzen.
