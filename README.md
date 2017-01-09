# ProgrammeerprojectData

# Syrië: Wie deed wat, waar en wanneer?

"The Syrian Archive" is een archief waarin bewijsmteriaal (video's, foto's) van incidenten waarbij mensenrechten zijn geschonden in Syrië worden gedocumenteerd.
In dit archief wordt van een incident bijgehouden wat er is gebeurd, waar het is gebeurd, welk wapen is gebruikt, wie de daders zijn, hoeveel slachtoffers
er zijn gevallen en om welk type incident het gaat. Inmiddels zijn er 2284 geverifieerde incidenten opgenomen in het archief.

Voor mijn programmeerproject wil ik informatie uit dit archief gaan visualiseren. De database is terug te vinden op de site van "The Syrian Archive": https://syrianarchive.org/database/

Ideeën van visualisaties die ik heb:

1. Calendar view (voorbeeld: http://bl.ocks.org/mbostock/4063318) en line chart

Door middel van de calendar view wil ik per dag/week/maand van het jaar aangeven hoeveel indicenten er hebben plaatsgevonden om zo de ontwikkeling
van het aantal incidenten over tijd te weergeven. On hover wil ik per type indicent het aantal incidenten weergeven van die dag/week/maand. Om de
ontwikkeling ook nog op een andere manier weer te geven wil ik nog een linechart maken van dezelfde data. On hover wordt opnieuw per type indicent
het aantal incidenten weergegeven. Voor de Calendar view en linechart heb ik van ieder incident de datum nodig en het type incident.

2. Interactieve barchart gekoppeld met een map (map van Syrië: http://www.codewritingcow.com/d3-js/maps/middle-east/syria/).

Voor ieder incident wil ik met behulp van een map laten zien waar het incident heeft plaatsgevonden. On hover wil ik laten zien wat het type incident
is, het gebruikte wapen, omschrijving van het incident en de datum van het incident. Deze map wil ik koppelen met een barchart, die het aantal incidenten
per type incident laat zien. On hover wil ik het exacte aantal incidenten laten zien. De link is dat wanneer je hovert over de barchart dat de bijbehorende
incidenten van dat type incident oplichten op de map. Voor de interactieve barchart gekoppeld met een map heb ik van ieder indicent de datum, latitude,
longitude, type incident, gebruikte wapen en omschrijving van het incident nodig.
