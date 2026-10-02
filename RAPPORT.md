# Rapport - de fem värsta usability-problemen

Sajten "Vase Vista" såg fin ut men var i praktiken nästan oanvändbar - särskilt
för personer med funktionsnedsättningar. Nedan följer de fem allvarligaste
problemen jag hittade, varför de är allvarliga och hur jag löste dem.

---

## 1. Blockerande JavaScript frös hela sidan

**Problem.** `script.js` körde en busy-wait-loop som blockerade webbläsarens
huvudtråd i en hel sekund - **var tredje sekund** - och loggade totalt 110 000
rader till konsolen (100 000 direkt vid sidladdning). Hela sidan hackade:
scrollningen fastnade, klick registrerades inte och Total Blocking Time i
Lighthouse blev katastrofal. För en användare med skärmläsare eller som
navigerar långsamt var sidan i praktiken obrukbar under halva tiden.

**Åtgärd.** Jag skrev om `script.js` från grunden. All blockerande kod togs
bort och ersattes med två små, händelsestyrda funktioner: produktfiltret och
bekräftelsen för nyhetsbrevsformuläret. Huvudtråden är nu aldrig blockerad.

---

## 2. Sidan hölls gömd och bakåtknappen var fänglad

**Problem.** Skriptet tryckte in `history.pushState` vid varje sidladdning och
tog över `onpopstate` med `history.go(1)` - användaren kunde **inte trycka
bakåt** för att lämna sajten. Dessutom innehöll koden kod som väntade fem
sekunder innan `document.body` sattes till `display: block`. Det är en klassisk
"mönster för fientliga sidor": en navigationsfälla (WCAG 2.1.1 / 2.4.1 och
grundprincipen om användarens kontroll) plus en artificiell fördröjning som
gör att användaren tror att sajten är trasig.

**Åtgärd.** Både pushState-fällan och femsekundersfördröjningen togs bort.
Sidan renderas direkt och webbläsarens bakåtknapp fungerar som vanligt.

---

## 3. Interaktiva element som inte gick att använda med tangentbord

**Problem.** Sidans filterknappar var delvis `<div>` - de hade ingen roll, gick
inte att fokusera med Tab och kunde inte aktiveras med Enter/Space. Några
nav-länkar hade `tabindex="-1"` (borttagna från tabbordningen - osynliga för
tangentbordsanvändare), andra var `<p href="...">` - styckeelement med href,
vilket webbläsaren inte ens tolkar som länk. Skärmläsare fick ingen information
om vad som var klickbart.

**Åtgärd.** Alla filterknappar är nu riktiga `<button type="button">` med
`aria-pressed` (status markeras för skärmläsare), alla länkar är riktiga
`<a>` med giltiga mål, `tabindex="-1"` är borttaget. Jag testade hela
sidan med enbart Tab/Shift+Tab/Enter/Space.

---

## 4. Trasiga bilder utan alt-text

**Problem.** Fyra bilder saknade helt alt-text - en skärmläsare läser då upp
filnamnet eller ingenting alls, och om bilden inte laddas får användaren ingen
information om att något saknas. Värst var att **två av bild-URL:erna var
trasiga (404)**: produkterna "Terra Sculptural Vase" och "Nordic Minimalist
Vase" visade bara tomma rutor. Att länka bilder direkt från en extern tjänst
(hotlinking) är dessutom en sårbarhet - om tjänsten stänger eller ändrar URL
försvinner innehållet.

**Åtgärd.** Alla bilder fick beskrivande alt-texter som berättar vad bilden
föreställer, de två trasiga URL:erna ersattes med fungerande bildlänkar, och
bilderna laddas nu med `loading="lazy"`, `decoding="async"` samt explicita
`width`/`height` (mindre data, ingen layoutskakning/CLS).

---

## 5. Dålig kontrast, osynliga fokusmarkeringar och trasig struktur

**Problem.** Flera problem gjorde sajten svår för användare med nedsatt syn
eller kognitiva funktionsnedsättningar:

- Terracotta-färgen `#c5a491` mot den ljusa bakgrunden gav ca **2.3:1** i
  kontrast - WCAG AA kräver 4.5:1 för brödtext (WCAG 1.4.3).
- Fältet i formuläret tog bort fokusmarkeringen (`outline: none`) -
  tangentbordsanvändare ser aldrig var de befinner sig (WCAG 2.4.7).
- `<html>` saknade `lang`-attribut (skärmläsare väljer fel röstspråk),
  dokumentet hade två `<title>`, produkttitlar var `<h1>` med fel stängningstagg
  (`</h3>`) och sidan saknade logisk rubrikordning (WCAG 1.3.1).
- E-postfältet hade ingen etikett - bara platshållartext som försvinner så
  fort man börjar skriva (WCAG 3.3.2).

**Åtgärd.** Terracotta mörkades till `#7a5c4a` (5.1-5.7:1), fokusstilar
lades till globalt (`:focus-visible`), `lang="en"`, en `<title>`, korrekta
rubriker (`h1 -> h2 -> h3`), en riktig `<label>` för e-postfältet och en
skip-länk som första tabbstopp. Dessutom respekterar sajten nu
`prefers-reduced-motion`.

---

## Slutsatser

Det gemensamma för alla fem problemen: **ingen av dem syntes på ytan**. Sajten
"såg" bra ut i en skärmdump, men funktionsnedsättning, långsam uppkoppling,
tangentbord eller bara tur kunde avslöja dem. Störst effekt för min tid hade
att börja med verktygen (Lighthouse, sedan manuella test) och sedan
konsekvent arbeta igenom ett problem i taget i separata commits.
