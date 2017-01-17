/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

window.onload = loadChartData2012()
var data_json;

function loadChartData2012() {
  data_json = "barcharttest.json";
  document.getElementById("data2012").disabled = true;
  document.getElementById("data2013").disabled = false;
  document.getElementById("data2014").disabled = false;
  document.getElementById("data2015").disabled = false;
  document.getElementById("data2016").disabled = false;
  load_data_chart();
};

function loadChartData2013() {
  data_json = "barcharttest2.json";
  document.getElementById("data2012").disabled = false;
  document.getElementById("data2013").disabled = true;
  document.getElementById("data2014").disabled = false;
  document.getElementById("data2015").disabled = false;
  document.getElementById("data2016").disabled = false;
  load_data_chart();
};

function loadChartData2014() {
  data_json = "data2014barchart.json";
  document.getElementById("data2012").disabled = false;
  document.getElementById("data2013").disabled = false;
  document.getElementById("data2014").disabled = true;
  document.getElementById("data2015").disabled = false;
  document.getElementById("data2016").disabled = false;
  load_data_chart();
};

function loadChartData2015() {
  data_json = "data2015barchart.json";
  document.getElementById("data2012").disabled = false;
  document.getElementById("data2013").disabled = false;
  document.getElementById("data2014").disabled = false;
  document.getElementById("data2015").disabled = true;
  document.getElementById("data2016").disabled = false;
  load_data_chart();
};

function loadChartData2016() {
  data_json = "data2016barchart.json";
  document.getElementById("data2012").disabled = false;
  document.getElementById("data2013").disabled = false;
  document.getElementById("data2014").disabled = false;
  document.getElementById("data2015").disabled = false;
  document.getElementById("data2016").disabled = true;
  load_data_chart();
};

function load_data_chart() {
  d3.selectAll("svg > .chart").remove();

  //set the margin
  var margin = {top: 20, right: 50, bottom: 60, left: 75},
    width = 1325 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  // set scale for x
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  // set scale for y
  var y = d3.scale.linear()
    .range([height, 0]);

  // set x-axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  // set y-axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

  // set the height and with of the chart
  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // load data from the json file into d3
  d3.json(data_json, function(data) {
    // set x- and y-domain
    x.domain(data.data.map(function(d) { return d.typeofviolation; }));
    y.domain([0, 2000]);

    // create the d3-tip
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:#ff7f50'>" + d.amount + "</span>";
      })
    chart.call(tip);

    // create the x-axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y", 9)
        .attr("x", 6)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    // create the y-axis
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -42)
      .attr("x", -height / 2.5)
      .style("text-anchor", "end")
      .text("Amount of incidents");

    // make the bars of the chart by using the data values
    var bar = chart.selectAll(".bar")
      .data(data.data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.typeofviolation); })
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); })
      .attr("width", x.rangeBand())
      .attr("id", function(d) { return d.typeofviolation.replace(/\s/g, ''); })
      // change color of the bars on mouse hover and show the data value by using the d3-tip
      .on("mouseover", function(d){
        d3.select(this)
          .style("fill", "#ff7f50");
        tip.show(d)
      })
      // change the color back on mouse out and hide the d3-tip
      .on("mouseout", function(){
        d3.select(this)
          .style("fill", "#333");
        tip.hide()
      });

  });

  function type(d) {
    d.amount = +d.amount;
    return d;
  }
}
