import { Button, Collapse, DatePicker, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import InputField from "../../InputField";
import Loader from "../../Loader";
import SelectField from "../../SelectField";
import { useNavigate } from "react-router-dom";
import '../Inquire/module.inquire.css';
import '../../ViewAllBookingData/module.viewAllBookingData.css';

const { RangePicker } = DatePicker;

function CancelledHistory() {
    const { AllPayment, payment, newBooking, loading } = useBookingContext()
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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [customerNameFilter, setCustomerNameFilter] = useState(null);
    const [customerPhoneFilter, setCustomerPhoneFilter] = useState(null);
    const [venueFilter, setVenueFilter] = useState(null);
    const [bookingStatusFilter, setBookingStatusFilter] = useState(null);
    const [eventDate, setEventDate] = useState(null);
    useEffect(() => { AllPayment() }, [])
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }
    const columns = [
        {
            title: 'Invoice No',
            dataIndex: 'booking',
            render: (booking) => booking.inv
        },
        {
            title: 'Customer Name',
            dataIndex: 'booking',
            render: (booking) => booking.firstName,
            key: "booking"
        },
        {
            title: 'Booking Date',
            dataIndex: 'booking',
            responsive: ["xxl"],
            render: (record) => (
                <span>{formatTimestamp(record.createdAt)}</span>
            ),
        },
        {
            title: 'Event Date',
            dataIndex: 'booking',
            render: (booking) => {
                const dateParts = booking.selectedDate.split('-'); // Split the date string into parts
                const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`; // Rearrange the parts to "MM-DD-YYYY" format
                return formattedDate;
            },
        },
        {
            title: 'Venue',
            dataIndex: 'booking',
            render: (booking) => booking.venue,
        },
        {
            title: 'No of Guest',
            dataIndex: 'booking',
            responsive: ["xxl"],
            render: (booking) => booking.maxPerson,
        },
        {
            title: 'Total Amount',
            dataIndex: 'payment',
            render: (payment) => parseFloat(payment.total.toFixed(2)).toLocaleString('en-US'),
        },
        {
            title: 'Paid Amount',
            dataIndex: 'payment',
            render: (payment) => parseFloat(payment.recived.toFixed(2)).toLocaleString('en-US'),
        },
        {
            title: 'Status',
            dataIndex: 'booking',
            render: (booking) => booking?.Status,
        },
    ];
    const [customStartDate, setCustomStartDate] = useState(null)
    const [customEndDate, setCustomEndDate] = useState(null)
    const [timeRange, setTimeRange] = useState(null);
    const [range, setRange] = useState(null);
    const handleLastWeek = () => {
        // Calculate the start and end dates for last week
        // const today = new Date();
        const today = moment();
        const todays = new Date()
        const lastWeekStartDates = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate() - 7);
        const thisMonthStartDate = new Date(lastWeekStartDates.getFullYear(), lastWeekStartDates.getMonth(), lastWeekStartDates.getDate() + 6);
        // const lastWeekStartDate = today.clone().subtract(7 - today, 'days');
        // const lastWeekStartDate2 = lastWeekStartDate.clone().subtract(7, 'days');
        console.log(lastWeekStartDates);
        console.log(thisMonthStartDate);
        setCustomStartDate(lastWeekStartDates);
        setCustomEndDate(thisMonthStartDate);
        setTimeRange("Last Week");
        setRange("Last Week");
    };

    const handleThisMonth = () => {
        // Calculate the start and end dates for this month
        const today = new Date();

        const thisMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        setCustomStartDate(thisMonthStartDate);
        setCustomEndDate(today);
        setTimeRange("This Month");
        setRange("This Month");
    };
    const handleLastMonth = () => {
        // Calculate the start and end dates for last month
        const today = new Date();
        const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastmonth = new Date(lastMonthStartDate.getFullYear(), lastMonthStartDate.getMonth() - 1, 1);
        // const lastMonth = lastMonthStartDate.subtract(1, 'months')
        console.log(lastMonthStartDate);
        console.log(lastmonth);
        setCustomStartDate(lastmonth);
        setCustomEndDate(lastMonthStartDate);
        setTimeRange("Last Month");
        setRange("Last Month");
    };

    const handleLast3Months = () => {
        // Calculate the start and end dates for last 3 months
        const today = new Date();
        const last3MonthsStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastmonth = new Date(last3MonthsStartDate.getFullYear(), last3MonthsStartDate.getMonth() - 3, 1);
        console.log(lastmonth);
        setCustomStartDate(lastmonth);
        setCustomEndDate(last3MonthsStartDate);
        setTimeRange("Last 3 Months");
        setRange("Last 3 Months");
    };

    const handleLast1Year = () => {
        // Calculate the start and end dates for last 1 year
        const today = new Date();
        const last1YearStartDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const last1YearEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        console.log(last1YearStartDate, last1YearEndDate);
        setCustomStartDate(last1YearStartDate);
        setCustomEndDate(last1YearEndDate);
        setTimeRange("Last 1 Year");
        setRange("Last 1 Year");
    };
    const rangeStartDate = (range, start) => {
        switch (range) {
            case "Last Week":
                return new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7);
            case "This Month":
                return new Date(start.getFullYear(), start.getMonth(), 1);
            case "Last Month":
                return new Date(start.getFullYear(), start.getMonth() - 1, 1);
            case "Last 3 Months":
                return new Date(start.getFullYear(), start.getMonth() - 3, 1);
            case "Last 1 Year":
                return new Date(start.getFullYear() - 1, start.getMonth(), start.getDate());
            default:
                return start;
        }
    };
    const filteredData = payment?.length && payment?.map((item) => ({
        key: item.booking._id,
        booking: item.booking,
        payment: item.payment,
    }))?.filter((record) => {
        const recived = record.booking.Status === "Cancelled"
        // const recived = record.payment.recived === 0 && record.booking.Status === "Cancelled"
        const customerNameMatch = customerNameFilter
            ? record.booking.firstName.toLowerCase().includes(customerNameFilter.toLowerCase())
            : true;
        const customerPhoneMatch = customerPhoneFilter
            ? record.booking.phone.toLowerCase().includes(customerPhoneFilter.toLowerCase())
            : true;
        const venueMatch = venueFilter
            ? Array.isArray(record.booking.venue)
                ? record.booking.venue.map(e => e === venueFilter).includes(true)
                : record.booking.venue === venueFilter
            : true;
        const dateFilter =
            startDate && endDate
                ? new Date(record.booking.createdAt) >= startDate && new Date(record.booking.createdAt) <= endDate || (
                    new Date(record.booking.createdAt).toDateString &&
                    new Date(record.booking.createdAt).toDateString() === new Date(startDate).toDateString()
                )
                : true;
        const customFilter =
            customStartDate && customEndDate
                ? new Date(record.payment.createdAt) >= customStartDate && new Date(record.payment.createdAt) <= customEndDate
                : true;
        const eventDateFilter = eventDate
            ? record.booking.selectedDate === eventDate?.format('YYYY-MM-DD')
            : true;
        const timeRangeFilter =
            range === "Last Week" || range === "This Month" || range === "Last Month" || range === "Last 3 Months" || range === "Last 1 Year"
                ? rangeStartDate(range, new Date(record.createdAt))
                : true;
        return dateFilter && customerNameMatch && venueMatch && eventDateFilter && customerPhoneMatch && timeRangeFilter && recived && customFilter;
    });
    const handleClearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setEventDate(null);
        setVenueFilter(null);
        setBookingStatusFilter(null);
        setCustomerNameFilter(null);
        setCustomerPhoneFilter(null);
        // setCreateFilter(null);
        setRange(null);
        setTimeRange(null);
        setCustomEndDate(null)
        setCustomStartDate(null)
    }
    let locale = {
        emptyText: (
            <span>
                <img src={NoData
                } alt="" width={"60px"} />
                <p>No Cancellation Reports </p>
            </span>
        )
    };
    const [suggestionsCustomerName, setSuggestionsCustomerName] = useState([]);
    const handleChangeCustomerName = (event) => {
        // setFilterStoreName(event.target.value);
        const inputCustomerName = event.target.value;
        setCustomerNameFilter(inputCustomerName);

        if (inputCustomerName !== "") {
            const uniqueSuggestions = Array.from(
                new Set(
                    newBooking
                        .map((row) => row.firstName)
                        .filter((customerName) =>
                            customerName.toLowerCase().includes(inputCustomerName.toLowerCase())
                        )
                )
            );
            setSuggestionsCustomerName(uniqueSuggestions);
        } else {
            setSuggestionsCustomerName([]);
        }
    };
    const handleSuggestionCustomerNameClick = (suggestion) => {
        setCustomerNameFilter(suggestion);
        setSuggestionsCustomerName([]);
    };
    const getVenuesOptions = () => {
        // Assuming `newBooking` is an array of booking objects
        const venues = newBooking?.flatMap((booking) => Array.isArray(booking.venue)
            ? booking.venue
            : [booking.venue]);

        // Use Set to get unique venues
        const uniqueVenuesSet = new Set(venues);

        const options = Array.from(uniqueVenuesSet).map((venue) => ({
            label: venue,
            value: venue,
        }));

        return options;
    };
    return (
        <div style={{ padding: "20px" }}>
            {loading ? <Loader /> : <></>}
            <Collapse
                style={{ marginBottom: "10px", fontFamily: "poppins" }}
                size="small"
                items={[{
                    key: '1', label: 'Filters', children: <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: "32%" }}>
                            <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Booking Date"}</label>
                            <RangePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(dates) => {
                                setStartDate(dates ? dates[0] : null);
                                setEndDate(dates ? dates[1] : null);
                            }}
                                value={[startDate, endDate]}
                                disabledDate={(current) => current && current.valueOf() > moment().endOf('day')} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: "32%" }}>
                            <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Event Date"}</label>
                            <DatePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(date) => setEventDate(date)} value={eventDate} />
                        </div>
                        <div style={{ width: "32%" }}>

                            <InputField
                                showSearch={true}
                                value={customerNameFilter}
                                label={"Customer Name"}
                                width={"100%"}
                                placeholder="Customer Name"
                                onChange={handleChangeCustomerName}
                            />
                            {suggestionsCustomerName.length > 0 && (
                                <ul className="list-suggest">
                                    {suggestionsCustomerName.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            className="suggest-list-li"
                                            onClick={() => handleSuggestionCustomerNameClick(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", width: "67%" }}>
                            <InputField
                                label={"Customer Mobile No."}
                                width={"48%"}
                                placeholder={"Customer Mobile No."}
                                onChange={(value) => setCustomerPhoneFilter(value.target.value)}
                                value={customerPhoneFilter}
                                type={"Number"}
                            // options={nameMap}
                            />
                            <SelectField
                                label={"Venue"}
                                style={{
                                    width: "100%",
                                    marginBottom: 15,
                                    borderColor: "#b78953 !important",
                                    backgroundColor: "#fff !important"
                                }}
                                placeholder="Venue"
                                options={getVenuesOptions()}
                                width={"48%"}
                                value={venueFilter}
                                onChange={(event, index) => {
                                    setVenueFilter(event);
                                }}
                                className="checkColor"

                            />
                        </div>

                        <div style={{ display: "flex", gap: 15 , flexWrap: "wrap", width: "100%", marginTop: 8, marginBottom: 23 }}>
                            <Button type="primary" className="buttonHover" onClick={handleLastWeek} style={{ background: timeRange === "Last Week" ? "#b78953" : "#73787c" }}>Last Week</Button>
                            <Button type="primary" className="buttonHover" onClick={handleThisMonth} style={{ background: timeRange === "This Month" ? "#b78953" : "#73787c" }}>This Month</Button>
                            <Button type="primary" className="buttonHover" onClick={handleLastMonth} style={{ background: timeRange === "Last Month" ? "#b78953" : "#73787c" }}>Last Month</Button>
                            <Button type="primary" className="buttonHover" onClick={handleLast3Months} style={{ background: timeRange === "Last 3 Months" ? "#b78953" : "#73787c" }}>Last 3 Month</Button>
                            <Button type="primary" className="buttonHover" onClick={handleLast1Year} style={{ background: timeRange === "Last 1 Year" ? "#b78953" : "#73787c" }}>Last 1 Year</Button>

                        </div>
                        <div style={{ display: "flex", justifyContent: "right", flexWrap: "wrap", width: "100%" }}>

                            <Button onClick={() => handleClearFilter()} type="primary" className="buttonHover" style={{ background: "#73787c" }} >Clear Filter</Button>
                        </div>
                    </div>
                }]}
            />
            <Table style={{ width: "100%" }} columns={columns} dataSource={filteredData} pagination={{ style: { color: "#b78953" } }} locale={locale} />

        </div >
    )
}
export default CancelledHistory