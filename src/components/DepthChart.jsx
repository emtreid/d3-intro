import React, { useRef, useEffect } from "react";
//import type * as d3Types from "./d3Types";
import * as d3 from "d3";
import { drawTooltip } from "./tooltip";

export const DepthChart = (props) => {
  const { sellData, buyData, width, height } = props;

  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    drawChart();
  }, [buyData, sellData]);

  function drawChart() {
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, left: 30, bottom: 20, right: 20 };

    const allData = buyData.concat(sellData);
    const xMinValue = d3.min(allData, (d) => d.price);
    const xMaxValue = d3.max(allData, (d) => d.price);
    const yMinValue = 0; //d3.min(allData, (d) => d.volume);
    const yMaxValue = d3.max(allData, (d) => d.volume);
    console.log(yMaxValue);

    const svg = d3
      .select(svgRef.current) //select our div with ref svgRef (returned at the end)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([xMinValue, xMaxValue]);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .scale(xScale)
          .ticks(width / 100)
      );

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(yScale)
          .scale(yScale)
          .ticks(height / 50)
          .tickSizeOuter(0)
      );

    const line = d3
      .line()
      .x((d) => xScale(d.price))
      .y((d) => yScale(d.volume));

    svg
      .append("path")
      .datum(sellData)
      .attr("fill", "none")
      //.attr("fill", "red")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(buyData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    const area = d3
      .area()
      .x((d) => xScale(d.price))
      .y0(height)
      .y1((d) => yScale(d.volume));

    svg
      .append("path")
      .datum(sellData)
      .attr("fill", "#ff7ea5aa")
      //.attr("fill", "red")
      .attr("stroke", "none")
      .attr("d", area);

    svg
      .append("path")
      .datum(buyData)
      .attr("fill", "#85ff6caa")
      .attr("stroke", "none")
      .attr("d", area);

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
