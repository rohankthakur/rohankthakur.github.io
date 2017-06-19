---
layout: inner
title: Data Page Main
categories: blog development
tags: mars videos
lead_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita maiores quisquam id sunt, a architecto molestias velit, distinctio quidem non, nostrum provident quibusdam enim. Neque ipsam temporibus commodi facere minima.'
permalink: /data/
---

<div class="row" id="dateHolder">Date</div>
<div class="row" id="logoHolder">Logo</div>
<div class="row" id="mainCharts">Main Chart Area
<div class="row">
  <div class="col-md-3" id="sideList">Side List</div>
  <div class="col-md-9" id="smallCharts">Small Charts
    <div class="row" id="topCharts">
      <div class="col-md-3" id="topChart1">Top 1</div>
      <div class="col-md-3" id="topChart2">Top 2</div>
      <div class="col-md-3" id="topChart3">Top 3</div>
    </div>
    <div class="row" id="bottomCharts">
      <div class="col-md-3" id="bottomChart1">Bottom 1</div>
      <div class="col-md-3" id="bottomChart2">Bottom 2</div>
      <div class="col-md-3" id="bottomChart3">Bottom 3</div>
    </div>
  </div>
</div>
</div>
<div class="row" id="filterHolder">Filters</div>
<div class="row" id="tableHolder">datatable</div>
<div class="row" id="footerHolder">footer</div>

<link rel="stylesheet" href="/css/dc.min.css">
<link rel="stylesheet" href="/css/mymain.css">
<link rel="stylesheet" href="/css/myvis.css">

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="/js/d3.min.js" charset="utf-8"></script>
<script src="/js/jquery.min.js" charset="utf-8"></script>
<script src="/js/crossfilter.min.js" charset="utf-8"></script>
<script src="/js/dc.min.js" charset="utf-8"></script>

<script type="text/javascript">

// Get the data
d3.csv("/datasets/anon_playset.csv", function(error, data) {
  data.forEach(function(d) {
    d.Dim0    = d.Dim0;
    d.Dim1    = d.Dim1;
    d.Dim2    = d.Dim2;
    d.Dim3    = d.Dim3;
    d.Dim4    = d.Dim4;
    d.Time    = +d.Time;
    d.PosVal1 = +d.PosVal1;
    d.PosVal2 = +d.PosVal2;
    d.NegVal1 = +d.NegVal1;
    d.NegVal2 = +d.NegVal2;
    d.NegVal3 = +d.NegVal3;
    d.NegVal4 = +d.NegVal4;    
  });

var ndx = crossfilter(data);
var all = ndx.groupAll();

var Dim0Dim   = ndx.dimension(function(d) {return d.Dim0;});
var Dim1Dim   = ndx.dimension(function(d) {return d.Dim1;});
var Dim2Dim   = ndx.dimension(function(d) {return d.Dim2;});
var Dim3Dim   = ndx.dimension(function(d) {return d.Dim3;});
var Dim4Dim   = ndx.dimension(function(d) {return d.Dim4;});
var TimeDim   = ndx.dimension(function(d) {return d.Time;});

var minTime = TimeDim.bottom(1)[0].Time;
var maxTime = TimeDim.top(1)[0].Time;


var TimeDimPosVal1 = TimeDim.group().reduceSum(function(d) {return d.PosVal1;});
var TimeDimPosVal2 = TimeDim.group().reduceSum(function(d) {return d.PosVal2;});
var TimeDimNegVal1 = TimeDim.group().reduceSum(function(d) {return d.NegVal1;});
var TimeDimNegVal2 = TimeDim.group().reduceSum(function(d) {return d.NegVal2;});
var TimeDimNegVal3 = TimeDim.group().reduceSum(function(d) {return d.NegVal3;});
var TimeDimNegVal4 = TimeDim.group().reduceSum(function(d) {return d.NegVal4;});

var Dim1TimeDim = ndx.dimension(function(d) {return [d.Dim1, +d.Time]; });
var Dim1TimeDimVal1 = Dim1TimeDim.group().reduceSum(function(d) {return d.PosVal1;});

var Dim1DimPosVal1 = Dim1Dim.group().reduceSum(function(d) {return d.PosVal1;});
var Dim2DimPosVal1 = Dim2Dim.group().reduceSum(function(d) {return d.PosVal1;});
var Dim4DimPosVal1 = Dim4Dim.group().reduceSum(function(d) {return d.PosVal1;});

var Dim2TimeDim = ndx.dimension(function(d) {return [d.Dim2, +d.Time]; });
var Dim2TimeDimPosVal1 = Dim2TimeDim.group().reduceSum(function(d) {return d.PosVal1;});
var Dim2TimeDimNegVal1 = Dim2TimeDim.group().reduceSum(function(d) {return d.NegVal1;});

var quarterChart2 = dc.pieChart('#topChart1');
    quarterChart2 
        .width(250)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(Dim1Dim)
        .group(Dim1DimPosVal1);  

var dateGroup = Dim2Dim.group().reduce(
    function(p, v) {
        ++p.count;
        p.label = v.Dim2;
        p.bubble = 5;
        p.x += v.NegVal1;
        p.y += v.PosVal1;

        return p;
    },
    function(p, v) {
        --p.count;
        p.label = v.Dim2;
        p.bubble = 5;
        p.x -= v.NegVal1;
        p.y -= v.PosVal1;

        return p;
    }, function() {
        return { count: 0, x: 0, y:0, label: "" };
    });

var bubbleChart  = dc.bubbleChart("#bottomChart1");
//debugger;
bubbleChart
    .dimension(Dim2Dim)
    .group(dateGroup)
    // .clipPadding(10)
    .margins({top: 10, right: 10, bottom: 55, left: 30})
    .x(d3.scale.linear())
    .y(d3.scale.linear())
    .elasticY(true)
    .elasticX(true)
    .width(300)
    .height(250)
    .yAxisPadding(10)
    .xAxisPadding(10)
    .xAxisLabel('PL') // (optional) render an axis label below the x axis
    .yAxisLabel('WP') // (optional) render a vertical axis lable left of the y axis
    .label(function (p) {
        return p.value.label;
    })
    .renderLabel(true)
    .title(function (p) {
        return [
               "Paid Loss: " + d3.format(",.0f")(p.value.x),
               "Written Premium: " + d3.format(",.0f")(p.value.y),
               "Reserves: " + p.value.bubble,
               ]
               .join("\n");
    })
    .renderTitle(true)
    .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
    .renderVerticalGridLines(true)
    .maxBubbleRelativeSize(0.3)
    .keyAccessor(function (p) {return p.value.x;})
    .valueAccessor(function (p) {return p.value.y;})
    .radiusValueAccessor(function (p) {return p.value.bubble-4.9;})
    .renderlet(function(chart) {chart.svg().selectAll('.chart-body').attr('clip-path', null)})
    .renderlet(function (chart) {
                    chart.selectAll("g.x text")
                      .attr('dx', '-30')
                      .attr('transform', "rotate(-45)");
                });;
  bubbleChart.xAxis().ticks(10).tickFormat(function(d) {return d3.format(".2s")(d);})
  bubbleChart.yAxis().ticks(10).tickFormat(function(d) {return d3.format(".2s")(d);}); //Math.round(h)
  bubbleChart.margins().left += 40;


        dc.renderAll();
});

</script>
