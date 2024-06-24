import React from "react";
import Chart from "react-apexcharts";

export default function DougnutChart({ venueCounts }) {
  // const data = [
  //   {
  //     name: "Ruby",
  //     quantity: 5
  //   },
  //   {
  //     name: "Emerald",
  //     quantity: 26
  //   },
  //   {
  //     name: "Diamond",
  //     quantity: 2
  //   },
  //   {
  //     name: "Ruby + Emerald",
  //     quantity: 9
  //   }
  // ];
  let names = [];
  let quantities = [];
  venueCounts?.forEach(function (n) {
    names.push(n.venue);
    quantities.push(n.percentage);
  });

  return React.createElement(Chart, {
    type: "donut",
    series: quantities,
    labels: {
      show: false,
      name: {
        show: true
      }
    },
    options: {
      labels: names,
      legend: {
        show: true,
        position: "bottom"
      },
      colors: ["#7A5B37", "#B78953", "#CFB08C", "#DFCAB2"]
    }
  });
}
