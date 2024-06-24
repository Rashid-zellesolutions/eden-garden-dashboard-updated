import React from "react";
import Chart from "react-apexcharts";

export default function TreeMap() {


  const config = {
    series: [
        {
          data: [
            {
              x: '08:00 AM - 10:00 AM',
              y: 0.1
            },
            {
              x: '10:00 AM - 12:00 PM',
              y: 0.4
            },
            {
              x: '12:00 PM - 02:00 PM',
              y: 0.3
            },
            {
              x: '02:00 PM - 04:00 PM',
              y: 0.7
            },
            {
              x: '04:00 PM - 06:00 PM',
              y: 0.9
            },
            {
              x: '06:00 PM - 08:00 PM',
              y: 0.2
            },
            {
              x: 'Full Day',
              y: 1
            },
            
          ]
        }
      ],
      options: {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        },
        title: {
          text: 'Treemap with Color scale'
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter: function(text, op) {
            return [text, op.value]
          },
          offsetY: -4
        },
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
              ranges: [
                {
                  from: 0.1,
                  to: 0.5,
                  color: '#353E49'
                },
                {
                  from: 0.5,
                  to: 1,
                  color: '#353E49'
                }
              ]
            }
          }
        }
      },
    
    
    };

  

  return React.createElement(Chart, {
    type: "treemap",
    series: config.series,
   
    options: config.options,
      
  });
}
