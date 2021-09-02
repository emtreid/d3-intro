import { aggregatedOB } from "./mockData";

export const cumulativeSum = (
  aggregatedOB,
  action,
  xmin = 9,
  xmax = 20,
  step = 0.01
) => {
  const singleOB = aggregatedOB[action];
  console.log(singleOB);
  let formattedData = [];
  for (let price = xmin; price <= xmax; price += step) {
    let cumulativeVolume = 0;
    for (let orderPrice in singleOB) {
      if (action === "Buy") {
        if (orderPrice >= price) {
          cumulativeVolume += singleOB[orderPrice];
        }
      } else if (action === "Sell") {
        if (orderPrice <= price) {
          cumulativeVolume += singleOB[orderPrice];
        }
      }
    }
    const dataPoint = { price: price, volume: cumulativeVolume };
    formattedData.push(dataPoint);
  }
  return formattedData;
};

export const getData = () => {
  const aggregatedOrderBook = aggregatedOB;

  const buyData = cumulativeSum(aggregatedOrderBook, "Buy");
  const sellData = cumulativeSum(aggregatedOrderBook, "Sell");

  return { buyData, sellData };
};
