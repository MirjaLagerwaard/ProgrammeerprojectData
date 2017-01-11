# Design "The Syrian Archive"

**Visualistion of "The Syrian Archive"**

Alle visualisaties zullen in één dashboard/pagina worden weergegeven. Hoe de indeling van de visualisaties precies zal zijn weet ik nog niet precies.

*Algemene Time slider*

Bovenaan mijn dashboard komt een timeslider per jaartal wanneer de incidenten hebben plaatsgevonden. Deze timeslider zal gelinkt worden aan alle drie de visualisaties.

*Calendar view*

Voorbeeld: http://bl.ocks.org/mbostock/4063318

Data: de datum van het incident. Vervolgens moet het aantal incidenten per dag bij elkaar worden opgeteld.

Kleur: hoe meer incidenten op één dag, hoe donkerder het corresponderende vakje wordt. Geen indicenten: vakje is wit.

Interactie: on hover wordt de datum en het exacte aantal incidenten van die dag weergeven door middel van een tooltip. Naast of boven de calendar komen buttons waarmee je het type incident kunt filteren.   

Technisch: voorbeeldcode voor de calendar view heb ik gevonden op internet. Op dit moment zou ik geen problemen kunnen bedenken met betrekking tot het programmeren van deze visualisatie, behalve dat ik deze visualisatie nog niet eerder heb geprogrammeerd.

*Map*

Data: datum van het incident, type van het incident, gebruikte wapen en beschrijving.

Kleur: via Colorbrewer zal ik nog een kleurenschema uitkiezen.

Interactie: on hover wordt de datum, type van het incident, gebruikte wapen en beschrijving van het incident weergegeven door middel van een tooltip.

Technisch: de map zal gelinkt worden met de calendar view. Als je on hover op een stip staat wat een enkel incident representeert, dan zal het bijbehorende vakje in de calendar view veranderen van kleur, zodat je ook in de calendar view kunt zien wanneer het incident heeft plaatsgevonden. Er zijn een aantal problemen waar ik tegenaan zal lopen met mijn map. Allereerst zijn niet van ieder incident de coördinaten beschikbaar, waardoor ik problemen zou kunnen krijgen met het plotten van de stip. Het is wel zo dat bij ieder incident de stad en wijk staat aangegeven. Wat daarnaast een probleem kan zijn is dat ik geen goede kaart van Syrië kan vinden waar de coördinaten juist in staan geprogrammeerd. Mocht dit het geval zijn dan kan ik altijd nog de World map gebruiken en inzoomen op Syrië.

*Barchart*

Data: het type incident. Vervolgens moet per type incident bij elkaar opgeteld worden hoeveel incidenten er hebben plaatsgevonden.

Color: via Colorbrewer zal ik nog een kleurenschema uitkiezen.

Interactie: on hover zal in de barchart met behulp van een tooltip de exacte waarde van de bar weergeven worden en de bar zelf zal van kleur veranderen.

Technisch: de barchart zal gelinkt worden met de map. Als je bijvoorbeeld op de bar van hostage-taking gaat staan dan zullen de corresponderende stippen in de map veranderen van kleur, zodat je kan zien waar deze incidenten hebben plaatsgevonden. Bij het maken van de barchart verwacht ik vooralsnog geen problemen. 

![Schets](/Images/Schets_technical.jpg)
