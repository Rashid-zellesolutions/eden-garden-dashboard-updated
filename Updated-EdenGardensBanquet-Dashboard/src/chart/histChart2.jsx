import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

const HistogramChart2 = ({ bookingData, histogramTime }) => {
  const [chartData, setChartData] = useState([]);

  const currentDate = dayjs();
  useEffect(() => {
    if (histogramTime === "3Month") {
      const lastThreeMonthsData = bookingData ? bookingData?.filter((booking) => {
        const bookingDate = dayjs(booking.createdAt);
        const today = new Date();
        const last3MonthsStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastmonth = new Date(last3MonthsStartDate.getFullYear(), last3MonthsStartDate.getMonth() - 3, 1);
        // console.log(lastmonth, last3MonthsStartDate);
        return bookingDate.isAfter(lastmonth) && bookingDate.isBefore(last3MonthsStartDate)
        // return dayjs(booking.createdAt).isAfter(currentDate.subtract(3, 'month'))
      }
      ) : [];
      setChartData(lastThreeMonthsData)
    } else if (histogramTime === "6Month") {
      const lastThreeMonthsData = bookingData ? bookingData?.filter((booking) => {
        const bookingDate = dayjs(booking.createdAt);
        const today = new Date();
        const last6MonthsStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastmonth = new Date(last6MonthsStartDate.getFullYear(), last6MonthsStartDate.getMonth() - 6, 1);
        // console.log(lastmonth, last6MonthsStartDate);
        return bookingDate.isAfter(lastmonth) && bookingDate.isBefore(last6MonthsStartDate)
      }
        // dayjs(booking.createdAt).isAfter(currentDate.subtract(6, 'month'))
      ) : [];
      setChartData(lastThreeMonthsData)
    }
    else if (histogramTime === "1Year") {
      const lastThreeMonthsData = bookingData ? bookingData?.filter((booking) => {
        const bookingDate = dayjs(booking.createdAt);
        const today = new Date();
        const last1YearStartDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const last1YearEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        console.log(last1YearStartDate, last1YearEndDate);
        return bookingDate.isAfter(last1YearStartDate) && bookingDate.isBefore(last1YearStartDate)
      }
        // dayjs(booking.createdAt).isAfter(currentDate.subtract(1, 'year'))
      ) : [];
      setChartData(lastThreeMonthsData)
    }
  }, [bookingData, histogramTime]);

  const cancelledData = chartData?.filter(
    (booking) => booking.Status === "Cancelled"
  );
  const confirmedData = chartData?.filter(
    (booking) => booking.Status === "Confirmed"
  );
  const completedData = chartData?.filter(
    (booking) => booking.Status === "Completed"
  );
  const uniqueMonths = Array.from(
    new Set(
      chartData?.map((booking) =>
        dayjs(booking.createdAt).month()
      )
    )
  );
  // Group data by month
  const groupedData = {
    Cancelled: Array(uniqueMonths.length).fill(0),
    Confirmed: Array(uniqueMonths.length).fill(0),
    Completed: Array(uniqueMonths.length).fill(0),
  };


  cancelledData.forEach((booking) => {
    const monthIndex = dayjs(booking.createdAt).month();
    groupedData.Cancelled[monthIndex]++;
  });

  confirmedData.forEach((booking) => {
    const monthIndex = dayjs(booking.createdAt).month();
    groupedData.Confirmed[monthIndex]++;
  });

  completedData.forEach((booking) => {
    const monthIndex = dayjs(booking.createdAt).month();
    groupedData.Completed[monthIndex]++;
  });
  const config = {

    series: [
      {
        name: 'Completed',
        data: groupedData.Completed,
      },
      {
        name: 'Confirmed',
        data: groupedData.Confirmed,
      },
      {
        name: 'Cancelled',
        data: groupedData.Cancelled,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: Object.keys(groupedData.Completed).map((monthIndex) => {
          // Convert month index to month name (e.g., 0 -> 'Feb', 1 -> 'March', etc.)
          const monthNames = ['Jan', 'Feb', 'March', 'April', "May", 'June', 'July', "Aug", "Sep", "Oct", "Nov", "Dec"];
          return monthNames[monthIndex];
        }),
        color: ["#7A5B37", "#B78953", "#CFB08C"],
      },
      // yaxis: {
      //   title: {
      //     text: '$ (thousands)',
      //   },
      // },
      fill: {
        colors: ["#7A5B37", "#B78953", "#CFB08C"]
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      colors: ["#7A5B37", "#B78953", "#CFB08C"],
    },


  };


  return React.createElement(Chart, {
    type: "bar",
    series: config.series,
    options: config.options,

  });
  // return <Chart type="bar" series={chartData.series} options={chartData?.options?.options || {}} />;
};

export default HistogramChart2;
