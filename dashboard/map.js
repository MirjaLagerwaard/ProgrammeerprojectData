/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/


function initMap () {
  var syria = {lat: 34.75139, lng: 38.26806}

  map = new google.maps.Map(d3.select("#map").node(), {
   zoom: 7,
   center: syria,
   scrollwheel: false
  });
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

        // Add a circle.
        marker.append("circle")
            .attr("r", 7)
            .attr("cx", padding)
            .attr("cy", padding)
            .attr("fill", "#ff7f50")

        function transform(d) {
          d = new google.maps.LatLng(d.value[2], d.value[3]);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
              .style("margin-left", (d.x) + "px")
              .style("margin-top", (d.y) + "px");

        }
      };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
  });
}

function removeOldMap() {
  d3.select(".syriamap").remove()
}
