const lineChart = {
  series: [
    {
      name: "Total Amount",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0,
    },
    {
      name: "Refund Amount",
      data: [30, 90, 440, 140, 290, 290, 340, 230, 400],
      offsetY: 0,
    },
    {
      name: "Balance Amount",
      data: [0, 90, 40, 60, 390, 190, 240, 430, 600],
      offsetY: 0,
    },
  ],

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

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default lineChart;
