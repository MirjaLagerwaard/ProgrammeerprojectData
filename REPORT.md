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

####FOLDERS
* dashboard

In this folder you can find al the python script, data, javascript files, css files and html files for the visualisation.

* dashboard > data

In this folder you can find all the .json and .csv files which contains the data of the calendar heatmap, map of Syria and the barchart.  

* dashboard > images

In this folder you can find all the images which are used for the website / design document / report.

* dashboard > pythonscripts

In this folder you can find all the python scripts which are used to scrape the data of the website of the syrian archive and to convert the data in the correct format.

####FILES
* calendar.js

In this file you can find all the javascript code for the calendar heatmap. The code for the link between the calendar heatmap and the map of Syria can also be found in this file.

* map.js

In this file you can find all the javascript code for the calendar heatmap. The code for the link between the calendar heatmap and the map of Syria can also be found in this file.

* barchart.js




##CHALLENGES

* Scraping the data

1. I had some difficulties with scraping the webpage of the Syrian Archive. I had to scrape multiple pages which I never did before.
2. Later in the process I found out that I also had to scrape the latitude and longitude of each incident to place circles on the map of Syria. I had to change my Python script and scrape the website again.
3. When I placed the circles on the map, I found out that something went wrong with scraping the website. Some incidents were scraped twice. I did not find a bug in my Python script, but when I runned the scraper.py script again the problem was solved.

* Timeslider

I had difficulties with implementing a timeslider, which made me decide to make timebuttons instead. This was a lot easier to implement and the functionality is the same.

* Calendar Heatmap

During the process of linking the map of Syria with the calendar heatmap I found out that I had to change the way I implemented the tooltip of my calendar heatmap. While hovering over the cirles on the map, the tooltip of the calendar heatmap appeared but on the wrong location of the screen. The location of tooltip I used was relative to the location of the cursor, but I had to change this to the location of the corresponding rectangle in the calendar heatmap. I used an outdatet version of d3tip.js and after updating this to the newest version the bug was solved.

* Map

1. In the Syrian Archive are incidents included where the latitude and/or longitude are not available. This is a problem for the map of Syria, because you need the coordinates of an incident to place a circle on the map of Syria. For this reason I was forced to not display these incidents on the map.
2. Another problem with the map of Syria was that there were incidents with exactly the same coordinates, which will result into two circles on the same location in the map. When you want to hover or click on these incidents, you will only be able to reached the circle which is on top of the other. To solve this problem I add a random generated number to the pixel values where the circles are placed. This random number is not greater than the diameter of the circle itself, so the deviation is minimal. This solution is called jitter/jittering.
3. I found out that the Syrian Archive uses multiple formats to display the coordinates of an incident. I had to make an python script which transforms all these multiple formats to the format which was needed to place the circles on the map.
4. Two days before the deadline one of my group members found another bug in my map. After using + or - buttons you could not drag the map anymore. This bug was caused due to the link between the map of Syria and the calendar heatmap. After linking the tooltip to the correct HTML element the bug was solved.

* Barchart and Table

After I linked the barchart with the table I found out that when hovering over a table row of a type of violation where the data value was 0, the tooltip of the barchart occured in the left upper corner. When I gave the bars in the barchart of the corresponding type of violation a size of 1px, this bug was solved.

##DECISIONS

* Color scheme

* Calendar Heatmap

* Map

* Barchart and Table


Door de stippen onzichtbaar te maken kwam ik er wel achter dat de stippen waarvan geen coordinaten beschikbaar zijn allemaal in oktober/november zitten. Als je daar hovert over een dag waarbij 40+ incidenten zijn plaatsgevonden dan verdwijnen alle stippen op de kaart. Ik ga dit duidelijk vermelden in de tekst die bij mijn visualisatie hoort hoeveel stippen er per jaar niet worden weergeven.


Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

##IN AN IDEAL WORLD...
When I had more time to make this visualisation, I would like to do the following things:

1. I would like to use bootstrap for the page layout and create a fixed menu bar.

2. I would like to change the on hover link between the calendar heatmap and map of Syria to an on click link. So when you click on a day in the calendar heatmap only the corresponding circles are shown in the map. This way you can hover to the map to see details about the incidents without the other circles appear again. This was harder to implement than you think, because when you change the opacity of the circles to 0.0 the circles will still be there. When you hover over the map it was possible to click on a circle which was transparent. So you have to remove the circle from the map to make this happen and I did not have enough time to fix this.

3. I would like to link the barchart with the map and calendar heatmap. I wanted to filter the data of the map and calendar view when you clicked on a bar in the barchart, so only the data of one type of violation would be shown.

4. In the current visualisation I inform the user in the walkthrough how many incidents are not shown in the map of Syria. I would like to implement this in the tooltip of the calendar heatmap, so you can see per day how many incidents are not shown.
