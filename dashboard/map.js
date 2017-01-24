/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/


function initMap() {
  var syria = {lat: 34.75139, lng: 38.26806}
  map = new google.maps.Map(d3.select("#map").node(), {
   zoom: 7,
   center: syria,
   scrollwheel: false
  });
  document.getElementById("zoomout").disabled = true;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = false;
  load_data_map();
}

function zoomAleppo() {
  var aleppo = {lat: 36.216667, lng: 37.166667}
  map = new google.maps.Map(d3.select("#map").node(), {
   zoom: 11,
   center: aleppo,
   scrollwheel: false
  });
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = true;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = false;
  load_data_map();
}

function zoomHoms() {
  var homs = {lat: 34.73083, lng: 36.70944}
  map = new google.maps.Map(d3.select("#map").node(), {
   zoom: 10,
   center: homs,
   scrollwheel: false
  });
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = true;
  document.getElementById("zoomdamascus").disabled = false;
  load_data_map();
}

function zoomDamascus() {
  var damascus = {lat: 33.51306, lng: 36.29194}
  map = new google.maps.Map(d3.select("#map").node(), {
   zoom: 11,
   center: damascus,
   scrollwheel: false
  });
  document.getElementById("zoomout").disabled = false;
  document.getElementById("zoomaleppo").disabled = false;
  document.getElementById("zoomhoms").disabled = false;
  document.getElementById("zoomdamascus").disabled = true;
  load_data_map();
}

window.onload = loadMapData2016()
var data_json_map;
var map;

function loadMapData2012() {
  data_json_map = "mapdata2012.json";
  removeOldMap();
  load_data_map();
};

function loadMapData2013() {
  data_json_map = "mapdata2013.json";
  removeOldMap();
  load_data_map();
};

function loadMapData2014() {
  data_json_map = "mapdata2014.json";
  removeOldMap();
  load_data_map();
};

function loadMapData2015() {
  data_json_map = "mapdata2015.json";
  removeOldMap();
  load_data_map();
};

function loadMapData2016() {
  data_json_map = "mapdata2016.json";
  removeOldMap();
  load_data_map();
};

function load_data_map() {
  d3.json(data_json_map, function(error, data) {
    if (error) throw error;
    var overlay = new google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayLayer).append("div")
          .attr("class", "syriamap");

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function() {
        var projection = overlay.getProjection(),
            padding = 10;

        var marker = layer.selectAll("svg")
            .data(d3.entries(data))
            .each(transform) // update existing markers
          .enter().append("svg")
            .each(transform)
            .attr("class", "marker");

        marker.filter(d => {return d.value[2] != 0 && d.value[3] != 0}).append("circle")
            .attr("r", 7)
            .attr("cx", padding)
            .attr("cy", padding)
            .attr("fill", "#ff7f50")
            .attr("stroke", "black")

        function transform(d) {
          if(d.value[2] == "None" || d.value[3] == "None") {
            d.value[2] = 0
            d.value[3] = 0
          }
          d = new google.maps.LatLng(d.value[2], d.value[3]);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
              .style("margin-left", (d.x + (Math.random() - 0.5) * 14) + "px")
              .style("margin-top", (d.y + (Math.random() - 0.5) * 14) + "px");
        }
      };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
  });
}

function removeOldMap() {
  d3.selectAll(".syriamap").remove()
}
