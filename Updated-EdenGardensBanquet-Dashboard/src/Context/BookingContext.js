import { createContext, useContext, useState, useEffect } from 'react';
import { Url } from '../env';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({})
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBooking, setNewBooking] = useState([])
    const [oldBooking, setOldBooking] = useState([])
    const [payment, setPayment] = useState([])
    const [services, setServices] = useState([])
    const [repair, setRepair] = useState([])
    // useEffect(() => {
    // Fetch data and update state
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${Url}New-Booking/Get`);
            // const response = await fetch('https://ballroom-backend.vercel.app/api/v1/Booking/Get');
            const result = await response.json();
            // console.log(result);
            setNewBooking([...result.reverse()]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const OldBooking = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${Url}Booking/Get`);
            // const response = await fetch('https://ballroom-backend.vercel.app/api/v1/Booking/Get');
            const result = await response.json();
            setOldBooking([...result.reverse()]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // fetchData();
    // OldBooking();
    // }, []);
    useEffect(() => {
        setBooking(newBooking.concat(oldBooking))
    }, [newBooking, oldBooking])
    const Canceled = async (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            zip: data.zip,
            address: data.address,
            city: data.city,
            state: data.state,
            venue: data.venue,
            selectedDate: data.selectedDate,
            selectedSlot: data.selectedSlot,
            eventType: data.eventType,
            minPerson: data.maxPerson,
            maxPerson: data.maxPerson,
            Status: "Cancelled"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}New-Booking/Edit/${data._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.updatedBooking) {
                    console.log(result)
                    setNewBooking((prevBooking) =>
                        prevBooking.map((booking) =>
                            booking._id === data._id ? result.updatedBooking : booking
                        )
                    );
                }
            })
            .catch(error => console.log('error', error));

    }
    const PaymentBookingStatus = async (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            zip: data.zip,
            address: data.address,
            city: data.city,
            state: data.state,
            venue: data.venue,
            selectedDate: data.selectedDate,
            selectedSlot: data.selectedSlot,
            eventType: data.eventType,
            minPerson: data.maxPerson,
            maxPerson: data.maxPerson,
            Status: "Confirmed"
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}New-Booking/Edit/${data._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.updatedBooking) {
                    console.log(result)
                    setNewBooking((prevBooking) =>
                        prevBooking.map((booking) =>
                            booking._id === data._id ? result.updatedBooking : booking
                        )
                    );
                }
            })
            .catch(error => console.log('error', error));

    }
    const completeBookingsByEventDate = async (eventDate) => {
        try {
            const response = await fetch(`https://ballroom-backend.vercel.app/api/v1/Booking/CompleteBooking`, {
                // const response = await fetch(`https://ballroom-backend.vercel.app/api/v1/Booking/Complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedDate: eventDate }),
            });

            const result = await response.json();
            if (result.status === 200) {
                // Update the local state after completing bookings
                setBooking((prevBooking) =>
                    prevBooking.map((booking) =>
                        booking.selectedDate === eventDate ? { ...booking, Status: 'Completed' } : booking
                    )
                );
            } else {
                console.error('Error completing bookings:', result.message);
            }
        } catch (error) {
            console.error('Error completing bookings:', error);
        }
    };
    // useEffect(() => {
    //     // Check for events with date less than or equal to the current date
    //     const startTime = new Date().getTime();
    //     const currentDate = new Date();
    //     const completedEvents = booking.filter(
    //         (event) => event.Status !== 'Completed' && new Date(event.selectedDate) <= currentDate
    //     );

    //     // Update the status to "Completed" for the filtered events
    //     if (completedEvents.length > 0) {
    //         const eventDates = completedEvents.map((event) => event.selectedDate);
    //         completeBookingsByEventDate(eventDates);
    //     }

    //     // Check for events with date in the past and status not updated to "Completed"
    //     const pastEvents = booking.filter(
    //         (event) => event.Status !== 'Completed' && new Date(event.selectedDate) < currentDate
    //     );

    //     // Update the status to "Completed" for the past events
    //     if (pastEvents.length > 0) {
    //         const pastEventDates = pastEvents.map((event) => event.selectedDate);
    //         // Exclude events with status 'Cancelled' from being completed
    //         const filteredPastEventDates = pastEventDates.filter((date) => {
    //             const correspondingEvent = booking.find((event) => event.selectedDate === date);
    //             return correspondingEvent && correspondingEvent.Status !== 'Cancelled';
    //         });

    //         completeBookingsByEventDate(filteredPastEventDates);
    //     }
    //     const endTime = new Date().getTime();
    //     const timeTaken = endTime - startTime;
    //     // console.log("Function took " + timeTaken + " milliseconds");
    // }, [booking, completeBookingsByEventDate]);

    const AllPayment = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${Url}Payment/GetAllPayment`);
            // const response = await fetch('https://ballroom-backend.vercel.app/api/v1/Booking/Get');
            const result = await response.json();
            // console.log(result);
            // setOldBooking([...result.reverse()]);
            setPayment(result.reverse())
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const [balance, setBalance] = useState({})
    const SinglePayment = (addPaymentId) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Payment/SinglePayment/${addPaymentId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setPayment(result)
                // setReceived(result.recived)
                setBalance(result.recived)
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const HoldStatus = () => {
        let filterBooking = newBooking.filter((e) => e.Status === "Hold")
        console.log(filterBooking);
        filterBooking.map(e => {
            if (is48HoursAgo(e.createdAt)) {


                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    firstName: e.firstName,
                    lastName: e.lastName,
                    email: e.email,
                    phone: e.phone,
                    zip: e.zip,
                    address: e.address,
                    city: e.city,
                    state: e.state,
                    venue: e.venue,
                    selectedDate: e.selectedDate,
                    selectedSlot: e.selectedSlot,
                    eventType: e.eventType,
                    minPerson: e.maxPerson,
                    maxPerson: e.maxPerson,
                    Status: "Cancelled"
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${Url}New-Booking/Edit/${e._id}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.updatedBooking) {
                            console.log(result)
                            setBooking((prevBooking) =>
                                prevBooking.map((booking) =>
                                    booking._id === e._id ? result.updatedBooking : booking
                                )
                            );
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                return
            }
        })
    }
    const is48HoursAgo = (timestamp) => {
        const currentTime = new Date().getTime();
        const bookingTime = new Date(timestamp).getTime();
        const timeDifference = currentTime - bookingTime;
        const hoursDifference = timeDifference / (1000 * 3600);

        return hoursDifference >= 48;
    }
    const [refund, setRefund] = useState([])
    const GetAllRefund = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Refund/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setRefund(result.reverse())
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log('error', error)
            });
    }
    const GetAllService = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Services/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setServices(result.Services.reverse())
                    setLoading(false)
                    return
                }
                else {
                    setLoading(false)
                    console.log("Error")
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const GetAllRepair = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Repair/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setLoading(false)
                    setRepair(result.Repair.reverse())
                    return
                } else {
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => {
                setLoading(false)
                console.log('error', error)
            });
    }
    const [event, setEvent] = useState([])
    const GetAllEventType = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}EventType/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setLoading(false)
                    setEvent(result.EventType)
                    return
                } else {
                    setLoading(false)
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const [stages, setStage] = useState([])
    const GetAllStage = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Stage/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setStage(result.Stage)
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const [allVenues, setAllVenues] = useState([])
    const GetAllVenues = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Venue/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setAllVenues(result.Venue)
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <BookingContext.Provider value={{
            booking, loading, setBooking, setLoading, Canceled, completeBookingsByEventDate,
            oldBooking, setOldBooking, newBooking, setNewBooking, fetchData, OldBooking, AllPayment, payment,
            SinglePayment, balance, PaymentBookingStatus, HoldStatus, GetAllRefund, refund, GetAllService, services, GetAllRepair, repair, setServices, setRepair, event, GetAllEventType,
            setLoginData, GetAllStage, stages, GetAllVenues, allVenues, setAllVenues
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => {
    return useContext(BookingContext);
};
