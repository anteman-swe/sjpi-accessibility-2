# sjpi-accessibility-2 - Save Our Site

Skoluppgift: en snygg webbsajt ("Vase Vista") med många dolda problem -
trasiga länkar, blockerande JavaScript, dålig kontrast, otillgängliga
interaktiva element m.m. Uppgiften var att hitta och åtgärda alla problem,
få grönt i **alla** Lighthouse-kategorier och publicera sajten.

**Publicerad sajt (GitHub Pages):**
<https://anteman-swe.github.io/sjpi-accessibility-2/>

## Dokument

- [RAPPORT.md](RAPPORT.md) - de fem värsta usability-problemen och hur de löstes
- [REFLEKTION.md](REFLEKTION.md) - reflektion över uppgiften

## Sammanfattning av åtgärderna

**index.html**
- `<html lang="en">` saknades (var bortkommenterad), dubbelt `<title>` -> ett
- Trasiga nav-länkar till `404.html` -> riktiga sektioner; dubbla `id="1"` och `tabindex="-1"` borttagna
- Tomt extra `<h1>` i heron borttaget; produkttitlar `<h1>`/`</h3>` -> korrekta `<h3>`
- `<div>` som knapp i filtret -> riktiga `<button>` med `aria-pressed`
- `<p href="...">` i footern -> riktiga `<a>`; `href="#"` och 404-länkar -> giltiga mål
- Alt-texter på alla bilder; två trasiga bild-URL:er (404) ersatta med fungerande
- Bilder: `loading="lazy"`, `width`/`height` (mot CLS), mindre storlekar
- Nyhetsbrevsfältet fick en `<label>`, `name`, `autocomplete` och status-yta
- Blockquote i stället för `<a>` utan href; skip-länk till huvudinnehållet

**styles.css**
- Terracotta-färgen mörkad från `#c5a491` till `#7a5c4a` (kontrast ~2.3:1 -> 5.1-5.7:1, WCAG AA)
- Uttryckliga `outline: none` ersatta med tydliga `:focus-visible`-stilar
- Footer-texter ljusade från 50 % till 65-70 % vitt (kontrast)
- `prefers-reduced-motion`, skip-länk, `.sr-only`, `scroll-margin-top` förankade sektioner

**script.js**
- Blockerande kod helt borttagen: busy-wait 1 s var 3:e sekund, 110 000 `console.log`,
  bakåtknappsfälla (`history.pushState`/`onpopstate`), 5-sekundersfördröjning av body
- Ny, icke-blockerande logik: produktfilter + formulärbekräftelse

**Nya filer**
- `privacy.html` / `terms.html` (ersätter länkar till saknad 404-sida)
- `.github/workflows/deploy.yml` (publicerar sajten till GitHub Pages vid push till main)

## Testa själv

1. Öppna sajten i Chrome och kör **Lighthouse** (DevTools -> Lighthouse -> alla kategorier).
2. Testa tangentbordsnavigering: Tab syns tydligt, skip-länk kommer först, filtret går att
   använda med Enter/Space.
3. Kör en online-analys, t.ex. <https://www.accessibilitychecker.org/> på den publicerade URL:en.
