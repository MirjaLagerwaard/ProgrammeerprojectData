/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

// make new datamap
var map = new Datamap({
    element: document.getElementById('container'),
    // zoom into Syria
    setProjection: function(element) {
      var projection = d3.geo.equirectangular()
        .center([43, 34.8])
        .rotate([4.4, 0])
        .scale(4900)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
      var path = d3.geo.path()
        .projection(projection);

      return {path: path, projection: projection};
    },

    // define the colors for the fillkeys
    fills: {
      defaultFill: '#bfbfbf'
    },

    // add geogrpahy configuration
    geographyConfig: {
        borderColor: 'black',
        borderWidth: '0.5px',
    }
});
