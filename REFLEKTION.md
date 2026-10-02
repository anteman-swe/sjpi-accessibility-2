# Reflektion

Uppgiften var roligare och knepigare än jag trodde. Sajten *såg* hel ut, så
första intrycket var "vad finns egentligen att fixa?" - tills jag körde
Lighthouse och skummade koden på riktigt. Då syntes att problemen låg under
ytan: trasiga länkar, bilder som inte laddade, en skriptfil som aktivt
saboterade sajten och färger som var för ljusa.

**Vad var svårt?**

- **Att hitta de riktigt dolda felen.** Vissa buggar ropar åt en (dubbla
  `<title>`), men andra var lömska: en radbrytning mitt i en CSS-klass
  (`pro
duct-image`), en radbrytning inne i bild-URL:en till Google Fonts
  och en bild-URL som såg perfekt ut men returnerade 404. Jag lärde mig att
  verktygen bara hittar hälften - man måste faktiskt läsa koden.
- **Att resonera kring kontrast.** Att en färg är "snygg" är inte samma sak
  som att den är läsbar. Jag satt med kontrastberäkning (4.5:1) och testade
  olika terracottanyanser innan jag hittade en som både behöll designen och
  klarade WCAG AA.
- **Att inte förstöra designen medan man fixar funktionen.** Alla länkar i
  footern pekade på `404.html` eller `#`. Jag valde att skapa riktiga
  undersidor (Privacy Policy, Terms of Service) i stället för att bara ta
  bort länkarna - det var mer jobb, men rätt sak för både användare och SEO.

**Vad lärde jag mig?**

- Att tillgänglighet till största delen är **semantik**: rätt element
  (`<button>` i stället för klickbar `<div>`, `<a>` i stället för `<p>`)
  ger tangentbord, skärmläsare och sökmotorer gratis funktionalitet.
- Att **Lighthouse inte räcker**. Tre av de fem värsta problemen (trasiga
  bild-URL:er, back-knappsfällan, blockerande intervall) påverkar främst den
  verkliga upplevelsen - man måste testa som en användare: med tangentbordet,
  med nätverk strypt, i mobilvy.
- Att **preformance och tillgänglighet hänger ihop**: den blockerande
  JavaScripten gjorde sajten otillgänglig för *alla*, inte bara för de med
  funktionsnedsättning. Grönt i Lighthouse blev en konsekvens av att jag
  gjorde sajten snabb, inte tvärtom.
- Konkret om WCAG: rubrikordning, alt-texter, kontrastkrav (1.4.3),
  synlig fokus (2.4.7) och `prefers-reduced-motion` var nya för mig i
  praktiken.

Om jag gjorde om uppgiften skulle jag börja med att köra Lighthouse *och*
ett manuellt tangentbordstest innan jag öppnade koden, och sedan fixa ett
problem per commit - det flödet hittade jag fram till halvvägs och det
gjorde arbetet mycket tydligare.
