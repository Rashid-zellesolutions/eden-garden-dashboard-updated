import React from "react";
import Chart from "react-apexcharts";

export default function HistogramChart() {
const config = {
          
    series: [{
        name: 'Total Events',
        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31]
      }],
      options: {
        annotations: {
          points: [{
            x: 'Event Types',
            seriesIndex: 0,
            label: {
              borderColor: '#C7A37A',
              offsetY: 0,
             
           
            }
          }]
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
            borderColor: '#C7A37A'
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
            labels: {
              rotateAlways: true,
              rotate: -30,
              style: {
                color: '#FF5733', // Change label color
                fontSize: '9px', // Change label font size
                fontWeight: 600, // Change label font weight
                fontFamily: 'Arial, sans-serif', // Change label font family
              },
            },
            categories: ['Wedding', 'Quinceanera', 'Anniversary', 'Birthday', 'Corporate Event', 'Christening',
              'Engagement', 'Gala Fundraiser', 'Graduation Party', 'Prom'
            ],
            tickPlacement: 'on',
            
           
          },
        yaxis: {
          title: {
            text: 'Servings',
          },
        },
        fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'horizontal',
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100],
              colorStops: [
                {
                  offset: 0,
                  color: '#C7A37A' // This is the converted color code
                },
                {
                  offset: 100,
                  color: '#D9C1A6' // This is the converted color code
                }
              ]
            }
          }
          
      },
    
    
    
  
  
  };


  return React.createElement(Chart, {
    type: "bar",
    series: config.series,
    options: config.options,
    
  });
}
