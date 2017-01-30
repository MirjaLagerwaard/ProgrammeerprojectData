/*
# Name: Mirja Lagerwaard
# Student number: 10363149

# Source:
# https://developers.google.com/maps/documentation/javascript/adding-a-google-map
*/
var syria = {lat: 34.75139, lng: 38.26806}

function initMap() {
  map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 7,
    center: syria,
    scrollwheel: false
  });

  loadMapData2016()
}

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

  loadNewMap();
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

  loadNewMap();
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

  loadNewMap();
}

var data_json_map;
var map;

function loadMapData2012() {
  data_json_map = "mapdata2012.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2013() {
  data_json_map = "mapdata2013.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2014() {
  data_json_map = "mapdata2014.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2015() {
  data_json_map = "mapdata2015.json";
  removeOldMap();
  loadNewMap();
};

function loadMapData2016() {
  data_json_map = "mapdata2016.json";
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

  d3.json(data_json_map, function(error, data) {
    if (error) throw error;
    var overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayMouseTarget)
        .append("div")
        .attr("class", "syriamap");

    overlay.draw = function() {
      var projection = overlay.getProjection(),
          padding = 7;

      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var marker = layer.selectAll("svg")
        .data(d3.entries(data))
        .each(transform) // update existing markers
        .enter().append("svg:svg")
          .each(transform)
          .attr("class", "marker")
          .style("width", padding * 2 + "px")
          .style("height", padding * 2 + "px");

      marker.call(cal_tip)

        marker.filter(d => {return d.value[2] != 0 && d.value[3] != 0}).append("svg:circle")
          .attr("r", padding - 1)
          .attr("cx", padding)
          .attr("cy", padding)
          .attr("fill", "#ff7f50")
          .attr("stroke", "#404040")

          .on("mouseover", function(d) {
            d3.select(this)
              .attr("id", d.value[4].substring(6,10) + d.value[4].substring(3,5) + d.value[4].substring(0,2))
            updateCalendar(this)
            d3.select(this)
              .style("fill", "#404040")
              .style("cursor", "pointer")
          })

          .on("click", function(d) {
            tooltip.transition()
              .duration(0)
              .style("opacity", 0.9);

            tooltip.html('Link: ' + d.value[0] + '<br>'
                            + 'Location: '+ d.value[1] + '<br>'
                            + 'Date: ' + d.value[4] + '<br>'
                            + 'Type of violation: ' + d.value[5] + '<br>'
                            + 'Used weapon(s): ' + d.value[6] + '<br>'
                            + 'Description: ' + d.value[7] + '<br>')
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
           })

          .on("mouseout", function(d) {
            d3.select(this)
              .style("fill", "#ff7f50")
            returnUpdateCalendar()
            tooltip.transition()
              .duration(200)
              .style("opacity", 0);
          });

          function transform(d) {
            if(d.value[2] == "None" || d.value[3] == "None") {
            d.value[2] = 0
            d.value[3] = 0
          }

          d = new google.maps.LatLng(d.value[2], d.value[3]);
          d = projection.fromLatLngToDivPixel(d);

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
      console.log(this)
      cal_tip.show(this.id, this)
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
