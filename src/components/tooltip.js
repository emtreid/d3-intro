import * as d3 from "d3";

export function drawTooltip({
  margin,
  width,
  height,
  buyData,
  sellData,
  xScale,
  yScale,
  svgRef,
  tooltipRef,
}) {
  const svg = d3.select(svgRef.current).select("svg").select("g");
  const tooltip = d3.select(tooltipRef.current);

  const mousemove = (event) => {
    const bisect = d3.bisector((d) => d.price).left; //create a "bisector"
    const xPos = d3.pointer(event)[0];
    const x0 = bisect(buyData, xScale.invert(xPos));
    const buyPoint = buyData[x0]; //extract the buy/sell points closest to our mouse pointer's x-position
    const sellPoint = sellData[x0];

    tooltip
      .style("left", event.pageX + 15 + "px")
      .style("top", event.pageY + "px")
      .transition()
      .duration(100)
      .style("opacity", 1);

    if (sellPoint.volume >= buyPoint.volume) {
      const d0 = sellPoint;
      focus.style(
        "transform",
        `translate(${xScale(d0.price)}px,${yScale(d0.volume)}px)`
      );

      const tooltipContent = `<b>Sell orders</b><br><b>Price: </b>${
        Math.round(d0.price * 100) / 100
      }<br><b>Volume: </b>${d0.volume}`;

      tooltip.html(tooltipContent || d0.price);
    } else {
      const d0 = buyPoint;
      focus.style(
        "transform",
        `translate(${xScale(d0.price)}px,${yScale(d0.volume)}px)`
      );

      const tooltipContent = `<b>Buy orders</b><br><b>Price: </b>${
        Math.round(d0.price * 100) / 100
      }<br><b>Volume: </b>${d0.volume}`;

      tooltip.html(tooltipContent || d0.price);
    }
  };

  const focus = svg.append("g").attr("class", "focus");

  focus
    .append("circle")
    .attr("r", 5)
    .attr("class", "circle")
    .style("fill", "#f0fff0");

  svg
    .append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0)
    .on("mouseover", () => {
      focus.style("opacity", 1);
    })
    .on("mouseout", () => {
      focus.style("opacity", 0);
      tooltip.transition().duration(300).style("opacity", 0);
    })
    .on("mousemove", mousemove);
}
