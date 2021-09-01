# d3-intro

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is intended to be a streamlined example of a d3 project, compatible with d3 v7.

The example is of an order depth chart for a financial trading platform.

It was created and presented by Scott Logic grads M. Beanland, JJ Gray, and E. Reid.

## getData()

Generates data based on a mock aggregated order book.

It converts this into two data arrays, containing price and cumulative volume data for buy and sell orders.

## DepthChart(props)

Generates the axes and paths of the depth chart.

It calls drawTooltip.

## drawTooltip(props)

Adds a tooltip which appears when the mouse is moved over the chart.

The function appends an invisible overlay which detects and responds to mouse events.
