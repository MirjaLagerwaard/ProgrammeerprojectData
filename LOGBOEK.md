*Maandag 9 januari*

Proposal geschreven

*Dinsdag 10 januari*

Proposal afgemaakt, technisch rapport geschreven en een schets gemaakt van mijn dashboard.

*Woensdag 11 januari*

Proposal gepitcht aan mijn vergadergroepje. Ze hadden niet direct tips. Was maatschappelijk relevant en ze zagen het goed voor zich.

Begonnen met het scrapen van de data van de site. Hier de hele dag mee bezig geweest. Ik moet meerdere webpagina's scrapen waarvan ik nog even moest uitvogelen hoe dat precies werkte. Uiteindelijk toch gelukt en een begin kunnen maken aan mijn prototype. Ik had alvast een menubalk gemaakt met de jaartallen, zodat je kunt kiezen van welk jaar je de data wilt zien. Ook had ik alvast de barchart gemaakt, inclusief interactie (on hover veranderd de bar van kleur en de tooltip verschijnt met de exacte waarde van de bar).

*Donderdag 12 januari*

Het begin van mijn prototype laten zien aan mijn vergadergroepje. Ze vonden het er al goed uitzien. Ik kreeg als tip dat ik de type incidenten op de x-as van de barchart moest afkorten, aangezien dit hele grote titels zijn. Dan kan ik naast de barchart een legenda maken waar je kunt zien wat de afkorting betekent. Ook tipte een groepsgenoot dat ik moest beginnen met een logboek bij te houden.

Vandaag heb ik de lay-out van mijn pagina verbetert. Daarnaast heb ik ervoor gezorgd dat de worldmap ingezoomd staat op Syrië en ik heb de calendar view neergezet op mijn pagina waar ik deze wil hebben. Dit is verder allemaal nog niet gelinkt aan de data. Mijn prototype is dus klaar.

*Vrijdag 13 januari*

Vandaag heb ik mijn prototype gepresenteerd aan mijn presentatiegroep. Het onderwerp en ideeën van visualisaties waren goed. Als tip kreeg ik nog mee dat ik voor de kaart van Syrië ook een google API in zo kunnen laden, zodat je ook zou kunnen inzoomen op de gebieden waar incidenten plaatsgevonden. Daarnaast is een voordeel dat de steden en gebieden dan ook al in de kaart getekent zijn. Ik ga volgende week kijken hoe dit werkt en besluiten of ik dit daadwerkelijk zal doen.

Verder heb ik vandaag de tabel gemaakt waarin de afkortingen van de incidenten weergegeven staan. Als ik tijd over heb dan wil ik deze tabel linken aan de barchart, dat als je op de bar staat van een corresponderende type incident deze oplicht in de tabel, zodat je niet zelf hoeft te zoeken in de tabel naar de afkorting.

Ook heb ik de data voorbereid voor mijn barchart en ik heb mijn menubalk aangepast. Je kunt nu via een knop in het menu naar de originele site van the Syrian Archive.

*Maandag 16 januari*

Vandaag heb ik met mijn groepje mijn voortgang besproken en de planning voor deze week. Aan het einde van de week wil ik een timeslider hebben die gekoppeld is aan de calendar view en de barchart. Daarnaast wil ik de google API ingeladen hebben en de kaart ingezoomd hebben staan op Syrië. Als er tijd over is dan wil ik ook al stippen op de kaart hebben staan die de locatie van de incidenten aangeven.

Vandaag is het me gelukt om de google API in te laten en deze in te zoomen op Syrië. Daarnaast heb ik de indeling van mijn pagina veranderd. Ook heb ik opnieuw de data moeten scrapen, want ik kwam erachter dat ik de latitude en longitude van een incident nodig heb om de stippen op de kaart te plaatsen, dus ik heb mijn code aangepast. Daarnaast ben ik begonnen om de data voor mijn barchart per jaar te selecteren uit de json file, zodat deze apart kunnen worden weergegeven.

*Dinsdag-donderdag 17-19 januari*

Ik heb besloten geen timeslider meer te maken, omdat ik enorme problemen had om dit te implementeren. Ik ga dit oplossen door timebuttons te maken en daar een streepje tussen te trekken, zodat het als nog op een tijdlijn lijkt. Deze buttons wil ik dan koppelen met de data, zodat de user kan kiezen van welk jaar hij de data kan zien.

