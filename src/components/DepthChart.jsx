import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { drawTooltip } from "./tooltip";
import "./depthChart.css";

const DepthChart = ({ sellData, buyData, width, height }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  // redraw chart whenever data changes (e.g. redux store update)
  useEffect(() => {
    drawChart();
  }, [buyData, sellData]);

  function drawChart() {
    // Remove all of the elements we drew last time (we're about to draw them again)
    d3.select(svgRef.current).selectAll("*").remove();

    // Initialise constants
    const margin = { top: 20, left: 40, bottom: 35, right: 20 };
    const allData = buyData.concat(sellData);
    const xMinValue = d3.min(allData, (d) => d.price);
    const xMaxValue = d3.max(allData, (d) => d.price);
    const yMinValue = 0; // d3.min(allData, (d) => d.volume);
    const yMaxValue = d3.max(allData, (d) => d.volume);

    // Initialise SVG and drawArea
    const svg = d3
      .select(svgRef.current) // Select our div with ref svgRef (returned at the end)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const drawArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise scaling functions
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([xMinValue, xMaxValue]);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    // Add axes to drawArea
    drawArea
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    drawArea
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickSizeOuter(0));

    // Add areas to drawArea
    const area = d3
      .area()
      .x((d) => xScale(d.price))
      .y0(height)
      .y1((d) => yScale(d.volume));

    drawArea
      .append("path")
      .datum(sellData)
      .attr("fill", "#ff7ea5aa")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", area);

    drawArea
      .append("path")
      .datum(buyData)
      .attr("fill", "#85ff6caa")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", area);

    drawArea
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 3)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Price [GBP]");

    drawArea
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Volume");

    // Extension : Add a tooltip to follow the cursor
    drawTooltip({
      margin,
      width,
      height,
      buyData,
      sellData,
      xScale,
      yScale,
      svgRef,
      tooltipRef,
    });
  }

  return (
    <div className={"chart"}>
      <div ref={svgRef} />
      <div ref={tooltipRef} className={"tooltip"} />
    </div>
  );
};

export default DepthChart;
