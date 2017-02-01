// FROM: https://bl.ocks.org/mbostock/4063318
// AND: https://www.crowdanalytix.com/communityBlog/10-steps-to-create-calendar-view-heatmap-in-d3-js
// AND: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

window.onload = loadCalendarData2016();
var data_csv_calendar;
var range_year1;
var range_year2;

function loadCalendarData2012() {
  data_csv_calendar = "data/calendardata2012.csv";
  range_year1 = 2012;
  range_year2 = 2013;
  removeOldCalendar();
  loadNewCalendar();
};

function loadCalendarData2013() {
  data_csv_calendar = "data/calendardata2013.csv";
  range_year1 = 2013
  range_year2 = 2014
  removeOldCalendar();
  loadNewCalendar();
};

function loadCalendarData2014() {
  data_csv_calendar = "data/calendardata2014.csv";
  range_year1 = 2014
  range_year2 = 2015
  removeOldCalendar();
  loadNewCalendar();
};

function loadCalendarData2015() {
  data_csv_calendar = "data/calendardata2015.csv";
  range_year1 = 2015
  range_year2 = 2016
  removeOldCalendar();
  loadNewCalendar();
};

function loadCalendarData2016() {
  data_csv_calendar = "data/calendardata2016.csv";
  range_year1 = 2016
  range_year2 = 2017
  removeOldCalendar();
  loadNewCalendar();
};

function loadNewCalendar() {

  // create the d3-tip
  var cal_tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:#ff7f50'>" + d + "</span>";
    })

  var width = 900,
      height = 105,
      cellSize = 12;
      week_days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
      month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

  var day = d3.time.format("%w"),
      week = d3.time.format("%U"),
      percent = d3.format(".1%"),
  	  format = d3.time.format("%Y%m%d");
  	  parseDate = d3.time.format("%Y%m%d").parse;

  var color = d3.scale.linear().range(["white", '#ff4400'])
      .domain([0, 1])

  var svg = d3.select(".calender-map").selectAll("svg")
    .data(d3.range(range_year1, range_year2))
    .enter().append("svg")
      .attr("width", '100%')
      .attr("data-height", '0.5678')
      .attr("viewBox",'0 0 900 105')
      .attr("class", "RdYlGn")
    .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

  svg.append("text")
    .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function(d) { return d; });

  for (var i = 0; i < 7; i++) {
      svg.append("text")
        .attr("transform", "translate(-5," + cellSize * (i + 1) + ")")
        .style("text-anchor", "end")
        .style("fill", "white")
        .attr("dy", "-.25em")
        .text(function(d) { return week_days[i]; });
  }

  var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return week(d) * cellSize; })
      .attr("y", function(d) { return day(d) * cellSize; })
      .attr("fill",'#fff')
      .datum(format);

  rect.call(cal_tip);

  var legend = svg.selectAll(".legend")
    .data(month)
    .enter().append("g")
      .attr("class", "legend")
      .style("fill", "white")
      .attr("transform", function(d, i) { return "translate(" + (((i + 1) * 50) + 8) + ",0)"; });

    legend.append("text")
     .attr("class", function(d, i) { return month[i] })
     .style("text-anchor", "end")
     .attr("dy", "-.25em")
     .text(function(d, i) { return month[i] });

    svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
      .attr("class", "month")
      .attr("id", function(d,i){ return month[i] })
      .attr("d", monthPath);

  d3.csv(data_csv_calendar, function(error, csv) {

    csv.forEach(function(d) {
      d.Total = parseInt(d.Total);
    });

    var Total_Max = d3.max(csv, function(d) { return d.Total; });

    var data = d3.nest()
      .key(function(d) { return d.Date; })
      .rollup(function(d) { return d[0].Total })
      .map(csv);

    rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) { return color(Math.sqrt(data[d] / Total_Max)); })
      .attr("data-title", function(d) { return "value : "+Math.round(data[d]*100)})
      .attr("id", function(d) { return d.substring(6,8) + "-" + d.substring(4,6) + "-" + d.substring(0,4) + ": " + ((data[d] !== undefined) ? data[d] : 0) + " incidents"})


    rect.on("mouseover", mouseover);
    rect.on("mouseout", mouseout);

    function mouseover(d) {
      d3.select(this).style("stroke-width", "2.5px")

      var datecalendar = d
      var data_per_day = (data[d] !== undefined) ? data[d] : 0;
      var purchase_text = "<strong>" + d.substring(6,8) + "-" + d.substring(4,6) + "-" + d.substring(0,4) + "</strong>"+ ": " + data_per_day + " incident(s)";

      cal_tip.show(purchase_text, this)

      d3.selectAll("circle").filter(function(d) {
        var datecircle = d.value[4].substring(6,10) + d.value[4].substring(3,5) + d.value[4].substring(0,2)
        if (datecircle != datecalendar) {
          return true
        }
        return false
      })
        .style("opacity", 0.0)
    }

    function mouseout(d) {
      d3.select(this)
        .style("stroke-width", "1px")

      cal_tip.hide()

      d3.selectAll("circle").style("opacity", 1.0)
    }
  });

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
    return x;
  }

  function monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
  }
}

function removeOldCalendar() {
  d3.selectAll(".calender-map > *").remove()
}

function returnUpdateMap() {
  d3.selectAll(".marker").style("fill", "orange")
}
