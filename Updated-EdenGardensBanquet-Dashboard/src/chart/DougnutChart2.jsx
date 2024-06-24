import React from "react";
import Chart from "react-apexcharts";

export default function DougnutChart2() {
  const data = [
    {
      name: "10 AM - 12 PM",
      quantity: 5
    },
    {
      name: "12 PM - 02 PM",
      quantity: 26
    },
    {
      name: "02 PM - 04 PM",
      quantity: 13
    },
    {
      name: "04 PM - 06 PM",
      quantity: 20
    },
    {
        name: "06 PM - 08 PM",
        quantity: 20
    },
    {
        name: "Full Day",
        quantity: 10
    }
  ];

  let names = [];
  let quantities = [];
  data.forEach(function (n) {
    names.push(n.name);
    quantities.push(n.quantity);
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
        position: "right"
      },
      colors: ["#7A5B37", "#B78953", "#CFB08C", "#DFCAB2"]
    }
  });
}
