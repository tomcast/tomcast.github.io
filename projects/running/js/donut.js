var dWidth = 960,
    dHeight = 500,
    dRadius = Math.min(width, height) / 2;

var dColor = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.milage; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(dRadius - 100)
    .outerRadius(dRadius - 20);

var donutSvg = d3.select("#donut").append("svg")
    .attr("width", dWidth)
    .attr("height", dHeight)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function type(d) {
    d.month = +d.MONTH;
    d.milage = +d.DISTANCE;
    return d;
  }

d3.tsv("./data/monthTotals.tsv", type, function(error, donutData) {
  var path = donutSvg.datum(donutData).selectAll("path")
      .data(pie)
      .enter().append("path")
      .attr("fill", function(d, i) { return dColor(i); })
      .attr("d", arc)
      .html( function(d) {return "<title>" + d.data.MONTH + ": " + d.data.milage + " miles</title>"});
});