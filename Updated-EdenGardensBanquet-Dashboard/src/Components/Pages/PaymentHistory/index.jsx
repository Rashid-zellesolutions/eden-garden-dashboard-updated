import { Button, Collapse, DatePicker, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import InputField from "../../InputField";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import '../../ViewAllBookingData/module.viewAllBookingData.css';

const { RangePicker } = DatePicker;
function PaymentHistory() {
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
    const [invFilter, setINVFilter] = useState("INV-");
    const [referenceFilter, setReferenceFilter] = useState("REC-");
    useEffect(() => { AllPayment() }, [])
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust the format as needed
    }



    const columns = [
        {
            title: 'Invoice No',
            dataIndex: 'inv',
            // render: (booking) => booking.bookingId,
        },
        {
            title: 'Reference Number',
            dataIndex: 'ref',
            responsive: ["xxl"]
            // render: (booking) => booking.bookingId,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            // key: "booking"
        },
        {
            title: 'Payment Date',
            // responsive: ["xl"],
            dataIndex: 'paymentDate',

        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            // responsive: ["xl"]
        },
        {
            title: 'Total Amount',
            dataIndex: 'total',
        },
        {
            title: 'Received Amount',
            dataIndex: 'paidAmount',
        },
        {
            title: 'Balance Amount',
            dataIndex: 'balanceAmount',
        },
    ];
    const filteredData = payment?.length && payment
    .map((item) => item.payment.paymentHistory?.map((e) => {
        // Parse e.date as a date object
        const paymentDate = new Date(e.date);
        
        // Format the date as MM-DD-YYYY
        const formattedDate = `${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}-` +
                              `${paymentDate.getDate().toString().padStart(2, '0')}-` +
                              `${paymentDate.getFullYear()}`;

        return {
            key: item.booking._id,
            bookingId: item.booking.bookingId,
            customerName: item.booking.firstName,
            paymentDate: formattedDate, // Assign the formatted date
            paymentType: e.paymentType,
            paidAmount: e.amount ? parseFloat(e.amount.toFixed(2)).toLocaleString('en-US') : "",
            balanceAmount: e.balance ? parseFloat(e.balance.toFixed(2)).toLocaleString('en-US') : "",
            total: item.payment.total ? parseFloat(item.payment.total.toFixed(2)).toLocaleString('en-US') : "",
            ref: e.ref,
            inv: item.booking?.inv,
            bookingDate: item.booking.createdAt
        };
    }))
    ?.flat()
    ?.filter((record) => {
        console.log(record.inv);
        const customerNameMatch = customerNameFilter
            ? record.customerName.toLowerCase().includes(customerNameFilter.toLowerCase())
            : true;
        const dateFilter =
            startDate && endDate
                ? (new Date(record.bookingDate) >= startDate && new Date(record.bookingDate) <= endDate) || (
                    new Date(record.bookingDate).toDateString &&
                    new Date(record.bookingDate).toDateString() === new Date(startDate).toDateString()
                )
                : true;
        const invFilters = invFilter
            ? record.inv?.toLowerCase().includes(invFilter.toLowerCase())
            : true;
        const refFilters = referenceFilter
            ? record.ref?.toLowerCase().includes(referenceFilter.toLowerCase())
            : true;
        return dateFilter && customerNameMatch && invFilters && refFilters;
    });


    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Payment Report </p>
            </span>
        )
    };
    const handleClearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setCustomerNameFilter(null);
        setINVFilter("INV-");
        setReferenceFilter("REC-");
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
    const handleSuggestionCustomerNameClick = (suggestion) => {
        setCustomerNameFilter(suggestion);
        setSuggestionsCustomerName([]);
    };
    const handleSetINVFilter = (value) => {
        // // Convert value to a string
        // const stringValue = String(value.target.value);

        // // Remove any characters that are not digits
        // const numericValue = stringValue.replace(/\D/g, '');

        // // Add the "INV-" prefix and then add hyphen after every two numbers
        // const formattedValue = `INV-${numericValue}`.replace(/(\d{2})(?=\d)/g, '$1-');

        // // Set the formatted value to state
        // setINVFilter(formattedValue);
        const inputValue = String(value.target.value);

        // Remove any non-digit characters including hyphens
        const numericValue = inputValue.replace(/[^\d]/g, '');

        // Add the "INV-" prefix and then add hyphen after every two numbers
        let formattedValue = `INV-${numericValue.slice(0, 2)}`;

        if (numericValue.length > 2) {
            formattedValue += `-${numericValue.slice(2, 4)}`;
        }
        if (numericValue.length > 4) {
            formattedValue += `-${numericValue.slice(4, 8)}`;
        }

        // Set the formatted value to state
        setINVFilter(formattedValue);
        // return formattedValue;
    };
    const handleSetRECFilter = (value) => {
        // // Convert value to a string
        // const stringValue = String(value.target.value);

        // // Remove any characters that are not digits
        // const numericValue = stringValue.replace(/\D/g, '');

        // // Add the "INV-" prefix and then add hyphen after every two numbers
        // const formattedValue = `INV-${numericValue}`.replace(/(\d{2})(?=\d)/g, '$1-');

        // // Set the formatted value to state
        // setINVFilter(formattedValue);
        const inputValue = String(value.target.value);

        // Remove any non-digit characters including hyphens
        const numericValue = inputValue.replace(/[^\d]/g, '');

        // Add the "INV-" prefix and then add hyphen after every two numbers
        let formattedValue = `REC-${numericValue.slice(0, 2)}`;

        if (numericValue.length > 2) {
            formattedValue += `-${numericValue.slice(2, 4)}`;
        }
        if (numericValue.length > 4) {
            formattedValue += `-${numericValue.slice(4, 8)}`;
        }

        // Set the formatted value to state
        setReferenceFilter(formattedValue);
        // return formattedValue;
    };

    return (
        <div style={{ padding: "20px" }}>
            {loading ? <Loader /> : <></>}

            <Collapse
                style={{ marginBottom: "10px", fontFamily: "poppins" }}
                size="small"
                items={[{
                    key: '1', label: 'Filters', children: <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", width: '100%' }}>
                        <div style={{width: '100%', display: 'flex', gap: 15}}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: "25%" }}>
                                <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c", }}>{"Booking Date"}</label>
                                <RangePicker style={{ height: 35, width: "100%", marginBottom: 15, }} onChange={(dates) => {
                                    setStartDate(dates ? dates[0] : null);
                                    setEndDate(dates ? dates[1] : null);
                                }} value={[startDate, endDate]}
                                    disabledDate={(current) => current && current.valueOf() > moment().endOf('day')}
                                />
                            </div>
                            <div style={{ width: "25%" }}>

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
                            <InputField
                                label={"INV"}
                                width={"25%"}
                                placeholder={"INV"}
                                onChange={handleSetINVFilter}
                                value={invFilter}
                            />
                            <InputField
                                label={"Reference Number"}
                                width={"25%"}
                                placeholder={"Reference Number"}
                                onChange={handleSetRECFilter}
                                value={referenceFilter}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "right", flexWrap: "wrap", width: "100%" }}>

                            <Button onClick={() => handleClearFilter()} type="primary" className="buttonHover" style={{ background: "#73787c", }} >Clear Filter</Button>
                        </div>
                    </div>
                }]}
            />
            <Table style={{ width: "100%" }} columns={columns} dataSource={filteredData} pagination={{ style: { color: "#b78953" } }} locale={locale} />
        </div>
    )
}
export default PaymentHistory