import { Button, Calendar, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CalendarLoader from '../CalendarLoader';
import ErrorPopup from '../ErrorPopup';
const CalendarModal = ({ isModalOpen, handleCancel, venue, setSelectedDate, selectedDate, setSelectedSlot, selectedSlot, location, currentVenueIndex }) => {
    const [loader, setLoader] = useState(false)
    const [value, setValue] = useState(() => dayjs(selectedDate.length ? selectedDate : new Date()));
    const [slots, setSlots] = useState([])
    const [populate, setPopulate] = useState([])
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [venueSelectedDates, setVenueSelectedDates] = useState(selectedDate);
    const [multipleSLot, setMultipleSlot] = useState([])
    const handleModalClose = () => {
        handleCancel()
    }
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
            return null
        } else if (newValue.month() < currentDate.month() || newValue.year() < currentDate.year()) {
            // Check if the selected date is in the past month
            return null;
        }
        else {
            // setValue((prevValue) => prevValue.set('date', newValue.date()));
            setSelectedDate(newValue);
            setVenueSelectedDates(newValue);
            setSelectedSlot([])
        }
    };
    const onSlotSelect = (slot) => {
        if (slot === 'Full Day') {
            // If "Full Day" is selected, clear the existing selected slots
            setSelectedSlot(['Full Day']);
        } else {
            // For other slots, toggle the selection
            const updatedSelectedSlots = selectedSlot.includes(slot)
                ? selectedSlot.filter((selectedSlots) => selectedSlots !== slot)
                : [...selectedSlot, slot];

            // Remove 'Full Day' from the selection if other slots are selected
            if (updatedSelectedSlots.length > 1 && updatedSelectedSlots.includes('Full Day')) {
                const filteredSlots = updatedSelectedSlots.filter((selectedSlots) => selectedSlots !== 'Full Day');
                setSelectedSlot(filteredSlots);
            } else {
                setSelectedSlot(updatedSelectedSlots);
            }
        }
    };

    const onPanelChange = (newValue) => {
        setSelectedDate(newValue)
        setValue(newValue)
    };
    const checkSelect = async () => {
        setLoader(true);
        try {
            const promises = venue.map(async (venueItem) => {
                const formatTime = location.state ? selectedDate : selectedDate?.format('YYYY-MM-DD');
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
                // slots: [
                //     {
                //     slot: "04:00 AM - 04:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "04:30 AM - 05:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:00 AM - 05:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:30 AM - 06:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:00 AM - 06:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:30 AM - 07:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:00 AM - 07:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:30 AM - 08:00 AM",
                //     availability: "yes"
                // },
                //     {
                //         slot: "08:00 AM - 09:00 AM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "09:00 AM - 10:00 AM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "10:00 AM - 11:00 AM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "11:00 AM - 12:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "12:00 PM - 01:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "01:00 PM - 02:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "02:00 PM - 03:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "03:00 PM - 04:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "04:00 PM - 05:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "05:00 PM - 06:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "06:00 PM - 07:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "07:00 PM - 08:00 PM",
                //         availability: "yes"
                //     },
                //     {
                //         slot: "Full Day",
                //         availability: "yes"
                //     },
                //     // { slot: '08:00 AM - 10:00 AM', availability: 'yes' },
                //     // { slot: '10:00 AM - 12:00 PM', availability: 'yes' },
                //     // { slot: '12:00 PM - 02:00 PM', availability: 'yes' },
                //     // { slot: '02:00 PM - 04:00 PM', availability: 'yes' },
                //     // { slot: '04:00 PM - 06:00 PM', availability: 'yes' },
                //     // { slot: '06:00 PM - 08:00 PM', availability: 'yes' },
                //     // { slot: 'Full Day', availability: 'yes' }
                // ]
                // slots: [
                // {
                //     slot: "04:00 AM - 04:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "04:30 AM - 05:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:00 AM - 05:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:30 AM - 06:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:00 AM - 06:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:30 AM - 07:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:00 AM - 07:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:30 AM - 08:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "08:00 AM - 08:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "08:30 AM - 09:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "09:00 AM - 09:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "09:30 AM - 10:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "10:00 AM - 10:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "10:30 AM - 11:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "11:00 AM - 11:30 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "11:30 AM - 12:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "12:00 PM - 12:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "12:30 PM - 01:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "01:00 PM - 01:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "01:30 PM - 02:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "02:00 PM - 02:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "02:30 PM - 03:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "03:00 PM - 03:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "03:30 PM - 04:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "04:00 PM - 04:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "04:30 PM - 05:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:00 PM - 05:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "05:30 PM - 06:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:00 PM - 06:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "06:30 PM - 07:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:00 PM - 07:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "07:30 PM - 08:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "08:00 PM - 08:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "08:30 PM - 09:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "09:00 PM - 09:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "09:30 PM - 10:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "10:00 PM - 10:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "10:30 PM - 11:00 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "11:00 PM - 11:30 PM",
                //     availability: "yes"
                // },
                // {
                //     slot: "11:30 PM - 12:00 AM",
                //     availability: "yes"
                // },
                // {
                //     slot: "Full Day",
                //     availability: "yes"
                // },
                // ]
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
        if (isModalOpen || venue.length) {
            checkSelect()
            // setValue((prevValue) => prevValue.set('date', .date()))
        }
    }, [isModalOpen, venue, selectedDate])
    const [selectedCellStyle, setSelectedCellStyle] = useState({
        height: '50px',
        textAlign: 'center',
        lineHeight: '50px',
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
                    color: isPastDate ? "rgb(116, 111, 111)" : isSelected ? '#fff' : isCurrentMonth ? '#000' : 'rgb(116, 111, 111)',
                    cursor: isPastDate ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                    if (isPastDate) {
                        return
                    } else {

                        onSelect(date);
                    }

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
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000', fontWeight: '600', width: '90%' }}>
                {dayNames.map((day, index) => (
                    <div key={index} style={{ fontSize: '14px' }}>{day}</div>
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


    const renderFooterButtons = () => {
        return (
            <Button onClick={handleCancel} type='primary' style={{ background: "#73787c" }}>
                OK
            </Button>
        );
    };
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    // const VenueMAp = () => (
    //     venue.map(e => { return <span>{e}{","} </span> })
    // )
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return (
        <Modal width={"60%"} title={`Select Date And Time Slot for ${venue.join(", ")}`} open={isModalOpen} onCancel={handleModalClose} footer={[renderFooterButtons()]} >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%", height: "30%", overflowY: 'scroll' }}>
                    <p style={{
                        fontFamily: 'poppins',
                        color: '#73787c',
                        fontWeight: '600',
                        fontSize: "16px"
                    }}>Select Event Date</p>
                    <div style={{
                        marginBottom: " 20px",
                        width: "80px",
                        height: "3px",
                        borderRadius: "5px",
                        backgroundColor: "#b78953",
                    }}>

                    </div>
                    <Calendar value={value} style={{ height: "100%", marginTop: "10px" }} onSelect={onSelect} onPanelChange={onPanelChange} headerRender={customHeaderRender} fullCellRender={customDateCellRender} />
                </div>
                <div style={{ width: "45%", position: "relative"}}>
                    <p style={{
                        fontFamily: 'poppins',
                        color: '#73787c',
                        fontWeight: '600',
                        fontSize: "16px"
                    }}>Select Time Slot</p>
                    <div style={{
                        marginBottom: " 20px",
                        width: "80px",
                        height: "3px",
                        borderRadius: "5px",
                        backgroundColor: "#b78953",
                    }}>

                    </div>
                    <div style={{ display: "flex", overflowY: 'scroll', alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", border: "1px solid #73787c", padding: "10px", borderRadius: "4px", position: "relative", }}>
                        {!loader ? slots?.length ?
                            <>
                                {
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
                                                    onClick={() => {
                                                        if (f.availability === "yes") {
                                                            onSlotSelect(f.slot, innerIndex);
                                                        } else {
                                                            setErrorPopupMessage(`This Slot Not Available ${regex.test(selectedDate) ? selectedDate : selectedDate?.format('YYYY-MM-DD')} ${f.slot}`);
                                                            setErrorPopupOpen(true);
                                                        }
                                                    }}
                                                >
                                                    {f?.slot}
                                                </div>
                                            )
                                            )

                                        )
                                    )}
                                <div className="instructionTime" style={{ marginTop: "10px" }}>
                                    <img decoding="async" src="https://ems.zellesolutions.com/assets/assets/images/information.png" alt="" />
                                    All Times in Eastern Standard Time (USA)
                                </div></> : <>
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
                                    04:00 AM - 05:00 AM
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
                                    05:00 AM - 06:00 AM
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
                                    06:00 AM - 07:00 AM
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
                                    07:00 AM - 08:00 AM
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
                </div>
            </div>
            <ErrorPopup isModalOpen={errorPopupOpen} label={errorPopupMessage} handleCancel={handleCloseErrorPopup} />
        </Modal >
    );
};
export default CalendarModal;