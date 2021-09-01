import React from "react";
import { DepthChart } from "./DepthChart";
import { cumulativeSum } from "../util/formatData";
import { aggregatedOB } from "../util/mockData";

const DataDisplay = () => {
  //Here we'd use useSelector etc
  const aggregatedOrderBook = aggregatedOB;

  const buyData = cumulativeSum(aggregatedOB, "Buy");
  const sellData = cumulativeSum(aggregatedOB, "Sell");

  return (
    <div className="depthChart">
      <DepthChart
        sellData={sellData}
        buyData={buyData}
        width={500}
        height={250}
      />
    </div>
  );
};

export default DataDisplay;
