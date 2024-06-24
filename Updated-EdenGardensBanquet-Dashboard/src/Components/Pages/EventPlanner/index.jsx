import { Table } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import NoData from "../../../assets/noData.png";
import Loader from "../../Loader"
import Scheduler from "../../Scheduler";
function EventPlanner() {
    const navigate = useNavigate()
    const { newBooking, fetchData, loading } = useBookingContext()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    useEffect(() => { fetchData() }, [])
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

    const mergeConsecutiveSlots = (selectedSlot) => {
        const mergedSlots = [];
        const sortedSlots = selectedSlot?.sort((a, b) => {
            const timeMap = {
                "08:00 AM - 10:00 AM": 1,
                "10:00 AM - 12:00 PM": 2,
                "12:00 PM - 02:00 PM": 3,
                "02:00 PM - 04:00 PM": 4,
                "04:00 PM - 06:00 PM": 5,
                "06:00 PM - 08:00 PM": 6,
            };

            return timeMap[a] - timeMap[b];
        });
        let currentSlot = sortedSlots && sortedSlots[0];

        for (let i = 1; i < sortedSlots?.length; i++) {
            const currentTime = currentSlot.split(' - ')[1]; // Extract end time of current slot
            const nextStartTime = sortedSlots[i].split(' - ')[0]; // Extract start time of the next slot

            // Check if the next slot is consecutive to the current slot
            if (currentTime === nextStartTime || (i + 1 < sortedSlots.length && currentTime === sortedSlots[i + 1].split(' - ')[0])) {
                currentSlot = `${currentSlot.split(' - ')[0]} - ${sortedSlots[i].split(' - ')[1]}`;
            } else {
                // Format the slot and then check for consecutive slots
                mergedSlots.push(currentSlot);
                currentSlot = sortedSlots[i];
            }
        }

        // Add the last slot if it is consecutive
        if (currentSlot !== mergedSlots[mergedSlots.length - 1]) {
            mergedSlots.push(currentSlot);
        }

        return mergedSlots;
    };
    const columns = [
        {
            title: 'Date of Booking',
            dataIndex: 'createAt',
            render: (text, record) => (
                <span>{formatTimestamp(record.createdAt)}</span>
            ),
            // render: (booking) => booking.bookingId,
        },
        {
            title: 'Event Date',
            dataIndex: 'selectedDate',
            // key: "booking"
        },
        {
            title: 'Customer Name',
            dataIndex: 'firstName',

        },
        {
            title: 'Venue',
            dataIndex: 'venue',
        },
        {
            title: 'Timing',
            dataIndex: 'selectedSlot',
            render: (selectedSlot => mergeConsecutiveSlots(selectedSlot)?.map((e) => <p>{e}</p>))
        },
        {
            title: 'No of Guest',
            dataIndex: 'maxPerson',
        },
        {
            title: 'Booked by',
            dataIndex: 'createAt',
        },

    ];
    const filteredData = newBooking.filter((record) => {
        const statusOpenFilter = record.Status.toLowerCase() === 'confirmed';
        return statusOpenFilter;
    });
    const handleRowClick = (record, event) => {
        event.stopPropagation();

        // Check if the click event originated from the ellipsis icon
        // const isDropdownClick = event.target.closest('.ant-dropdown') !== null;

        // if (!isDropdownClick) {
        // If not, proceed with the navigation
        navigate(`/Event/event-planner-Data/${record._id}`, { state: record });
        // Now you can do whatever you want with the clicked row data
        // }
    };
    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Event Planner </p>
            </span>
        )
    };
    return (
        <div style={{ padding: "20px" }}>
            {loading ? <Loader /> : <>
                <Table style={{ width: "100%" }} columns={columns} dataSource={filteredData} pagination={{ style: { color: "#b78953" } }} onRow={(record) => ({
                    onClick: (event) => handleRowClick(record, event),
                    style: { cursor: "pointer" }
                })} locale={locale} />
                {/* <Scheduler newBooking={newBooking}/> */}
            </>
            }
        </div>
    )
}
export default EventPlanner