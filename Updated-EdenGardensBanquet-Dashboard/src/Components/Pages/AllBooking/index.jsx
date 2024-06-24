import { AppstoreAddOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Collapse, DatePicker, Dropdown, Menu, Table } from "antd";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from "moment";
import { useEffect, useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuView } from "react-icons/lu";
import { MdOutlinePageview } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { TiCancel } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import CancelModal from "../../CancelModal";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import ModalPopup from "../../ModalPopup";
import NotePopup from "../../NotePopup";
import SelectField from "../../SelectField";
import ViewPayment from "../../ViewPayment";
import Invoice from "../../invoice/invoice";
import User from "../../invoice/user";
import { Url } from "../../../env"
import '../../ViewAllBookingData/module.viewAllBookingData.css';
const { RangePicker } = DatePicker;

function AllBooking() {
    const { booking, loading, newBooking, HoldStatus, fetchData, Canceled, setLoading } = useBookingContext();
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
        HoldStatus()
    }, [])
    const [bookingStatusFilter, setBookingStatusFilter] = useState(null);
    const [customerNameFilter, setCustomerNameFilter] = useState(null);
    const [createFilter, setCreateFilter] = useState(null);
    const [venueFilter, setVenueFilter] = useState(null);
    // const [phoneNumberFilter, setPhoneNumberFilter] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [eventDate, setEventDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancelIsModalOpen, setCancelIsModalOpen] = useState(false);
    const [viewIsModalOpen, setViewIsModalOpen] = useState(false);
    const [addPaymentId, setAddPaymentId] = useState("")
    const [timeRange, setTimeRange] = useState(null);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [viewNote, setViewNote] = useState(false)
    const [viewNoteData, setViewNoteData] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const navigate = useNavigate()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showCancelModal = () => {
        setCancelIsModalOpen(true);
    };
    const handleCancelModal = () => {
        setCancelIsModalOpen(false);
    };
    const showViewModal = () => {
        setViewIsModalOpen(true);
    };
    const handleViewModal = () => {
        setViewIsModalOpen(false);
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
                              `${date.getDate().toString().padStart(2, '0')}-` +
                              `${date.getFullYear()}`;
        return formattedDate;
    }
    const generatePDF = (addPaymentId) => {
        if (addPaymentId) {
            setLoading(true)
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Payment/SinglePayment/${addPaymentId._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                
                    User({ ...addPaymentId, paidAmount: result?.recived, balance: result?.balance,eventDate:result?.selectedDate,createdDate:result?.createdAt })
                    // setPayment(result)
                    // setReceived(result.recived)
                    // setTotal(result?.recived || 0)
                    console.log(result);
                    setLoading(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoading(false)
                });
        }
    };

    const handleMenuClick = (record, action) => {

        if (action === 'ViewNote') {
            console.log(record);
            setViewNote(true)
            setViewNoteData(record?.note)
        } else if (action === 'edit') {
            if (record.Status === 'Completed') {
                return;
            } else if (record.Status === 'Cancelled') {
                setErrorPopupOpen(true)
                setErrorPopupMessage("This booking can't be edit because of this cancellation");
            }
            else if (record.Status === 'Confirmed' || record.Status === 'Hold' || record.Status === "In Process") {
                navigate("/Booking/add-booking", { state: record });
            }
        } else if (action === "AddPayment") {
            if (record.Status === 'Cancelled') {
                setErrorPopupOpen(true)
                setErrorPopupMessage("This booking can't be add payment because of this cancellation");
            } else {

                setAddPaymentId(record._id)
                setIsModalOpen(true)
            }
        } else if (action === "ViewPayment") {
            setAddPaymentId(record._id)
            showViewModal()

        } else if (action === "CancelEvent") {
            if (record.Status === 'Cancelled' || record.Status === 'Completed') {
                return;
            } else if (record.Status === "Hold") {
                Canceled(record)
            } else if (record.Status === 'Confirmed') {
                setAddPaymentId(record._id)
                showCancelModal()
            }
        } else if (action === "Invoice") {
            Invoice(record)

        } else if (action === "User") {
            generatePDF(record)
        }
    };

    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>
            <Menu.Item key="ViewNote" icon={<MdOutlinePageview style={{ fontSize: "18px" }} />}>
                View Note
            </Menu.Item>
            <Menu.Item key="AddPayment" icon={<AppstoreAddOutlined style={{ fontSize: "18px" }} />}>
                Add Payment
            </Menu.Item>
            <Menu.Item key="ViewPayment" icon={<LuView style={{ fontSize: "18px" }} />}>
                View Payment
            </Menu.Item>
            <Menu.Item key="CancelEvent" icon={<TiCancel style={{ fontSize: "18px" }} />}>
                Cancel Event
            </Menu.Item>
            <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
                Edit
            </Menu.Item>
            <Menu.Item key="Invoice" icon={<TbFileInvoice style={{ fontSize: "18px" }} />}>
                Generate Invoice Internal
            </Menu.Item>
            <Menu.Item key="User" icon={<LiaFileInvoiceDollarSolid style={{ fontSize: "18px", }} />}>
                Generate Invoice For User
            </Menu.Item>
        </Menu>
    );
    const handleEllipsisClick = (event) => {
        // Stop the event propagation to prevent the table's onClick from being triggered
        event.stopPropagation();
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            responsive: ["none"],
            render: (text, record) => (
                <span>{formatTimestamp(record.createdAt)}</span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            render: (text, record) => (
                <>
                    <span>{record.firstName}{" "}</span>
                    <span>{record.lastName}</span>
                </>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Event Date',
            dataIndex: 'selectedDate',
            responsive: ["xxl"],
            render: (text, record) => {
                if (Array.isArray(record.selectedDate)) {
                    return record.selectedDate.map((e, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                            <span >{formatDate(e)}</span>
                        </div>
                    ));
                } else {
                    return (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span >{formatDate(record.selectedDate)}</span>
                        </div>
                    );
                }
            },
        },

        {
            title: 'Venue',
            dataIndex: 'venue',
            render: (text, record) => {
                if (Array.isArray(record.venue)) {
                    return record.venue?.map((e, i) => (<div key={i} style={{ display: "flex", flexDirection: "column" }}><span >{e}</span></div>))
                } else {
                    return (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span >{record.venue}</span>
                        </div>
                    );
                }
                // <div style={{ display: "flex", flexDirection: "column" }}><span >{record.venue}</span></div>

            },
        },
        {
            title: 'Status',
            dataIndex: 'Status',
        },
        {
            title: 'Booked by',
            dataIndex: 'createAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>

                    <div style={{ boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px" }} onClick={handleEllipsisClick}>
                        <EllipsisOutlined style={{ margin: "auto" }} size={45} />
                    </div>
                </Dropdown>
            ),
        },
    ];
    const [range, setRange] = useState(null);
    const [customStartDate, setCustomStartDate] = useState(null)
    const [customEndDate, setCustomEndDate] = useState(null)
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
        setTimeRange("Last 3 Month");
        setRange("Last 3 Month");
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
                // console.log(new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7));
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
    const filteredData = newBooking.filter((record) => {
        const statusFilter = bookingStatusFilter ? record.Status.toLowerCase().includes(bookingStatusFilter.toLowerCase()) : true;
        const createFilters = createFilter ? record.createAt === createFilter : true;
        const customerFilter = customerNameFilter ? record.firstName.toLowerCase().includes(customerNameFilter.toLowerCase()) : true;
        const nameFilter = venueFilter
            ? Array.isArray(record.venue)
                ? record.venue.map(e => e === venueFilter).includes(true)
                : record.venue === venueFilter
            : true;
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
        const customFilter =
            customStartDate && customEndDate
                ? new Date(record.createdAt) >= customStartDate && new Date(record.createdAt) <= customEndDate
                : true;
        const eventDateFilter = eventDate
            ? record.selectedDate === eventDate?.format('YYYY-MM-DD')
            : true;
        const statusOpenFilter = record.Status.toLowerCase() === 'cancelled' || record.Status.toLowerCase() === 'completed' ||
            record.Status.toLowerCase() === 'confirmed' || record.Status.toLowerCase() === 'hold' || record.Status.toLowerCase() === 'in process';

        const timeRangeFilter =
            range === "Last Week" || range === "This Month" || range === "Last Month" || range === "Last 3 Months" || range === "Last 1 Year"
                ? rangeStartDate(range, new Date(record.createdAt))
                : true;

        return statusFilter && nameFilter && dateFilter && timeRangeFilter && statusOpenFilter && eventDateFilter && customerFilter && createFilters && customFilter;
    });
    const getCustomerNameOptions = () => {
        // Assuming `newBooking` is an array of booking objects
        const customerNames = newBooking.map((booking) => booking.firstName);

        // Use Set to get unique customer names
        const uniqueCustomerNames = [...new Set(customerNames)];

        // Map the unique customer names to the options format
        const options = uniqueCustomerNames.map((name) => ({
            label: name,
            value: name,
        }));

        return options;
    };
    const getBookedByNameOptions = () => {
        // Assuming `newBooking` is an array of booking objects
        const customerNames = newBooking.map((booking) => booking.createAt);

        // Use Set to get unique customer names
        const uniqueCustomerNames = [...new Set(customerNames)];

        // Map the unique customer names to the options format
        const options = uniqueCustomerNames.map((name) => ({
            label: name,
            value: name,
        }));

        return options;
    };
    const handleRowClick = (record, event) => {
        event.stopPropagation();

        // Check if the click event originated from the ellipsis icon
        const isDropdownClick = event.target.closest('.ant-dropdown') !== null;

        if (!isDropdownClick) {
            // If not, proceed with the navigation
            navigate(`/Booking/View-Data/${record._id}`, { state: record });
            console.log('Clicked Row Data:', record);
            // Now you can do whatever you want with the clicked row data
        }
    };
    const handleClearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setEventDate(null);
        setVenueFilter(null);
        setBookingStatusFilter(null);
        setCustomerNameFilter(null);
        setCreateFilter(null);
        setRange(null);
        setTimeRange(null);
        setCustomEndDate(null)
        setCustomStartDate(null)
    }
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
    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Booking </p>
            </span>
        )
    };
    const handleSuggestionCustomerNameClick = (suggestion) => {
        setCustomerNameFilter(suggestion);
        setSuggestionsCustomerName([]);
    };
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleCloseViewNotePopup = () => {
        setViewNote(false)
        setViewNoteData("")
    }
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
                style={{ marginBottom: "10px", fontFamily: "poppins", fontWeight: "600" }}
                size="small"
                items={[{
                    key: '1', label: 'Filters', children: <div>
                        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", gap: 15, flexWrap: 'wrap' }}>
                            <div style={{display: 'flex', width: '100%', alignItems: 'center', gap: 15}}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "33%" }}>
                                    <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Booking Date"}</label>
                                    <RangePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(dates) => {
                                        setStartDate(dates ? dates[0] : null);
                                        setEndDate(dates ? dates[1] : null);

                                    }}
                                        value={[startDate, endDate]}
                                        disabledDate={(current) => current && current.valueOf() > moment().endOf('day')}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "33%" }}>
                                    <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Event Date"}</label>
                                    <DatePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(date) => setEventDate(date)} value={eventDate} />
                                </div>
                                <SelectField
                                    label={"Venue"}
                                    style={{
                                        width: "100%",
                                        marginBottom: 15,
                                        borderColor: "#b78953 !important",
                                        backgroundColor: "#fff !important"
                                    }}
                                    placeholder="Venue"
                                    // options={[
                                    //     { value: 'Ruby + Emerald', label: 'Ruby + Emerald ' },
                                    //     { value: 'Emerald', label: 'Emerald ' },
                                    //     { value: 'Diamond', label: 'Diamond ' },
                                    //     { value: 'Ruby', label: 'Ruby ' },
                                    // ]}
                                    options={getVenuesOptions()}
                                    width={"33%"}
                                    value={venueFilter}
                                    onChange={(event, index) => {
                                        setVenueFilter(event);
                                    }}
                                    className="checkColor"

                                />
                            </div>
                            <div style={{ display: "flex", gap: 15, width: "100%" }}>
                                <SelectField showSearch={false}
                                    value={bookingStatusFilter}
                                    label={"Booking Status"}
                                    width={"33%"}
                                    placeholder="Booking Status"
                                    onChange={(value) => setBookingStatusFilter(value)}
                                    options={[
                                        // { label: "Opened", value: "Opened" },
                                        { label: "Confirmed", value: "Confirmed" },
                                        { label: "Cancelled", value: "Cancelled" },
                                        { label: "Completed", value: "Completed" },
                                        { label: "Hold", value: "Hold" },
                                        { label: "In Process", value: "In Process" },
                                    ]}
                                />
                                <div style={{ width: "33%" }}>

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
                                <SelectField
                                    showSearch={true}
                                    value={createFilter}
                                    label={"Booked by"}
                                    width={"33%"}
                                    placeholder={"Booked by"}
                                    onChange={(value) => setCreateFilter(value)}
                                    options={getBookedByNameOptions()}
                                />
                                {/* <InputField
                                        label={"Booked by"}
                                        width={"32%"}
                                        placeholder={"Booked by"}
                                        onChange={(value) => setCreateFilter(value.target.value)}
                                        value={createFilter}
                                    /> */}
                            </div>
                            <div style={{ display: "flex", gap: 15, flexWrap : "wrap", width: "100%",  marginBottom: 23 }}>
                                <Button type="primary" className="buttonHover" onClick={handleLastWeek} style={{ background: timeRange === "Last Week" ? "#b78953" : "#73787c" }}>Last Week</Button>
                                <Button type="primary" className="buttonHover" onClick={handleThisMonth} style={{ background: timeRange === "This Month" ? "#b78953" : "#73787c" }}>This Month</Button>
                                <Button type="primary" className="buttonHover" onClick={handleLastMonth} style={{ background: timeRange === "Last Month" ? "#b78953" : "#73787c" }}>Last Month</Button>
                                <Button type="primary" className="buttonHover" onClick={handleLast3Months} style={{ background: timeRange === "Last 3 Month" ? "#b78953" : "#73787c" }}>Last 3 Month</Button>
                                <Button type="primary" className="buttonHover" onClick={handleLast1Year} style={{ background: timeRange === "Last 1 Year" ? "#b78953" : "#73787c" }}>Last 1 Year</Button>

                            </div>
                            <div style={{ display: "flex", justifyContent: "right", flexWrap: "wrap", width: "100%" }}>

                                <Button onClick={() => handleClearFilter()} type="primary" className="buttonHover" style={{ background: "#73787c" }} >Clear Filter</Button>
                            </div>
                        </div>
                    </div>
                }]}
            />
            <Table style={{ width: "100%", alignItems: "start" }} columns={columns} dataSource={filteredData} onRow={(record) => ({
                onClick: (event) => handleRowClick(record, event),
                style: { cursor: "pointer" }
            })} locale={locale} />
            <ModalPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} showModal={showModal} handleCancel={handleCancel} setAddPaymentId={setAddPaymentId} addPaymentId={addPaymentId} />
            <CancelModal handleCancel={handleCancelModal} isModalOpen={cancelIsModalOpen} addPaymentId={addPaymentId} setAddPaymentId={setAddPaymentId} />
            <ViewPayment handleCancel={handleViewModal} isModalOpen={viewIsModalOpen} PaymentId={addPaymentId} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            <NotePopup isModalOpen={viewNote} handleCancel={handleCloseViewNotePopup} textValue={viewNoteData} />


        </div >
    );
}
export default AllBooking