Verder heb ik deze dagen gedaan:

- Scriptje geschreven om vanuit de gigantische database de json files te maken voor mijn barchart

- Time buttons gekoppeld aan de barchart

- Table gekoppeld aan de barchart (dubbel gelinkt, dus als je op de tabel gaat staan dan ligt de bijbehorende bar op en andersom)

- Barchart en table opmaak veranderd

*Donderdag 19 januari*

In de avond ben ik bezig gegaan om stippen te plaatsen op de kaart van Syrië die de locatie weergeven van het incident. Hiervoor heb ik een scriptje geschreven die alle benodigde informatie haalt uit syrianarchive.csv en deze als jsonfile opslaat.

Toen het me lukte om de stippen te weergeven op de kaart kwam ik erachter dat er iets mis gegaan is met het scrapen van de website, want er waren enkele incidenten die meerdere malen in het csv bestand voorkwamen. Ik ben vervolgens bijna de hele avond bezig geweest om deze bug in scraper.py op te lossen. Het is heel gek, want ik ben er uiteindelijk niet precies achter gekomen wat er nou mis ging, maar toen ik de site nogmaals had gescraped toen was het wel goed gelukt. Vervolgens heb ik dus de json files die ik in mijn barchart in had geladen en de json files die ik in mijn map had ingeladen opnieuw moeten runnen/maken, omdat deze hiervoor niet klopten. Toen ik daarmee klaar was heb ik nog de map kunnen koppelen met de timebuttons.

Er zijn nog een aantal bugs die ik moet oplossen:

* Niet van alle incidenten zijn de coordinaten beschikbaar, waardoor deze stippen nu linksbovenin de hoek worden geplaatst. Wel zijn van deze incidenten de locatie/stad. Ik wil van deze incidenten de coordinaten opzoeken van de bijbehorende stad en deze toekennen. Een probleem is echter wel dat ze niet allemaal dezelfde coordinaten kunnen krijgen, omdat de stippen dan allemaal over elkaar komen te liggen. Misschien moet ik ze allemaal net een ander coordinaat geven die wel nog behoort tot de stad.

* Wanneer je op de tabel op een type incident gaat staan waar de data 0 is, dan verschijnt de tooltip links bovenin de hoek. Dit komt omdat er geen bar getekend is, waardoor de code niet weet waar het gepositioneerd moet worden. Ik ga kijken of het lukt om deze tooltip toch op de goede plek te krijgen. Lukt dit niet dan wil ik ervoor zorgen dat hij geen tooltip laat zien als de data 0 is.

*Vrijdag 20 januari*

Mijn alfa versie gepresenteerd aan de werkgroep. Tips die ik heb gekregen:

* Buttons maken dat als je daarop klikt dat de kaart automatisch inzoomt op Aleppo/Homs/Damascus, omdat daar de meeste incidenten hebben plaatsgevonden

* De stippen die geen exacte coördinaten hebben een andere kleur geven en duidelijk aangeven dat dit dus niet de exacte positie is

*Zaterdag en zondag 21-22 januari*

* Zoom buttons gemaakt, en een zoom out button

* Ik ben erachter gekomen dat er nog een bug in mijn map zit... Ze hebben in de database van meerdere notaties gebruik gemaakt om coördinaten aan te geven. Ik heb dit weekend dus tijd besteed om mijn python script (makedatamap.py) aan te passen, zodat deze coördinaten omgezet worden naar de juiste notatie. Daarbij is deze bug opgelost.

* Ik heb daarnaast de bug in de barchart opgelost. Als je nu hovert over type incidenten die 0 keer voorkomen verschijnt de tooltip op de juiste plek. Ik heb dit opgelost door een bar te laten tekenen van 1px groot, waardoor de code weet waar de tooltip moet verschijnen.

* x-as label toegevoegd aan de barchart

* Met testdata heb ik voor elkaar gekregen dat ik de hokjes van de calendarview op de juiste manier kan inkleuren

*Maandag 23 januari*

Tijdens de stand-up meeting hebben we de planning voor deze week besproken. Mijn planning:
Maandag: python script schrijven die de data van de calendar view maakt en deze inladen. Calendar view koppelen met de time buttons.
Dinsdag: De map en calendar view afmaken en daarbij de overige bugs oplossen die nog aanwezig zijn in de map en calendar.
Woensdag en donderdag: alle visualisaties aan elkaar linken en code opschonen.

 
