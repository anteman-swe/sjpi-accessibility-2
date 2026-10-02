# Rapport – de fem värsta användbarhetsproblemen

Sajten "Vase Vista" såg snygg ut vid en första anblick, men var i praktiken riktigt svåranvänd – framför allt om man förlitade sig på hjälpmedel eller tangentbord. Här är de fem allvarligaste problemen jag hittade, varför de ställde till det och hur jag fixade dem.

---

## 1. Blockerande JavaScript som frös sidan

**Problem:** `script.js` körde en tung busy-wait-loop som låste webbläsarens huvudtråd i en hel sekund – **var tredje sekund**. Dessutom öste den ut hundratusentals rader i konsolen (varav hundratusen direkt vid start). Det här gjorde att hela sidan hackade: scrollen laggade, klick tog inte och värdet för Total Blocking Time i Lighthouse blev helt katastrofalt. Om man använde skärmläsare eller behövde lite mer tid på sig var sidan i princip obrukbar halva tiden.

**Åtgärd:** Jag rensade ur `script.js` helt och skrev om den från grunden. Borta är all blockerande kod, och i stället finns nu två enkla, händelsestyrda funktioner för produktfiltret och bekräftelsen på nyhetsbrevet. Huvudtråden rullar obehindrat nu.

---

## 2. Dold sida och en kapad bakåtknapp

**Problem:** Skriptet körde `history.pushState` vid varje sidladdning och tog över `onpopstate` med `history.go(1)`. Det gjorde att användaren helt enkelt **inte kunde trycka bakåt** för att lämna sidan – en navigationsfälla (som bryter mot WCAG och principen om att användaren ska ha kontrollen). Ovanpå det fanns det kod som väntade fem sekunder innan den satte `document.body` till `display: block`, vilket fick sidan att framstå som helt trasig i flera sekunder.

**Åtgärd:** Jag tog bort både pushState-fällan och fem-sekunders-fördröjningen. Sidan visas nu direkt när den laddats och bakåtknappen fungerar precis som man förväntar sig.

---

## 3. Element som inte gick att nå med tangentbordet

**Problem:** Flera interaktiva delar var felbyggda. Filterknapparna var delvis vanliga `<div>`-taggar – de saknade roll, gick inte att tabba till och reagerade inte på Enter eller Space. Vissa länkar i menyn hade `tabindex="-1"` (vilket gör dem osynliga för tangentbordsnavigering), och andra var uppbyggda som `<p href="...">`, vilket webbläsaren inte ens tolkar som länkar. För någon med skärmläsare fanns det ingen information om vad som faktiskt var klickbart.

**Åtgärd:** Jag gjorde om alla filterknappar till riktiga `<button type="button">` med `aria-pressed` för att visa aktiv status för skärmläsare. Alla länkar ändrades till riktiga `<a>`-taggar med fungerande mål, och `tabindex="-1"` städades bort. Efteråt testade jag hela flödet med bara Tab, Shift+Tab, Enter och Space.

---

## 4. Trasiga bildlänkar och avsaknad av alt-texter

**Problem:** Fyra bilder saknade alt-text helt, vilket gör att skärmläsare antingen läser upp filnamnet eller hoppar över dem helt. Dessutom var två bild-URL:er helt trasiga (404) för produkterna "Terra Sculptural Vase" och "Nordic Minimalist Vase", så där syntes bara tomma rutor. Att förlita sig på direktlänkade bilder från externa källor är också vanskligt – ändras länken externt så spricker bilden på sajten.

**Åtgärd:** Jag lade till beskrivande alt-texter på samtliga bilder och ersatte de två trasiga länkarna med fungerande bildkällor. Samtidigt lade jag till `loading="lazy"`, `decoding="async"` samt fasta mått (`width`/`height`) för att spara data och slippa att layouten hoppar runt när bilderna laddas.

---

## 5. Dålig kontrast, saknad fokusmarkering och trasig HTML

**Problem:** Det fanns flera små men viktiga brister som gjorde sajten svårläst och rörig:

* Den terracotta-färgade texten (`#c5a491`) mot den ljusa bakgrunden gav bara **2.3:1** i kontrast, bör vara minst 4.5:1 enligt WCAG.
* Inputfältet i formuläret nollställde fokusmarkeringen (`outline: none`), vilket gjorde att tangentbordsanvändare inte såg var markören var.
* `<html>`-taggen saknade `lang`-attribut (vilket gör att skärmläsare läser på fel språk), koden innehöll dubbla `<title>`-taggar, och produktrubrikerna var skrivna som `<h1>` men "stäng-taggen" var `</h3>`.
* E-postfältet saknade `<label>` och förlitade sig helt på placeholder-text som försvinner så fort man börjar skriva.

**Åtgärd:** Jag mörkade ned terracotta-tonen till `#7a5c4a` (vilket ger bra kontrast på 5.1–5.7:1, över 4.5:1 som WCAG vill ha), lade till tydliga fokusmarkeringar globalt via `:focus-visible`, satte `lang="en"`, städade bort dubbla titlar och fixade rubrikstrukturen (`h1 -> h2 -> h3`). E-postfältet fick en riktig `<label>` och jag lade även till en skip-länk som första tabbstopp. Slutligen lade jag till stöd för `prefers-reduced-motion`.

---

## Sammanfattning

Det tydligaste mönstret med de här fem problemen var att **inget av dem syntes vid en snabb anblick**. Sajten såg helt ok ut statiskt, men så fort man började klicka runt med tangentbord, med skärmläsare eller på en slö uppkoppling "kraschade" upplevelsen så man höll på att slita sitt hår. Det som sparade mest tid för mig var att kombinera automatiserade tester (Lighthouse) med att faktiskt klicka runt manuellt, och sedan beta av felen ett i taget i lugn och ro. Och så fort man började kika runt i själva koden blev ju en del av problemen ganska uppenbara, men inte alla.  
