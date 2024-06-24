const dCharts = {

    series: [44, 55, 41, 17, 15],

    labels: ['A', 'B', 'C', 'D', 'E'],
  
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "bar", // Use the bar type
        toolbar: {
          show: false,
        },
      },
  
    plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%", // Adjust the column width as needed
          endingShape: "rounded",
        },
    },
  
    legend: {
        show: false,
    },
  
    dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
  
      fill: {
        colors: ['#353E49', '#B78953'], // Set the background colors for the categories
        
      },
      
    stroke: {
        colors: ['#353E49', '#B78953'], // Set the border colors for the categories
        width: 1, // Set the border width as needed
    },
  
    yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
    },
  };
  
  export default dCharts;
  