import * as d3 from "d3";

export const drawTooltip = ({
  margin,
  width,
  height,
  buyData,
  sellData,
  xScale,
  yScale,
  svgRef,
  tooltipRef,
}) => {
  const drawArea = d3.select(svgRef.current).select("svg").select("g");
  const tooltip = d3.select(tooltipRef.current);

  const mousemove = (event) => {
    const xPos = d3.pointer(event)[0];
    const bisect = d3.bisector((d) => d.price).left; //create a "bisector"
    const buyIndex = bisect(buyData, xScale.invert(xPos));
    const sellIndex = bisect(sellData, xScale.invert(xPos));
    // search index in both buy and sell data
    const buyPoint = buyData[buyIndex];
    const sellPoint = sellData[sellIndex];
    // take whichever exists as our data
    const data = buyPoint ? buyPoint : sellPoint;
    const action = buyPoint ? "Buy" : "Sell";
    focus.style(
      "transform",
      `translate(${xScale(data.price)}px,${yScale(data.volume)}px)`
    );
    const tooltipContent = `<span><b>${action} orders</b></span><br><b>Price: </b>£${
      Math.round(data.price * 100) / 100
    }<br><b>Volume: </b>${data.volume}`;
    tooltip.html(tooltipContent);
    tooltip
      .style("left", event.pageX + 15 + "px")
      .style("top", event.pageY + "px")
      .classed("Buy", action === "Buy")
      .classed("Sell", action === "Sell");
  };

  const focus = drawArea.append("g").attr("class", "focus");

  focus
    .append("circle")
    .attr("r", 5)
    .attr("class", "circle")
    .style("fill", "#f0fff0");

  drawArea
    .append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0)
    .on("mouseover", () => {
      focus.style("opacity", 1);
      tooltip.transition().duration(100).style("opacity", 1);
    })
    .on("mouseout", () => {
      focus.style("opacity", 0);
      tooltip.transition().duration(300).style("opacity", 0);
    })
    .on("mousemove", mousemove);
};
