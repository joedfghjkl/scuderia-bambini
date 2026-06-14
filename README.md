# Scuderia Bambini — Webseite (Prototyp)

Webseite für die **Motorsport-AG der fns:köln** — „Motorsport goes green".

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
- `script.js` — Startampel + Scroll-Animation (Auto fährt die Strecke)
- `assets/` — hier kommen später Logo-Datei & Fotos rein

## Technik
Reines HTML/CSS/JS. Animation: **GSAP ScrollTrigger + MotionPath** (via CDN).
Das SCB-Wappen und das Auto sind aktuell als SVG nachgebaut (Platzhalter).

## Status (Phase 1 — Prototyp)
- ✅ Hero mit Logo, Claim, Startampel (rot → grün)
- ✅ Scroll-Animation: Auto fährt weavende Strecke mit Kurven & Banking
- ✅ Inhalte aus dem Konzept-PDF (Projekt, Rennen, A-Lizenz, Werkstatt, Sicherheit, Galerie, Partner)
- ✅ Kontaktformular (Frontend; Versand folgt in Phase 3)

## Nächste Schritte
- Phase 2: echtes Logo-File, Fotos, finale Texte, Unterseiten
- Phase 3: Backend (Kontaktformular-Versand), Impressum & Datenschutz
- Phase 4: Deployment (Vercel) + Domain `scuderia-bambini.de`
