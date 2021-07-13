import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ChartBar from "./charts/ChartBar";
import ChartDonut from "./charts/ChartDonut";
import ChartPie from "./charts/ChartPie";

function ChartRep() {
  return (
    <div className="flex flex-col items-center justify-center mx-4 mt-10 mb-6 bg-red-200 lg:flex-row lg:flex-wrap rounded-3xl lg:col-span-full ">
      <ChartBar />
      <ChartPie />
      <ChartDonut />
    </div>
  );
}

export default ChartRep;
