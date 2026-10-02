# Reflektion

Uppgiften var klurigare än jag först trodde. Vid första anblicken såg sajten helt ok ut, så min första tanke var: 'vad är det egentligen som behöver fixas?'. Men när jag körde Lighthouse och började titta närmare på koden upptäckte jag att problemen låg under ytan – allt från trasiga länkar och bilder som saknades till en JS-fil som låste hela sajten och färger med alldeles för dålig kontrast.

**Vad var svårt?**

* **Att upptäcka de lömska felen.** Vissa saker var ju uppenbara direkt (som dubbla `<title>`-taggar), men andra var betydligt svårare att se. Det kunde vara en konstig radbrytning mitt i en CSS-klass (`pro` / `duct-image`), ett radbryt i sökvägen till Google Fonts eller en bildlänk som såg helt rätt ut men ändå gav 404. Det var en bra lärdom i att verktygen inte hittar allt – man måste sätta sig och faktiskt läsa koden rad för rad.
* **Att balansera design och kontrast.** Bara för att en färg ser snygg ut betyder det inte att den fungerar att läsa. Jag fick sitta en hel del med kontrastverktyget för att nå upp till 4.5:1, och testade mig fram mellan olika terracottanyanser innan jag hittade en ton som både behöll den tänkta designen och klarade WCAG AA.
* **Att lösa problemen utan att ta genvägar.** Alla länkar i footern var bara attrapplänkar som gick till `404.html` eller `#`. I stället för att bara plocka bort dem valde jag att skapa riktiga undersidor (som Privacy Policy och Terms of Service). Det tog lite extra tid, men det kändes bättre och mer korrekt för helheten.

**Vad lärde jag mig?**

* **Semantikens betydelse för tillgänglighet.** Genom att använda rätt element från början (som en riktig `<button>` i stället för en klickbar `<div>`, eller `<a>` i stället för `<p>`) får man stöd för tangentbordsnavigering, skärmläsare och sökmotorer nästan helt gratis.
* **Att Lighthouse bara ger en del av bilden.** Flera av de mest störande problemen – som bildlänkar som var trasiga, fällor i historiken med bakåt-knappen och skript som låste sidan – märks framför allt när man faktiskt använder sajten. Man måste helt enkelt klicka runt själv, testa med tangentbordet, strypa nätverkshastigheten och simulera en mobiltelefon i 'Inspektera'.
* **Prestanda och tillgänglighet "lirar" hand i hand.** Den blockerande JavaScripten gjorde ju att sidan upplevdes som helt seg eller trasig för alla, inte bara för de med hjälpmedel. Att få gröna siffror i Lighthouse blev mer en trevlig bieffekt av att sidan faktiskt blev snabb och användbar.
* **Hands-on med WCAG.** Jag fick testa på mycket i praktiken som jag tidigare bara läst om, men knappt funderat över: korrekt rubrikstruktur, bra alt-texter, kontrastkraven, synlig markering vid fokus och att ta hänsyn till `prefers-reduced-motion`.

Om jag skulle göra om uppgiften idag hade jag börjat med att köra Lighthouse *och* klicka runt manuellt med enbart tangentbordet innan jag ens rörde koden. Jag hade också varit noggrannare med att göra en commit per fix från första början – det arbetssättet kom jag ihåg att göra efter jag var halvvägs och det skulle ha gjort hela processen mycket lättare att hålla koll på.
