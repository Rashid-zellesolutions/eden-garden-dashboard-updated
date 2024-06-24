import { DatePicker, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import Loader from "../../Loader";
import { Url } from "../../../env";

const { RangePicker } = DatePicker;

function AllAppointment() {
    const navigate = useNavigate();
    const { booking, Canceled, oldBooking, setOldBooking, OldBooking } = useBookingContext();
    const userData = JSON.parse(localStorage.getItem("data"));
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const GetAllAppointment = () => {
            setLoading(true);
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}BookAppointment/Get`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status === 200) {
                        // Sort appointments by createdAt timestamp in descending order
                        const sortedAppointments = result.Appointment.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setAppointment(sortedAppointments);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        console.log("error");
                    }
                })
                .catch(error => console.log('error', error));

        }
        GetAllAppointment();
    }, []);

    useEffect(() => {
        if (!userData.token) {
            navigate("/Login");
        }
    }, [userData]);

    useEffect(() => {
        OldBooking();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>{formatTimestamp(record.createdAt)}</span>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.name}</span>
            ),
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
        },

        {
            title: 'Consultant',
            dataIndex: 'appointmentName',
        },
        {
            title: 'Appointment Date',
            dataIndex: 'appointmentDate',
        },
    ];

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
            {loading ? <Loader /> : (
                <Table style={{ width: "100%" }} columns={columns} dataSource={appointment} locale={locale} />
            )}
        </div >
    );
}

export default AllAppointment;
