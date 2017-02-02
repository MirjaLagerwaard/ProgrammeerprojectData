/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

// Sources:
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
// https://bl.ocks.org/mbostock/899711
// http://bl.ocks.org/tommyskg/6111032

// center coordinates of Syria
var syria = {lat: 34.75139, lng: 38.26806}

// make a new google maps map
function initMap() {
  map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 7,
    center: syria,
    scrollwheel: false
  });

  document.getElementById("zoomout").disabled = true;

  loadMapData2016();
}

// zoomout function
function resetSize() {
  map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 7,
    center: syria,
    scrollwheel: false
  });

  document.getElementById("zoomout").disabled = true;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = false;

  loadNewMap();
}

// zoomfunction for zoombuttons
function Zoom(lat, lng, zoom) {
  var myOptions = {
    zoom: zoom,
    center: {lat:lat, lng: lng}
  }
  map.setOptions(myOptions);
};

// disable zoombutton Aleppo
function disableAleppo() {
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = true;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = false;
}

// disable zoombuttons Homs
function disableHoms() {
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = true;
  document.getElementById("zoomdamascus").disabled = false;
}

// disable zoombutton Damascus
function disableDamascus() {
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = true;
}

var data_json_map;
var map;

// functions to load new data when the a timebuttons is clicked
function loadMapData2012() {
  data_json_map = "data/mapdata2012.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2013() {
  data_json_map = "data/mapdata2013.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2014() {
  data_json_map = "data/mapdata2014.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2015() {
  data_json_map = "data/mapdata2015.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2016() {
  data_json_map = "data/mapdata2016.json";
  removeOldMap();
  loadNewMap();
};

// create the d3-tip
var cal_tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:#ff7f50'>" + d + "</span>";
  })

function loadNewMap() {

  // load the data as a json
  d3.json(data_json_map, function(error, data) {
    if (error) throw error;
    var overlay = new google.maps.OverlayView();

    // add an d3 overlay
    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayMouseTarget)
        .append("div")
        .attr("class", "syriamap");

    // draw the d3 overlay
    overlay.draw = function() {
      var projection = overlay.getProjection(),
          padding = 7;

      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // make an marker as svg element to draw a circle on this element
      var marker = layer.selectAll("svg")
        .data(d3.entries(data))
        .each(transform) // update existing markers
        .enter().append("svg:svg")
          .each(transform)
          .attr("class", "marker")
          .style("width", padding * 2 + "px")
          .style("height", padding * 2 + "px");

      layer.select("svg").call(cal_tip)

      // append a circle on the markers with a latitude and longitude
      marker.filter(d => {return d.value[2] != 0 && d.value[3] != 0}).append("svg:circle")
        .attr("r", padding - 1)
        .attr("cx", padding)
        .attr("cy", padding)
        .attr("fill", "#ff7f50")
        .attr("stroke", "#404040")

        // add on mouseover interaction
        .on("mouseover", function(d) {
          d3.select(this)
            .attr("id", d.value[4].substring(6,10) + d.value[4].substring(3,5) + d.value[4].substring(0,2))

          // show tooltip and change stroke-width of calendar
          updateCalendar(this)

          d3.select(this)
            .style("fill", "#404040")
            .style("cursor", "pointer")
        })

        // add on click inderaction
        .on("click", function(d) {
          // show tooltip
          tooltip.transition()
            .style("opacity", 0.9);

          // select data to show in the tooltip
          tooltip.html("<strong>" + 'Link: ' + "</strong>" + d.value[0] + '<br>'
                          + "<strong>" + 'Location: ' + "</strong>" + d.value[1] + '<br>'
                          + "<strong>" + 'Date: ' + "</strong>" + d.value[4] + '<br>'
                          + "<strong>" + 'Type of violation: ' + "</strong>" + d.value[5] + '<br>'
                          + "<strong>" + 'Used weapon(s): ' + "</strong>" + d.value[6] + '<br>'
                          + "<strong>" + 'Description: ' + "</strong>" + d.value[7] + '<br>')
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
         })

         // add on mouseout interaction
        .on("mouseout", function(d) {

          d3.select(this)
            .style("fill", "#ff7f50")

          returnUpdateCalendar()

          tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        });

        function transform(d) {
          // when the latitude or longitude of an incident is None, tranform it to 0
          if(d.value[2] == "None" || d.value[3] == "None") {
            d.value[2] = 0
            d.value[3] = 0
          }

          d = new google.maps.LatLng(d.value[2], d.value[3]);
          d = projection.fromLatLngToDivPixel(d);

          // add a small random number to the pixels of the circles on the map,
          // so incidents with the same coordinates are not fully overlapping each other
          return d3.select(this)
            .style("left", (d.x + (Math.random() - 0.5) * 14) + "px")
            .style("top", (d.y + (Math.random() - 0.5) * 14) + "px");
        }
      };
    };
    overlay.setMap(map);
  });
}

function removeOldMap() {
  d3.selectAll(".syriamap").remove()
}

function updateCalendar(x) {
  d3.selectAll(".day").filter(function(d) {
    if (d == x.id) {
      cal_tip.show(this.id, document.getElementById(this.id))
      return true
    }
    return false
  })
  .style("stroke-width", "2px")
}

function returnUpdateCalendar() {
  cal_tip.hide()
  d3.selectAll(".day").style("stroke-width", "1px")
}
