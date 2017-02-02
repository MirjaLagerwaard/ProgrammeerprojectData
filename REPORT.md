#REPORT

##DESCRIPTION OF VISUALISATION

The Syrian Archive is an initiative launched by a collective of human rights activists dedicated to preserving open source documentation relating to human rights violations and other crimes committed by all sides during the conflict in Syria. Their goal is to preserve the most valuable material to ensure it is organized and accessible for use by current researchers, journalists and others with an interest in the conflict as well as to facilitate the work of future historians and investigators involved in transitional justice and accountability efforts.

Information about the incidents which are included in the The Syrian Archive is visualised. The goal of the visualisation is to increase awareness of the scale of the human rights violations in Syria and to obtain more insight into the background of the incidents. Each visualisation has been carefully picked to highlight a different aspect of the incidents background information:

* When

The **Calendar Heatmap** can be utilised to see the amount of incidents over time. How many incidents took place on one day? How did the amount of incidents develop over time?

* Where

The **Map of Syria** gives more insight into where the incidents took place. This visualisation is also useful when more information about only one incident is demanded. When did that particular incident take place? What is the type of violation? What happened?

* What

The **Barchart** displays the amount of incidents per type of violation. What is the most common type of violation? Does the amount of incidents per type of violation change over the years?

![Schets](dashboard/images/printscreenvisualisation.png)

##TECHNICAL DESIGN

###High level overview
My visualisation is styled in the webbrowser **Firefox** zoomed at **60%**.

* Timeline

Click on the buttons of the timeline to explore the data over different years.

* Calendar Heatmap

The darkness of a day indicates the amount of incidents that occured on that particular day. Hover over the days to see the exact amount of incidents on that day. The Map of Syria will now only show the incidents that took place on that specific day.

* Map

Click on a circle on the Map of Syria to see more details about a specific incident. Click on the zoom buttons to explore more details about incidents which took place in a specific city. Hover over the circles on the Map of Syria to see in the Calendar Heatmap on which day the incident took place. The incidents where no latitude and/or longitude were available are not shown on the Map of Syria:

2016: 894 incidents not shown | 2015: 29 incidents not shown | 2014: 13 incidents not shown | 2013: 2 incidents not shown | 2012: 0 incidents not shown

* Barchart and Table

Hover over the bars of the barchart or hover over the rows of the table to see the exact amount of incidents per type of violation. Read in the table what the abbreviations on the x-axis of the barchart means.

###Detail

* calendar.js

* map.js

* barchart.js

Second, go into detail, and describe the modules/classes and how they relate.

##CHALLENGES

Scrapen van data (meerdere pagina's, opnieuw omdat ik lat en long ook nodig had, opnieuw ivm bug)
timeslider werden timebuttons
Map: stippen die geen latitude en/of longitude hebben + stippen met exact dezelfde coordinaten,  Ik ben erachter gekomen dat er nog een bug in mijn map zit... Ze hebben in de database van meerdere notaties gebruik gemaakt om coördinaten aan te geven. Ik heb dit weekend dus tijd besteed om mijn python script (makedatamap.py) aan te passen, zodat deze coördinaten omgezet worden naar de juiste notatie. Daarbij is deze bug opgelost.
Problemen gehad met de tooltip omdat google kut is.
Door de stippen onzichtbaar te maken kwam ik er wel achter dat de stippen waarvan geen coordinaten beschikbaar zijn allemaal in oktober/november zitten. Als je daar hovert over een dag waarbij 40+ incidenten zijn plaatsgevonden dan verdwijnen alle stippen op de kaart. Ik ga dit duidelijk vermelden in de tekst die bij mijn visualisatie hoort hoeveel stippen er per jaar niet worden weergeven.
Barchart en table: als je op de tabel gaat staan verscheen de tooltip rechts bovenin de hoek

Ik de tooltip van de calendar view moeten veranderen. Het was me gelukt om de tooltip te laten verschijnen bij de calendar wanneer je over een stip
van de map hovert, maar deze kwam niet op de goede locatie van het scherm omdat de tooltip keek naar de locatie van mijn muis. Ik heb veranderd dat de tooltip kijkt naar de locatie van het vakje wat overeenkomt met de dag. Nu is het dus gelukt om mijn calendar view te linken met de map (alle stippen die niet overeenkomende datum hebben verdwijnen), plus de map te linken aan de calendar view (de border van de corresponderende dag wordt dikker plus de tooltip van de calendar verschijnt).

During the development of my visualisation, I have met some challenges:

Bug in mijn map: als je met de + en - knoppen inzoomt dan kan je niet meer slepen met het handje. Ook gebeuren er dan gekke dingen met mijn kaart.

Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

##DECISIONS

Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

##IN AN IDEAL WORLD...
Daarnaast is het jammer dat zodra je weer van de calendar af hovert alle stippen weer verschijnen. Je kunt nu dus niet de tooltip bekijken van een incident op een specifieke datum. Dit kun je wel doen door niet een on hover te maken maar een on click. Het probleem is dan echter dat de stippen die ik onzichtbaar maak niet verdwenen zijn van de kaart, dus als je dan op een stip wilt klikken dan kun je ook (per ongeluk) op een onzichtbare stip klikken en dan krijg je de verkeerde tooltip te zien. Je kunt de stippen die moeten verdwijnen ook daadwerkelijk van de kaart afhalen, maar dit is zo'n gedoe dat ik hier helaas geen tijd meer voor heb. Dit zal ik meenemen voor mijn verslag voor dingen die ik nog had willen doen.

In plaats van in de tekst aan te geven hoeveel stippen per jaar niet worden weergeven op de kaart is het mooi als je dit in de tooltip van de calendar per dag kunt laten zien. Dit is inderdaad een mooi idee, maar hier ga ik geen tijd meer voor hebben. Dit zal ik meenemen voor in mijn verslag voor dingen die ik nog had willen doen.

Ik zou het vet vinden om de functionaliteit van de barchart nog af kunnen krijgen (dat als je op een bar klikt van een bepaald incident dat je in de kaart en in de calendar alleen nog de incidenten van dat type incident ziet), maar ik weet niet of dit realistisch is. Ik kreeg als tip eerst mijn pagina af te maken qua tekst en opmaak, het verslag te schrijven en als ik dan nog tijd over heb kan ik altijd nog naar die filter kijken.

Dingen die ik graag had willen doen:
* Vaste menubar
* Filteren van barchart
