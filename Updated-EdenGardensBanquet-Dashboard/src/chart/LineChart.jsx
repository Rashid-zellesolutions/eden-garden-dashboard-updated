import ReactApexChart from "react-apexcharts";

const LineChart = ({ categories, series }) => {
  const options = {
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
        columnWidth: "10%", // Adjust the column width as needed
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
      colors: ['#353E49', '#B78953', '#CFB08C'], // Set the background colors for the categories
    },

    stroke: {
      colors: ['#353E49', '#B78953', '#CFB08C'], // Set the border colors for the categories
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
        formatter: function(val) {
          // Convert the timestamp to a date object
          const date = new Date(val);
          // Format the date as "MM-DD-YYYY"
          const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
                                `${date.getDate().toString().padStart(2, '0')}-` +
                                `${date.getFullYear()}`;
          return formattedDate;
        },
      },
      categories: categories,
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
      marker: {
        show: true,
        fillColors: ['#B78953', '#353E49', '#CFB08C'], // Set the colors for the tooltip marker
      },
    },
    markers: {
      // size: 6, // Adjust the size of the line markers
      colors: ['#353E49', '#B78953', '#CFB08C'], // Set the colors for the line markers
      strokeWidth: 0, // Set the border width for the line markers
      // strokeColors: ['#B78953', '#353E49', '#CFB08C'], // Set the border colors for the line markers
      shape: 'circle', // Set the shape of the line markers (options: circle, square, diamond, triangle, etc.)
    },
  };

  return (
    <>
      <ReactApexChart
        className="full-width"
        options={options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
};

export default LineChart;
