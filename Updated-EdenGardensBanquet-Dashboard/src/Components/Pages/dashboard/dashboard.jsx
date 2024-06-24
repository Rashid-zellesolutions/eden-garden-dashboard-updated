import { Button, Dropdown, Menu, Space } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useBookingContext } from "../../../Context/BookingContext";
import all from '../../../assets/all.png';
import confirm from '../../../assets/confirm.png';
import remove from '../../../assets/remove.png';
import tasks from '../../../assets/tasks.png';
import why from '../../../assets/why.png';
import DougnutChart from "../../../chart/DougnutChart";
import LineChart from "../../../chart/LineChart";
import HistogramChart2 from "../../../chart/histChart2";
import SelectField from "../../SelectField";
import CalendarModal1 from "./components/checkSlot";
import SaleCummulation from "./components/salesCummulation";
import DashboardTab from "./components/tabs";
import TodayEvents from "./components/todaysEvent";
import { AppstoreAddOutlined, DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import './dashboard.css';
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import NoView from "./components/NoView";

function Dashboard() {
    const { fetchData, newBooking, OldBooking, oldBooking, GetAllRefund, refund, AllPayment, payment, allVenues, GetAllVenues, loading } = useBookingContext()
    const [venue, setVenue] = useState([])
    const [selectedSlot, setSelectedSlot] = useState([])
    const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()))
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [refundAmount, setRefundAmount] = useState();
    const [receivedTotalAmount, setReceviedTotalAmount] = useState();
    const [balnaceAmount, setBalanceAmount] = useState();
    const [selectedTimeRange, setSelectedTimeRange] = useState('last7days');
    const [selectedMonthData, setSelectedMonthData] = useState({});
    const [dountData, setDountData] = useState([]);
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    useEffect(() => {
        fetchData()
        OldBooking()
        GetAllRefund()
        AllPayment()
        GetAllVenues()
    }, [])
    useEffect(() => {
        if (refund.length && payment.length) {
            let totalRefund = 0;
            let totalReceived = 0;
            let totalBalance = 0;

            if (selectedTimeRange === 'last7days') {
                // setSelectedTimeRange(TimeRange)
                const startDate = dayjs().subtract(7, 'days');
                refund.forEach(element => {
                    if (dayjs(element.Refund?.createdAt).isAfter(startDate) && dayjs(element.Refund?.createdAt).isBefore(dayjs())) {
                        totalRefund += element.Refund?.refundAmount || 0;
                    }
                });
                payment.forEach(element => {
                    if (dayjs(element.payment?.createdAt).isAfter(startDate) && dayjs(element.payment?.createdAt).isBefore(dayjs())) {
                        totalReceived += element.payment?.recived || 0;
                        totalBalance += element.payment?.balance || 0;
                    }
                });
            } else if (selectedTimeRange === 'last30days') {
                // setSelectedTimeRange(last30days)
                const startDate = dayjs().subtract(30, 'days');
                refund.forEach(element => {
                    if (dayjs(element.Refund?.createdAt).isAfter(startDate)) {
                        totalRefund += element.Refund?.refundAmount || 0;
                    }
                });
                payment.forEach(element => {
                    if (dayjs(element.payment?.createdAt).isAfter(startDate)) {
                        totalReceived += element.payment?.recived || 0;
                        totalBalance += element.payment?.balance || 0;
                    }
                });
            } else {
                // Default to current date
                setSelectedTimeRange("")
                refund.forEach(element => {
                    totalRefund += element.Refund?.refundAmount || 0;
                });
                payment.forEach(element => {
                    totalReceived += element.payment?.recived || 0;
                    totalBalance += element.payment?.balance || 0;
                });
            }

            setRefundAmount(totalRefund.toFixed(2));
            setReceviedTotalAmount(totalReceived.toFixed(2));
            setBalanceAmount(totalBalance.toFixed(2));
        }
    }, [refund.length, payment.length, selectedTimeRange])
    // console.log(sum);
    const targetRef = useRef();
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    const props = {
        data,
        xField: 'year',
        yField: 'value',
        label: {

            style: { fill: 'red' },
        },

        colorField: 'type', // or seriesField in some cases
        color: ['blue', 'green'],
    };
    useEffect(() => {
        const upcomingEventsFiltered = newBooking
            ?.filter((e) => e.Status === "Confirmed")
            ?.filter((event) => dayjs(event.selectedDate).isSame(dayjs(), 'day') || dayjs(event.selectedDate).isAfter(dayjs(), 'day'))
            ?.sort((a, b) => dayjs(a.selectedDate) - dayjs(b.selectedDate))
            ?.slice(0, 3);
        setUpcomingEvents(upcomingEventsFiltered);
        let dountFilter = newBooking.filter(e => e.Status !== "Cancelled")
    }, [newBooking]);
    // ... (existing code)

    useEffect(() => {
        const dailyData = {};

        refund?.forEach(element => {
            const dateKey = dayjs(element.Refund?.createdAt).format("YYYY-MM-DD");

            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    received: 0,
                    refunded: 0,
                    balance: 0,
                };
            }

            dailyData[dateKey].refunded += element.Refund?.refundAmount || 0;
        });

        payment.length && payment?.forEach(element => {
            const dateKey = dayjs(element.payment?.createdAt).format("YYYY-MM-DD");

            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    received: 0,
                    refunded: 0,
                    balance: 0,
                };
            }

            dailyData[dateKey].received += element.payment?.recived || 0;
            dailyData[dateKey].balance += element.payment?.balance || 0;
        });

        const dates = Object.keys(dailyData);
        if (selectedTimeRange === 'last7days') {
            // Fill missing dates with zero values
            const startDate = dayjs().startOf('month');
            const endDate = dayjs().endOf('month');
            const allDates = [];
            let currentDate = startDate;

            while (currentDate.isBefore(endDate, 'day')) {
                allDates?.push(currentDate.format("YYYY-MM-DD"));
                currentDate = currentDate.add(1, 'day');
            }
            console.log(currentDate);

            const filledDailyData = allDates.map(date => ({
                date,
                refunded: dailyData[date]?.refunded || 0,
                received: dailyData[date]?.received || 0,
                balance: dailyData[date]?.balance || 0,
            }));
            // ...

            const filteredDailyData = filledDailyData.filter(data => {
                const date = dayjs(data.date);
                const startDateLast7Days = dayjs().subtract(7, 'days');
                const startDateLast7 = startDateLast7Days.subtract(7, 'days');
                // console.log(date);
                return date.isAfter(startDateLast7) && date.isBefore(startDateLast7Days);

            });
            setSelectedMonthData({
                categories: filteredDailyData?.map(data => data.date),
                series: [
                    {
                        name: "Received Amount",
                        data: filteredDailyData?.map(data => data.received.toFixed(2)),
                    },
                    {
                        name: "Refund Amount",
                        data: filteredDailyData?.map(data => data.refunded.toFixed(2)),
                    },
                    {
                        name: "Balance Amount",
                        data: filteredDailyData?.map(data => data.balance.toFixed(2)),
                    },
                ],
            });
        }
        else if (selectedTimeRange === 'last30days') {
            const today = new Date();
            const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastmonth = new Date(lastMonthStartDate.getFullYear(), lastMonthStartDate.getMonth() - 1, 1);
            const allDates = [];
            let currentDate = dayjs(lastmonth);

            while (currentDate.isBefore(lastMonthStartDate, 'day')) {
                allDates?.push(currentDate.format("YYYY-MM-DD"));
                currentDate = currentDate.add(1, 'day');
            }
            // console.log(currentDate);

            const filledDailyData = allDates.map(date => ({
                date,
                refunded: dailyData[date]?.refunded || 0,
                received: dailyData[date]?.received || 0,
                balance: dailyData[date]?.balance || 0,
            }));
            // ...

            const filteredDailyData = filledDailyData.filter(data => {
                const date = dayjs(data.date);
                // Modify the condition to include data for the last 30 days
                const startDateLast30Days = dayjs().subtract(30, 'days').startOf('day');
                const endDateLast30Days = dayjs().startOf('day');

                if (dayjs().month() === 1) { // February is month index 1
                    const startDateJanuary = dayjs().subtract(1, 'month').startOf('month');
                    return (date.isAfter(startDateJanuary) && date.isBefore(endDateLast30Days));
                } else {
                    return date.isAfter(startDateLast30Days) && date.isBefore(endDateLast30Days);
                }
            });


            setSelectedMonthData({
                categories: filteredDailyData?.map(data => data.date),
                series: [
                    {
                        name: "Received Amount",
                        data: filteredDailyData?.map(data => data.received.toFixed(2)),
                    },
                    {
                        name: "Refund Amount",
                        data: filteredDailyData?.map(data => data.refunded.toFixed(2)),
                    },
                    {
                        name: "Balance Amount",
                        data: filteredDailyData?.map(data => data.balance.toFixed(2)),
                    },
                ],
            });
        }
    }, [refund.length, payment.length, selectedDate, selectedTimeRange]);
    const [dountTime, setDountTime] = useState("7Day")
    useEffect(() => {
        if (dountTime === "7Day") {

            const filteredNewBookings = newBooking.filter((booking) => {
                const bookingDate = dayjs(booking.createdAt);
                const startDate = dayjs().subtract(7, 'days'); // Adjust as needed
                const endDate = startDate.subtract(7, 'day');
                // console.log(startDate, endDate);
                return bookingDate.isAfter(endDate) && bookingDate.isBefore(startDate);
            });

            const venueCounts = filteredNewBookings
                .filter((e) => e.Status !== "Cancelled")
                .reduce((counts, booking) => {
                    const venue = booking.venue[0] || "Unknown Venue";
                    counts[venue] = (counts[venue] || 0) + 1;
                    return counts;
                }, {});

            // Calculate the total count of venues
            const totalVenues = Object.values(venueCounts).reduce((total, count) => total + count, 0);

            // Calculate the percentage for each venue
            const venuePercentages = Object.entries(venueCounts).map(([venue, count]) => ({
                venue,
                percentage: Math.round((count / totalVenues) * 100),
            }));
            setDountData(venuePercentages || []);
        } else if (dountTime === "30Day") {
            const today = new Date();
            const filteredNewBookings = newBooking.filter((booking) => {
                const bookingDate = dayjs(booking.createdAt);
                const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastmonth = new Date(lastMonthStartDate.getFullYear(), lastMonthStartDate.getMonth() - 1, 1);
                // console.log(lastmonth, lastMonthStartDate);
                return bookingDate.isAfter(lastmonth) && bookingDate.isBefore(lastMonthStartDate)
            });

            const venueCounts = filteredNewBookings
                .filter((e) => e.Status !== "Cancelled")
                .reduce((counts, booking) => {
                    const venue = booking.venue[0] || "Unknown Venue";
                    counts[venue] = (counts[venue] || 0) + 1;
                    return counts;
                }, {});

            // Calculate the total count of venues
            const totalVenues = Object.values(venueCounts).reduce((total, count) => total + count, 0);

            // Calculate the percentage for each venue
            const venuePercentages = Object.entries(venueCounts).map(([venue, count]) => ({
                venue,
                percentage: Math.round((count / totalVenues) * 100),
            }));
            setDountData(venuePercentages || []);
        }

    }, [newBooking, dountTime]);
    const [histogramTime, setHistogramTime] = useState("3Month")
    const handleMenuClick = (action) => {

        if (action === '7Day') {
            setDountTime(action)
        } else if (action === '30Day') {
            setDountTime("30Day")
        }
    }
    const handlHistogramMenuClick = (action) => {
        if (action === '3Month') {
            setHistogramTime("3Month")
        }
        else if (action === '6Month') {
            setHistogramTime("6Month")
        } else if (action === '1Year') {
            setHistogramTime("1Year")
        }
    }
    const menu = () => (
        <Menu onClick={({ key }) => handleMenuClick(key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>
            <Menu.Item key="7Day" >
                Last 7 Days
            </Menu.Item>
            <Menu.Item key="30Day" >
                Last 30 Days
            </Menu.Item>
        </Menu>
    )
    const histogramFilterMenu = () => (
        <Menu onClick={({ key }) => handlHistogramMenuClick(key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>
            <Menu.Item key="3Month" >
                Last 3 Month
            </Menu.Item>
            <Menu.Item key="6Month" >
                Last 6 Month
            </Menu.Item>
            <Menu.Item key="1Year" >
                Last 1 Year
            </Menu.Item>
        </Menu>
    )

    return loading ? <Loader /> : <>

        {/* <Invoice/> */}
        <div style={{ height: '15px' }}></div>
        {/* Tabs Div */}
        <div className="upperTabs">
            <DashboardTab heading={'All Bookings'} image={all} value={newBooking?.length} unit={newBooking?.length >= 2 ? 'bookings' : "booking"} />
            <DashboardTab heading={'Total Inquiries'} image={why} value={oldBooking?.length} unit={oldBooking?.length >= 2 ? 'inquiries' : 'inquiry'} />
            <DashboardTab heading={'Confirmed Events'} image={confirm} value={newBooking.filter(e => e.Status === "Confirmed")?.length} unit={newBooking.filter(e => e.Status === "Confirmed")?.length >= 2 ? 'events' : "event"} />
            <DashboardTab heading={'Cancelled Events'} image={remove} value={newBooking.filter(e => e.Status === "Cancelled").length} unit={newBooking.filter(e => e.Status === "Cancelled").length >= 2 ? 'events' : 'event'} />
            <DashboardTab heading={'Completed Events'} image={tasks} value={newBooking.filter(e => e.Status === "Completed").length} unit={newBooking.filter(e => e.Status === "Completed").length >= 2 ? 'events' : 'event'} />
        </div>

        {/* Upcoming Events and availablility Div */}
        <div style={{ height: '30px' }}></div>
        <div style={{ display: "flex", justifyContent: 'flex-start', margin: '0px 20px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'flex-start'

            }}>
                <div style={{ display: 'flex' }}>
                    <div className="mainHeadingDB">
                        <div>

                            <h1>Upcoming Events</h1>
                            <div style={{
                                width: '70px'
                            }} className="dividerDB" ></div>
                        </div>
                        {/* </div> */}
                        {/* <div> */}
                        <div style={{
                            borderRadius: '12px',
                            border: '1px solid #B78953',
                            marginLeft: '10px',
                            height: "32px",
                        }}>
                            <p style={{ color: 'grey', fontWeight: 'bold', fontSize: '12px', padding: '5px' }}>3 Events</p>
                        </div>
                    </div>
                </div>
                <div style={{ height: '12px' }}></div>
                <p style={{ color: 'grey' }}>This Tab is showing Coming 3 events</p>
                <div style={{ height: '20px' }}></div>

                <TodayEvents upcomingEvents={upcomingEvents} />

            </div>
            {/* <div style={{ width: '30px' }}></div> */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'flex-start',
                marginLeft: '10px',
            }}>
                <div className="select-div" style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <div className="mainHeadingDB">
                        <div>

                            <h1>Check Availability</h1>
                            <div style={{
                                width: '70px'
                            }} className="dividerDB" ></div>
                        </div>
                    </div>
                    <div style={{ height: '5px' }}></div>
                    <div className="select-vanue-div" >
                        <SelectField label={""} placeholder={"Select Venue"}
                            // options={[
                            //     { value: 'Ruby + Emerald', label: 'Ruby + Emerald ' },
                            //     { value: 'Emerald', label: 'Emerald ' },
                            //     { value: 'Diamond', label: 'Diamond ' },
                            //     { value: 'Ruby', label: 'Ruby ' },
                            // ]}
                            options={allVenues?.map(cat => ({ label: cat.name, value: cat.name }))} width={"100%"} value={venue} onChange={(e) => setVenue([e])} />
                    </div>
                </div>
                <div style={{
                    // height:'230px',
                    // width:'400px',
                    marginTop: '-10px'
                }}>
                    <CalendarModal1 venue={venue} selectedSlot={selectedSlot} selectedDate={selectedDate} setSelectedSlot={setSelectedSlot} setVenue={setVenue} setSelectedDate={setSelectedDate} />
                    {/* <DougnutChart2/> */}
                </div>
            </div>
        </div>


        {/* Sales and PAment Div */}
        <div style={{ height: '30px' }}></div>
        {userData.role === "Supervisor" && <NoView />}
        {
            userData.role === "Supervisor" ?
                <>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: "flex", justifyContent: 'flex-start', margin: '20px 20px' }} className="mainHeadingDB">

                            <div>
                                <h1>Sales & Payments</h1>
                                <div style={{
                                    width: '70px'
                                }} className="dividerDB" ></div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '20px',
                            marginRight: '20px'
                        }}>
                            <p style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#353E49',
                                marginBottom: '10px'
                            }}>Apply Filters</p>
                            <div style={{ display: 'flex' }}>
                                <Button
                                    type="dashed"
                                    block
                                    style={{ width: 180, }}
                                    className={selectedTimeRange === "last7days" ? "selectedRange" : 'add-more'}
                                // onClick={() => setSelectedTimeRange('last7days')}

                                >
                                    Last 7 Days
                                </Button>
                                <div style={{ width: '20px' }}></div>
                                <Button
                                    type="dashed"
                                    // onClick={() => setSelectedTimeRange('last30days')}
                                    block
                                    style={{ width: 180, }}
                                    className={selectedTimeRange === "last30days" ? "selectedRange" : 'add-more'}

                                >
                                    Last 30 Days
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        height: '30px'
                    }}></div>
                    <SaleCummulation refundAmount={0} receivedTotalAmount={0} balnaceAmount={0} />
                    <div style={{
                        height: '30px'
                    }}></div>
                    <LineChart categories={[0, 0, 0, 0, 0, 0]}
                        series={[0, 0, 0, 0, 0, 0]} />
                </>
                :
                <>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: "flex", justifyContent: 'flex-start', margin: '20px 20px' }} className="mainHeadingDB">

                            <div>
                                <h1>Sales & Payments</h1>
                                <div style={{
                                    width: '70px'
                                }} className="dividerDB" ></div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '20px',
                            marginRight: '20px'
                        }}>
                            <p style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#353E49',
                                marginBottom: '10px'
                            }}>Apply Filters</p>
                            <div style={{ display: 'flex' }}>
                                <Button
                                    type="dashed"
                                    block
                                    style={{ width: 180, }}
                                    className={selectedTimeRange === "last7days" ? "selectedRange" : 'add-more'}
                                    onClick={() => setSelectedTimeRange('last7days')}

                                >
                                    Last 7 Days
                                </Button>
                                <div style={{ width: '20px' }}></div>
                                <Button
                                    type="dashed"
                                    onClick={() => setSelectedTimeRange('last30days')}
                                    block
                                    style={{ width: 180, }}
                                    className={selectedTimeRange === "last30days" ? "selectedRange" : 'add-more'}

                                >
                                    Last 30 Days
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        height: '30px'
                    }}></div>
                    <SaleCummulation refundAmount={refundAmount} receivedTotalAmount={receivedTotalAmount} balnaceAmount={balnaceAmount} />
                    <div style={{
                        height: '30px'
                    }}></div>
                    <LineChart categories={selectedMonthData?.categories || []}
                        series={selectedMonthData?.series || []} />
                </>
        }

        
        {/* value Catagories */}
        <div style={{ display: "flex", justifyContent: 'flex-start', width: '100%', padding: 25, gap: 15 }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                padding: "15px",
                borderRadius: '10px',
                width: '40%'
            }}>
                <div className="mainHeadingDB" style={{ justifyContent: "space-between"  }}>
                    <div>
                        <h1>Venue Categorization</h1>
                        <div style={{
                            width: '70px'
                        }} className="dividerDB" ></div>
                    </div>
                    <div style={{ display: 'flex' }}>
                    <Dropdown overlay={() => menu()} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ backgroundColor: "#b78953 !important" }}>
                        {/* <EllipsisOutlined style={{ cursor: "pointer" }} size={45} /> */}
                        <Space size={24} style={{ cursor: "pointer" }}>
                            {dountTime ? dountTime === "7Day" ? "Last 7 Days" : "Last 30 Days" : "Apply Filter"}
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                     </div>
                </div>

                <div style={{
                    height: 'auto',
                    width: '300px',
                    margin: 'auto',

                }}>

                    <DougnutChart venueCounts={dountData || []} />
                </div>
            </div>
            {/* <div style={{ width: '50px' }}></div> */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                alignItems: 'start',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                padding: "15px 15px 25px 15px",
                borderRadius: '10px'
            }}>
                <div className="mainHeadingDB">
                    <div>
                        <h1>Bookings Status Categorization</h1>
                        <div style={{
                            width: '70px'
                        }} className="dividerDB" ></div>
                    </div>
                    <Dropdown overlay={() => histogramFilterMenu()} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ backgroundColor: "#b78953 !important" }}>
                        
                        <Space size={24} style={{ cursor: "pointer" }}>
                            {histogramTime ? histogramTime === "3Month" ? "Last 3 Month" : histogramTime === "6Month" ? "Last 6 Month" : "Last 1 Year" : " Apply Filter"}
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <div className="histogramChart2" style={{
                    height: 'auto',
                    width: '100%',
                }}>

                    <HistogramChart2 bookingData={newBooking} histogramTime={histogramTime} />
                </div>
            </div>

        </div>
    </>
}

export default Dashboard;