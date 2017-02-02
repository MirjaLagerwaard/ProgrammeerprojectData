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

Hover over the bars of the Barchart or hover over the rows of the Table to see the exact amount of incidents per type of violation. Read in the Table what the abbreviations on the x-axis of the Barchart means.

###Detail

####FOLDERS
* dashboard

In this folder you can find al the python script, data, javascript files, css files and html files for the visualisation.

* dashboard > data

In this folder you can find all the .json and .csv files which contain the data of the Calendar Heatmap, Map of Syria and the Barchart.  

* dashboard > images

In this folder you can find all the images which are used for the website / design document / report.

* dashboard > pythonscripts

In this folder you can find all the python scripts which are used to scrape the data of the website of the syrian archive and to convert the data in the correct format.

####FILES
* calendar.js

In this file you can find all the javascript code for the Calendar Heatmap. The code for the link between the Calendar Heatmap and the Map of Syria can also be found in this file.

* map.js

In this file you can find all the javascript code for the Map of Syria. The code for the link between the Map of Syria and the Calendar Heatmap can also be found in this file.

* barchart.js

In this file you can find all the javascript code for the Barchart. The code for the link between the Barchart and the Table can also be found in this file.



##CHALLENGES

* Scraping the data

1. I had some difficulties with scraping the webpage of the Syrian Archive. I had to scrape multiple pages which I had never did before.
2. Later in the process I found out that I also had to scrape the latitude and longitude of each incident to be able to place circles on the Map of Syria. Therefore, I had to change my Python script and scrape the website again.
3. When I placed the circles on the map, I found out that something went wrong with scraping the website. Some incidents were scraped twice. I did not find a bug in my Python script, but when I runned the scraper.py script again the problem was solved.

* Timeslider

I had difficulties with implementing a timeslider, which made me decide to make timebuttons instead. This was a lot easier to implement and the functionality is the same.

* Calendar Heatmap

During the process of linking the Map of Syria with the Calendar Heatmap I found out that I had to change the way I implemented the tooltip of my Calendar Heatmap. While hovering over the cirles on the map, the tooltip of the Calendar Heatmap appeared, but on the wrong location of the screen. The location of tooltip I used was relative to the location of the cursor, but I had to change this to the location of the corresponding rectangle in the Calendar Heatmap. I used an outdated version of d3tip.js and after updating this to the newest version the bug was solved.

* Map

1. In the Syrian Archive are incidents included where the latitude and/or longitude are not available. This is a problem for the Map of Syria, because you need the coordinates of an incident to place a circle on the Map of Syria. For this reason I was forced to not display these incidents on the map.
2. Another problem with the Map of Syria was that there were incidents with exactly the same coordinates. This will result into two circles on the same location in the map. When you want to hover or click on these incidents, you will only be able to hover or click the circle which is on top. To solve this problem I add a random generated number to the pixel values where the circles are placed. This random number is not greater than the diameter of the circle itself, so the deviation is minimal. This solution is called jitter.
3. I found out that the Syrian Archive uses multiple formats to display the coordinates of an incident. I had to make an python script which transforms all these multiple formats to the format which was needed to place the circles on the map.
4. Two days before the deadline one of my group members found another bug in my map. After using + or - zoombuttons you could not drag the map anymore. This bug was caused due to the link between the Map of Syria and the Calendar Heatmap. After linking the tooltip to the correct HTML element the bug was solved.

* Barchart and Table

After I linked the Barchart with the Table I found out that when hovering over a Table row of a type of violation where the data value was 0, the tooltip of the Barchart occured in the left upper corner. When I gave the bars in the Barchart of the corresponding type of violation a size of 1px, this bug was solved.

##DECISIONS

* Calendar Heatmap

**In general:** the Calendar Heatmap highlights the "when" aspect of the incidents background information. The Calendar Heatmap can be utilised to see the amount of incidents over time. You can answer questions like: how many incidents took place on one day? How did the amount of incidents develop over time?

**Interaction:** the border-width changes on hover instead of changing the color of the rectangle, because the color says something about the amount of incidents on one day. I do not change the stroke color, because the lines which draw the rectangles of the days are not a part of the border and this will result in something ugly. The tooltip of the Calendar Heatmap shows the amount of incidents that happened on that particular day.

**Link:** the Calendar Heatmap is linked with the Map of Syria. When you hover over the days in the Calendar Heatmap, the Map of Syria only shows the incidents that took place on that particular day. In this way you can retrieve more information about the incidents of one specific day. I have chosen to not display the corresponding tooltip in the calendar map, because these tooltips are very large and they wil overlap. The trade-of with only showing the circles which corresponds with the date of the Calendar Heatmap is that there are 800+ incidents in 2016 which had no coordinates. So when you hover over the months of sep/oct/nov it looks like the link with the map is not working, but this are all the incidents without coordinates. It would have been nice if I added to the tooltip of the Calendar Heatmap how many of the incidents are displayed in the map, but there was no time left to do this.

* Map

**In general:** the Map of Syria highlights the "where" aspect of the incidents background information. This visualisation is also useful when more information about only one incident is demanded. You can answer questions like: when did that particular incident take place? What is the type of violation? What happened?

**Interaction:** the color of the circles on the map changes on hover. When you click on a circle you will see a tooltip with details about that particular incident. I have chosen for the on click interactivity, because the circles are very close to each other on the map. When you change this to an on hover interactivity it is harder to see the details of one particular incident. Also the cursor will change to an pointer to make clear that it is possible to click on a circle. There are also zoombuttons to make it easier for the user to zoom into the cities where most of the incidents took place.

**Link:** the Map of Syria is linked with the Calendar Heatmap. When you hover over the circles on the map, the Calendar Heatmap shows the day when this incident took place (by changing the border-width) and the corresponding tooltip appears, so you can see how many incidents took place on this day.

* Barchart and Table

**In general::** the Barchart highlights the "what" aspect of the incidents background information. This visualisation displays the amount of incidents per type of violation. You can answer questions like: what is the most common type of violation? Does the amount of incidents per type of violation change over the years? I have chosen to abbreviate the type of violation titles on the x-axis, because some of the title are very long. Therefore, I made an Table where the meaning of the abbreviation is shown.

**Interaction:** the color of the bars of the Barchart change on hover, so it is clear over which bar you are hovering. Also a tooltip appear with the exact amount of incidents of that type of violation.

**Link:** I double linked the Barchart with the Table, to make it easier to search for the corresponding abbreviation.


##IN AN IDEAL WORLD...
If I would have more time to make this visualisation, I would like to do the following things:

1. I would like to use bootstrap for the page layout and create a fixed menu bar.

2. I would like to change the on-hover link between the Calendar Heatmap and Map of Syria to an on click link. So when you click on a day in the Calendar Heatmap only the corresponding circles are shown in the map. This way you can hover to the map to see details about the incidents without the other circles appear again. This was more difficult to implement than you would think, because when you change the opacity of the circles to 0.0 the circles will still be there. When you hover over the map it was possible to click on a circle which was transparent. So you have to remove the circle from the map to make this happen and I did not have enough time to fix this.

3. I would like to link the Barchart with the map and Calendar Heatmap. I wanted to filter the data of the map and Calendar Heatmap when you clicked on a bar in the Barchart, so only the data of one type of violation would be shown.

4. In the current visualisation I inform the user in the walkthrough how many incidents are not shown in the Map of Syria. I would like to implement this in the tooltip of the Calendar Heatmap, so you can see per day how many incidents are not shown.
