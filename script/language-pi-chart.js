// create a pi chart of the language data for the home page

var margin = {top: 0, bottom: 20, right: 0, left: 0},
    width = 400 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2;

var colorScale = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.Total; });

var svg = d3.select(".pi-chart").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.right + margin.left)
  .append("g")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

d3.csv("/assets/lang_stats.csv", function(error, data) {
  var nameToIndex = {},
      count = 0,
      totalsize = 0;
  data.forEach(function(d) {
    d.Total = +d.Total;
    nameToIndex[d.Language] = count;
    count++;
    totalsize += d.Total;
  });

  data.map(function(d) {
    d.percentage = d.Total / totalsize * 100;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("class", "arc")
      .attr("id", function(d) { return d.data.Language; })
      .on("mouseover", showInfo(true))
      .on("mouseout", showInfo(false));

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d,i) { return colorScale(i); });

  function showInfo(show) {
    return function(g, i) {
      if (show)
        svg.selectAll(".arc")
            .filter(function(d) { return g.data.Language == d.data.Language; })
          .append("text")
            .attr("transform", function(d) {
              return "translate(0," + (radius + 10) + ")"  })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.Language + " " +
              Math.round(d.data.percentage*100)/100 + "%"; });
      else
        svg.selectAll(".arc text").remove();

      svg.selectAll("path")
          .filter(function(d) { return g.data.Language == d.data.Language; })
        .transition()
          .style("fill", function(d,i) {
            return show ?
              d3.rgb(colorScale(nameToIndex[d.data.Language])).darker() :
              colorScale(nameToIndex[d.data.Language]);
          });
    };
  }
});
