import { Calendar } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CalendarLoader from '../../../CalendarLoader';
import './components.css';

const CalendarModal1 = ({ venue, selectedDate, selectedSlot, setSelectedDate, setSelectedSlot }) => {
    const [loader, setLoader] = useState(false)
    const [value, setValue] = useState(() => dayjs(new Date()));
    const [slots, setSlots] = useState([])
    const [populate, setPopulate] = useState([])
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [venueSelectedDates, setVenueSelectedDates] = useState(selectedDate);
    const [multipleSLot, setMultipleSlot] = useState([])

    const CheckAvailability = () => {

        const data = slots.length && slots?.flatMap((slotGroups) =>
            slotGroups && slotGroups?.flatMap(e => e.slots?.map((f) => f))
        );
        const noAvailabilitySlots = data?.filter(slot => slot?.availability === 'no');

        // Filter out slots where there is at least one slot with the same slot but different availability
        const uniqueNoAvailabilitySlots = noAvailabilitySlots?.filter(slot => {
            const hasDifferentAvailability = data?.some(s => s.slot === slot?.slot && s?.availability !== 'no');
            return hasDifferentAvailability;
        });
        const NoSlotAvailability = uniqueNoAvailabilitySlots?.reduce((acc, slot) => {
            const FullDay = acc.find(item => item?.slot === slot?.slot && item?.availability === slot?.availability);
            if (!FullDay) {
                acc.push(slot);
            }
            return acc;
        }, []);
        // console.log(helow, "helow");
        // Use filter to keep only the unique slots
        const hasNoAvailabilityFullDay = data?.reduce((acc, slot) => {
            const FullDay = data?.some(slots => slots?.availability === 'no' && slots?.slot === slot?.slot);
            if (!FullDay) {
                acc.push(slot);
            }
            return acc;
        }, []);
        const uniqueSlots = hasNoAvailabilityFullDay?.reduce((acc, slot) => {
            const existingSlot = acc.find(item => item?.slot === slot?.slot && item?.availability === slot?.availability);
            if (!existingSlot) {
                acc.push(slot);
            }
            return acc;
        }, []);

        // Do whatever you want with the uniqueSlots array
        // console.log('Unique Slots:', [...uniqueSlots, ...uniqueNoAvailabilitySlots]);
        setPopulate([...uniqueSlots, ...NoSlotAvailability])
        return data;


    };
    useEffect(() => {
        if (slots.length) {
            CheckAvailability();
        }
    }, [slots]);
    const onSelect = (newValue) => {
        const currentDate = dayjs(new Date());
        // setSlots([])
        // setPopulate([])
        // Check if the selected date is in the past
        if (newValue.isBefore(currentDate, 'day')) {
            setErrorPopupMessage("Please select a future date")
            setErrorPopupOpen(true)
        }
        else {
            setSelectedDate(newValue);
            setVenueSelectedDates(newValue);
        }
    };
    const onSlotSelect = (slot) => {
        if (slot === 'Full Day') {
            // If "Full Day" is selected, clear the existing selected slots

        } else {
            // For other slots, toggle the selection
            const updatedSelectedSlots = selectedSlot.includes(slot)
                ? selectedSlot.filter((selectedSlots) => selectedSlots !== slot)
                : [...selectedSlot, slot];

            // Remove 'Full Day' from the selection if other slots are selected
            if (updatedSelectedSlots.length > 1 && updatedSelectedSlots.includes('Full Day')) {
                const filteredSlots = updatedSelectedSlots.filter((selectedSlots) => selectedSlots !== 'Full Day');

            } else {

            }
        }
    };

    const checkSelect = async () => {
        console.log("helo");
        setLoader(true);
        try {
            const promises = venue.map(async (venueItem) => {
                const formatTime = selectedDate?.format('YYYY-MM-DD');
                const response = await fetch("https://ballroom-backend.vercel.app/api/v1/Booking/CheckBooking", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        venue: venueItem,
                        date: formatTime
                    }),
                    redirect: 'follow'
                });

                const result = await response.json();
                if (result.status === 500) {
                    // Handle the 500 error by creating slots for the venue
                    createSlotsForVenue(venueItem, formatTime);
                }

                return result.data;
            });

            const venueSlots = await Promise.all(promises);
            const SlotMap = venueSlots.map((e) => e)
            // Update state with the fetched slots for all venues

            setSlots(SlotMap);
            // CheckAvailability()
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.error('Error fetching slots for all venues:', error);
        }
    };

    const createSlotsForVenue = async (venueItem, formatTime) => {
        console.log("helo");
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                venue: venueItem,
                date: formatTime,
                slots: [
                    {
                        slot: "08:00 AM - 09:00 AM",
                        availability: "yes"
                    },
                    {
                        slot: "09:00 AM - 10:00 AM",
                        availability: "yes"
                    },
                    {
                        slot: "10:00 AM - 11:00 AM",
                        availability: "yes"
                    },
                    {
                        slot: "11:00 AM - 12:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "12:00 PM - 01:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "01:00 PM - 02:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "02:00 PM - 03:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "03:00 PM - 04:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "04:00 PM - 05:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "05:00 PM - 06:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "06:00 PM - 07:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "07:00 PM - 08:00 PM",
                        availability: "yes"
                    },
                    {
                        slot: "Full Day",
                        availability: "yes"
                    },
                ]
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://ballroom-backend.vercel.app/api/v1/Slot/Add", requestOptions);
            const result = await response.json();
            console.log(result);
            if (result.status === 200) {
                // Update state with the newly created slots for the venue
                checkSelect()
            } else {
                console.error('Failed to create slots for venue:', venueItem);
            }
        } catch (error) {
            console.error('Error creating slots for venue:', venueItem, error);
        }
    };
    useEffect(() => {
        if (venue && selectedDate) {

            checkSelect()
            return
        }
    }, [venue, selectedDate])
    const [selectedCellStyle, setSelectedCellStyle] = useState({
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        fontSize: '11px'
    });
    const customDateCellRender = (date) => {
        const isSelected = date.isSame(venueSelectedDates, 'day');
        // const isSelected = date.isSame(selectedDate, 'day');
        const isCurrentMonth = date.isSame(value, 'month');
        const isPastDate = date.isBefore(dayjs(), 'day');
        return (
            <div
                style={{
                    ...selectedCellStyle,
                    background: isSelected ? '#b78953' : 'transparent',
                    borderRadius: "4px",
                    color: isPastDate ? "grey" : isSelected ? '#fff' : isCurrentMonth ? '#000' : 'rgb(116, 111, 111)',
                    cursor: isPastDate ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                    if (isPastDate) {
                        return
                    };
                    onSelect(date);

                }
                }
                className='dates'
            >
                {date.date()}
            </div>
        );
    }
    const customHeaderRender = ({ value, type, onChange }) => {
        const headerText = type === 'year' ? value.year() : value.format('MMMM YYYY');
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const renderDayNames = () => (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#353E49', fontWeight: '600', width: '90%' }}>
                {dayNames.map((day, index) => (
                    <div key={index} style={{ fontSize: '10px' }}>{day}</div>
                ))}
            </div>
        );

        return (
            <div>
                <div style={{ padding: '10px', textAlign: 'center', background: '#b78953', color: '#fff', borderRadius: '10px' }}>
                    <span onClick={() => setValue(type === 'year' ? value.subtract(1, 'year') : value.subtract(1, 'month'))} style={{ fontSize: '18px', cursor: 'pointer' }}>‹</span>
                    <span style={{ margin: '0 10px' }}>{headerText}</span>
                    <span onClick={() => setValue(type === 'year' ? value.add(1, 'year') : value.add(1, 'month'))} style={{ fontSize: '18px', cursor: 'pointer' }}>›</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                    {renderDayNames()}
                </div>
            </div>
        );
    };
    return (

        <div style={{ width: "100%", display: "flex", gap: 15 }}>
            <div className='calander-div' style={{ width: "50%",  }}>

                <Calendar value={value} className='calander' style={{ height: "90% !important", marginTop: "10px" }} onPanelChange={() => { }} headerRender={customHeaderRender} fullCellRender={customDateCellRender} />
            </div>
            <div className='time-slot-div' style={{ width: "50%", position: "relative", marginTop: "10px", }}>


                {/* <div></div> */}
                <div className='dashbaordCalendar' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", border: "1px solid #73787c", padding: "5px", borderRadius: "4px", position: "relative",height:"270px", maxHeigh: "250px", overflowY: "scroll" }}>
                    {!loader ? slots?.length ?
                        slots?.map((slotGruops, innerIndex) =>
                            slotGruops?.map((e) =>
                                e.slots?.map((f, outerIndex) => (
                                    <div
                                        key={outerIndex}
                                        className={f?.availability === "yes" ? 'slots' : "unavailable"}
                                        style={{
                                            cursor: f?.availability === "yes" ? "pointer" : "not-allowed",
                                            background: selectedSlot.includes(f?.slot) ? "#b78953" : f?.availability === "yes" ? "#353E49" : "#333B45",
                                            width: f?.slot === "Full Day" ? "100%" : "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                            textAlign: "center",
                                            fontSize: "10px",
                                            fontWeight: "500",
                                            color: f?.availability === "yes" ? "#fff" : "rgb(116, 111, 111)"
                                        }}
                                    >
                                        {f?.slot}
                                    </div>
                                )
                                )

                            )
                        ) : <>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "9px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                08:00 AM - 09:00 AM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                09:00 AM - 10:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                10:00 AM - 11:00 AM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                11:00 AM - 12:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                12:00 PM - 01:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                01:00 PM - 02:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                02:00 PM - 03:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                03:00 PM - 04:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                04:00 PM - 05:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                05:00 PM - 06:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                06:00 PM - 07:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "48%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                07:00 PM - 08:00 PM
                            </div>
                            <div
                                className={'slots'}
                                style={{
                                    cursor: "pointer",
                                    background: "#353E49",
                                    width: "100%",  // Full width for all slots when there is at least one "Full Day" slot
                                    textAlign: "center",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    color: "#fff"
                                }}
                            >
                                Full Day
                            </div>
                        </>
                        : <CalendarLoader />
                    }
                </div>
                {/* // ) : (
                    //     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", border: "1px solid #73787c", padding: "10px", borderRadius: "4px", height: "100%" }}>
                    //         <p style={{ textAlign: "center", width: "100%", fontWeight: "600" }}>No Slot Available in {venue.map(e => (<span>{e}{","} </span>))}</p>
                    //     </div>
                    // ) */}
                {/* } */}

            </div>
        </div>

    );
};
export default CalendarModal1;