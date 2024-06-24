import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Collapse, DatePicker, Dropdown, Menu, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import { Url } from "../../../env";
import ErrorPopup from "../../ErrorPopup";
import Loader from "../../Loader";
import SelectField from "../../SelectField";
import SuccessPopup from "../../SuccessPopup";
import './module.inquire.css';
import '../../ViewAllBookingData/module.viewAllBookingData.css';

const { RangePicker } = DatePicker;
function Inquire() {
    const navigate = useNavigate()
    const { booking, loading, Canceled, oldBooking, setOldBooking, OldBooking } = useBookingContext();
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
        OldBooking()
    }, [])
    const [bookingStatusFilter, setBookingStatusFilter] = useState(null);
    const [venueFilter, setVenueFilter] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [eventDate, setEventDate] = useState(null);
    const [customDateFilter, setCustomDateFilter] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        // if (successPopupMessage === "Booking Add Successfully") {
        // window.location.reload()
        // return
        // }
        // navigate("/Booking/all-booking")
    }
    const handleMenuClick = (record, action) => {
        if (action === 'delete') {
            // Canceled(record)
            CancelEdit(record)
            console.log(record);
        } else if (action === 'edit') {
            navigate("/Booking/add-booking", { state: record })
        }
    };
    const menu = (record) => {
        if (record.Status === "Cancelled") {
            return null; // Don't show menu for cancelled bookings
        }

        return (
            <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>
                <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
                    Edit
                </Menu.Item>
                <Menu.Item key="delete" icon={<IoIosRemoveCircle style={{ fontSize: "18px" }} />}>
                    Cancel
                </Menu.Item>
            </Menu>
        );
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
                              `${date.getDate().toString().padStart(2, '0')}-` +
                              `${date.getFullYear()}`;
        return formattedDate;
    }
    

    const CancelEdit = (data) => {
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            zip: data.zip,
            city: data.city,
            state: data.state,
            venue: data.venue,
            selectedDate: data.formatTime,
            selectedSlot: data.selectedSlot,
            eventType: data.eventType,
            minPerson: data.minPerson,
            maxPerson: data.maxPerson,
            Status: "Cancelled",
            createAt: "Abdul Sami",
            updated: "Abdul Sami"
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}Booking/Edit/${data?._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // const resultMap
                if (result && result.updatedBooking) {
                    setSuccessPopupMessage("Inquiries Status Change Successfully")
                    setSuccessPopupOpen(true)
                    setOldBooking((prevBooking) =>
                        prevBooking.map((booking) =>
                            booking._id === data._id ? result.updatedBooking : booking
                        )
                    );


                } else {
                    console.error("Invalid response format");
                    setErrorPopupOpen(true)
                    setErrorPopupMessage("Error in response format");
                }
                // setLoader(false)
            })
            .catch((err) => {
                setErrorPopupOpen(true)
                setErrorPopupMessage("Something Went Wrong");
            })
    }
    const columns = [
        // {
        //     title: 'Booking Id',
        //     dataIndex: 'bookingId',
        //     render: (text, record) => (
        //         <span>{record.bookingId || record.BookingId}</span>
        //     ),
        // },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            responsive: ["xxl"],
            render: (text, record) => (
                <span>{formatTimestamp(record.createdAt)}</span>
            ),
            showOnResponse: false,
            showOnDesktop: true
            // responsive:["xs","sm"],
        },
        {
            title: 'Id',
            dataIndex: 'fullName', // Use a custom dataIndex for concatenated name
            // responsive: ["sm"],
            render: (text, record) => (
                <span>{record.BookingId}</span>
            ),
        },
        {
            title: 'Name',
            // responsive: ['sm', 'lg'],
            dataIndex: 'fullName', // Use a custom dataIndex for concatenated name
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            ),
        },
        
        
        {
            title: 'Email',
            dataIndex: 'email',
            // responsive: ["lg"]
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            responsive: ["lg"]
        },
        {
            title: 'Venue',
            dataIndex: 'venue',
            responsive: ["lg"],
            render: (text, record) => {
                if (Array.isArray(record.venue)) {
                    return record.venue?.map((e, i) => (<div key={i} style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: "600"}}>{e}</span></div>))
                } else {
                    return (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "600" }}>{record.venue}</span>
                        </div>
                    );
                }
                // <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: "600" }}>{record.venue}</span></div>

            },
        },
        {
            title: 'Event Date',
            responsive: ["xl"],
            dataIndex: 'selectedDate',
            render: (text, record) => {
                if (Array.isArray(record.selectedDate)) {
                    return record.selectedDate.map((e, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "600" }}>{formatDate(e)}</span>
                        </div>
                    ));
                } else {
                    return (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "600" }}>{formatDate(record.selectedDate)}</span>
                        </div>
                    );
                }
            },
        },

        {
            title: 'Status',
            dataIndex: 'Status',
            responsive: ["lg"]
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // responsive: ["lg"],
            render: (text, record) => record.Status === "Cancelled" ?
                <div style={{ boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px" }} >
                    <EllipsisOutlined size={45} />
                </div> : (
                    <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "13%", backgroundColor: "#b78953 !important" }}>
                        <div style={{ boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px" }}>

                            <EllipsisOutlined size={45} />
                        </div>
                    </Dropdown>
                ),
        },
    ];
    const [range, setRange] = useState(null);
    const [customStartDate, setCustomStartDate] = useState(null)
    const [customEndDate, setCustomEndDate] = useState(null)
    const [timeRange, setTimeRange] = useState(null);

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
    const handleLast1Year = () => {
        const today = new Date();
        const last1YearStartDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const last1YearEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        console.log(last1YearStartDate, last1YearEndDate);
        setCustomStartDate(last1YearStartDate);
        setCustomEndDate(last1YearEndDate);
        setTimeRange("Last 1 Year");
        setRange("Last 1 Year");
    };
    const applyCustomDateRangeFilter = (recordDate, customDateFilter) => {
        const currentDate = new Date();
        switch (customDateFilter) {
            case "1week":
                return currentDate - new Date(recordDate) <= 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
            case "1month":
                const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                return new Date(recordDate) >= firstDayOfCurrentMonth;
            case "thisYear":
                console.log(new Date(recordDate).getFullYear() === currentDate.getFullYear());
                return new Date(recordDate).getFullYear() === currentDate.getFullYear();
            default:
                return true;
        }
    };
    const filteredData = oldBooking.filter((record) => {
        // Apply filters based on state values
        const statusFilter = bookingStatusFilter ? record.Status.toLowerCase().includes(bookingStatusFilter.toLowerCase()) : true;
        const nameFilter = venueFilter
            ? Array.isArray(record.venue)
                ? record.venue.map(e => e === venueFilter)
                : record.venue === venueFilter
            : true;


        // const dateFilter =
        //     startDate && endDate
        //         ? new Date(record.createdAt) >= startDate && new Date(record.createdAt) <= endDate
        //         : true;
        const dateFilter =
            startDate && endDate
                ? (
                    new Date(record.createdAt) >= startDate &&
                    new Date(record.createdAt) <= endDate
                ) || (
                    new Date(record.createdAt).toDateString &&
                    new Date(record.createdAt).toDateString() === new Date(startDate).toDateString()
                )
                : true;
        const statusOpenFilter = record.Status.toLowerCase() === 'opened' || record.Status.toLowerCase() === 'cancelled';
        const eventDateFilter = eventDate
            ? record.selectedDate === eventDate?.format('YYYY-MM-DD')
            : true;
        const customDateRangeFilter = customDateFilter
            ? applyCustomDateRangeFilter(record.createdAt, customDateFilter)
            : true;
        const customFilter =
            customStartDate && customEndDate
                ? new Date(record.createdAt) >= customStartDate && new Date(record.createdAt) <= customEndDate
                : true;
        return nameFilter && dateFilter && customDateRangeFilter && statusOpenFilter && eventDateFilter && statusFilter && customFilter;
    });
    const handleClearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setEventDate(null);
        setVenueFilter(null);
        setBookingStatusFilter(null);
        setCustomDateFilter(null)
        setRange(null);
        setTimeRange(null);
        setCustomEndDate(null)
        setCustomStartDate(null)
    }
    const getVenuesOptions = () => {
        // Assuming `newBooking` is an array of booking objects
        const venues = oldBooking?.map((booking) => booking.venue);
        // Use Set to get unique customer names
        const uniqueVenues = [...new Set(venues)];
        const options = uniqueVenues.map((name) => ({
            label: name,
            value: name,
        }));

        return options;

    };

    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Inquiry </p>
            </span>
        )
    };
    return (
        <div style={{ padding: "20px" }}>
            {loading ? <Loader /> : <>
                <Collapse
                    style={{ marginBottom: "10px", fontFamily: "poppins", fontWeight: "600" }}
                    size="small"
                    items={[{
                        key: '1', label: 'Filters', children: <div>
                            <div style={{ display: "flex", flexDirection: 'column', width: '100%' }}>
                                <div style={{width: '100%', display: 'flex', gap: 15, alignItems: 'center'}}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: "25%" }}>
                                        <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c"  }}>{"Booking Date"}</label>
                                        <RangePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(dates) => {
                                            setStartDate(dates ? dates[0] : null);
                                            setEndDate(dates ? dates[1] : null);
                                        }} disabledDate={(current) => current && current.valueOf() > moment().endOf('day')} value={[startDate, endDate]} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: "25%" }}>
                                        <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Event Date"}</label>
                                        <DatePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(date) => setEventDate(date)} value={eventDate} />
                                    </div>
                                    <SelectField
                                        label={"Venue"}
                                        style={{
                                            width: "100%",
                                            marginBottom: 15,
                                            borderColor: "#b78953 !important",
                                            backgroundColor: "#fff !important",
                                            height: 35
                                        }}
                                        placeholder="Venue"
                                        // options={[
                                        //     { value: 'Ruby + Emerald', label: 'Ruby + Emerald ' },
                                        //     { value: 'Emerald', label: 'Emerald ' },
                                        //     { value: 'Diamond', label: 'Diamond ' },
                                        //     { value: 'Ruby', label: 'Ruby ' },
                                        // ]}
                                        options={getVenuesOptions()}
                                        width={"25%"}
                                        value={venueFilter}
                                        onChange={(event, index) => {
                                            setVenueFilter(event);
                                        }}
                                        className="checkColor"

                                    />
                                    {/* <InputField
                                        label={"Venue"}
                                        width={"32%"}
                                        placeholder={"Venue"}
                                        onChange={(value) => setVenueFilter(value.target.value)}
                                        value={venueFilter}
                                    /> */}
                                    <SelectField showSearch={false}
                                        value={bookingStatusFilter}
                                        label={"Booking Status"}
                                        width={"25%"}
                                        // height={"35"}
                                        placeholder="Booking Status"
                                        onChange={(value) => setBookingStatusFilter(value)}
                                        options={[
                                            // { label: "Opened", value: "Opened" },
                                            { label: "Opened", value: "Opened" },
                                            { label: "Cancelled", value: "Cancelled" },]}
                                    >

                                    </SelectField>
                                </div>
                                <div style={{ display: "flex", gap: 15, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>

                                    <Button type="primary" className="buttonHover" onClick={handleLastWeek} style={{ background: timeRange === "Last Week" ? "#b78953" : "#73787c" }}>Last Week</Button>
                                    <Button type="primary" className="buttonHover" onClick={handleThisMonth} style={{ background: timeRange === "This Month" ? "#b78953" : "#73787c" }}>This Month</Button>
                                    <Button type="primary" className="buttonHover" onClick={handleLast1Year} style={{ background: timeRange === "Last 1 Year" ? "#b78953" : "#73787c" }}>Last 1 Year</Button>
                                    {/* <SelectField
                                        showSearch={false}
                                        label={"Select Custom"}
                                        width={"48.5%"}
                                        placeholder="Select Custom"
                                        options={[
                                            { label: "1 Week", value: "1week" },
                                            { label: "1 Month", value: "1month" },
                                            { label: "This Year", value: "thisYear" }
                                        ]}
                                        onChange={(value) => setCustomDateFilter(value)}
                                        value={customDateFilter}
                                    ></SelectField> */}
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "right", flexWrap: "wrap", width: "100%" }}>

                                <Button onClick={() => handleClearFilter()} type="primary" className="buttonHover" style={{ background: "#73787c" }} >Clear Filter</Button>
                            </div>
                        </div>
                    }]}
                />
                <Table columns={columns} dataSource={filteredData} locale={locale} mobileBreakPoint={1250} />

            </>
            }
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div >
    );
}
export default Inquire