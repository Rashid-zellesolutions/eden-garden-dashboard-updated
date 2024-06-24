import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Fullcalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal ,Button} from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useBookingContext } from '../Context/BookingContext';
import NewsPaper from "../assets/day.png";
import UserInfo from "../assets/userInfo.png";
import Loader from './Loader';

function Scheduler() {
  const { newBooking, fetchData, loading } = useBookingContext()
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("data"))
  React.useEffect(() => {
      if (!userData.token) {
          navigate("/Login")
          return
      } else {
          return
      }
  }, [userData])
  React.useEffect(() => { fetchData() }, [])
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const handleViewButtonClick = () => {
    console.log(selectedEvent.extendedProps.id);
  };
  // Define colors for each venue
  const venueColors = {
    'Ruby + Emerald': '#CFB08C',
    'Emerald': '#50C878',
    'Ruby': '#E0115F',
    'Diamond': '#b9f2ff',
    'Topaz':'#FFC067 ',
    'Sapphire':'#0f52ba',
    'Jade':'#00A86B'
    // Add more venues and colors as needed
  };

  // const mapBookingToEvents = () => {
  //   return newBooking.map((booking) => {
  //     const selectedSlot = booking.selectedSlot[0].split(' - ');
  //     const startTime = dayjs(booking.selectedDate + ' ' + selectedSlot[0], 'YYYY-MM-DD hh:mm A');
  //     const endTime = dayjs(booking.selectedDate + ' ' + selectedSlot[1], 'YYYY-MM-DD hh:mm A');

  //     return {
  //       title: booking.eventType,
  //       description: `Booking ID: ${booking.bookingId}\nName: ${booking.firstName} ${booking.lastName}\nEmail: ${booking.email}`,
  //       start: startTime.isValid() ? startTime.format('YYYY-MM-DDTHH:mm:ss') : null,
  //       end: endTime.isValid() ? endTime.format('YYYY-MM-DDTHH:mm:ss') : null,
  //       venue: booking?.venue[0],
  //       selectedDate: booking.selectedDate,
  //       name: `${booking.firstName} ${booking.lastName}`,
  //       email: booking.email,
  //       phone: booking.phone,
  //       noOfPerson: booking.maxPerson,
  //       selectedSlot: booking.selectedSlot,
  //     };
  //   });
  // };
  const mapBookingToEvents = () => {
    let events = [];

    newBooking.forEach((booking) => {
      // Check if the booking status is not 'Cancelled'
      if (booking.Status !== 'Cancelled') {
        booking.selectedSlot.forEach((timeSlot) => {

          const selectedSlot = timeSlot.split(' - ');
          const startTime = timeSlot === "Full Day" ? dayjs(booking.selectedDate + ' ' + "08:00:00", 'YYYY-MM-DD hh:mm A') : dayjs(booking.selectedDate + ' ' + selectedSlot[0], 'YYYY-MM-DD hh:mm A');
          const endTime = timeSlot === "Full Day" ? dayjs(booking.selectedDate + ' ' + "08:00:00", 'YYYY-MM-DD hh:mm A') : dayjs(booking.selectedDate + ' ' + selectedSlot[1], 'YYYY-MM-DD hh:mm A');

          if (startTime.isValid() && endTime.isValid()) {
            events.push({
              title: booking.eventType,
              description: {"Booking ID":`${booking._id}`,"description": `Booking ID: ${booking._id}\nName: ${booking.firstName} ${booking.lastName}\nEmail: ${booking.email}`}
             ,
              id:booking._id,
              start: startTime.format('YYYY-MM-DDTHH:mm:ss'),
              end: endTime.format('YYYY-MM-DDTHH:mm:ss'),
              venue: booking?.venue[0],
              selectedDate: booking.selectedDate,
              name: `${booking.firstName} ${booking.lastName}`,
              email: booking.email,
              phone: booking.phone,
              noOfPerson: booking.maxPerson,
              selectedSlot: timeSlot,
              all:booking
              
              
              
            });
          }
        });
      }
    });

    return events;
  };
  


  const data = mapBookingToEvents();

  console.log(data);

  const handleEventClick = (info) => {
    console.log(info);
    setSelectedEvent(info.event);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setOpen(false);
  };

  function getFirstCharacters(str) {
    const words = str.split(" ");
    if (words.length === 1) {
        return words[0].charAt(0);
    } else if (words.length === 2 && str.includes("+")) {
        return words[0].charAt(0) + " + " + words[1].charAt(0);
    } else {
        return str.charAt(0);
    }
}

// Example usage:
console.log(getFirstCharacters("Ruby")); // Output: R
console.log(getFirstCharacters("Ruby + Emerald")); // Output: R + E


  const eventContent = (arg) => {
    const venue = arg.event.extendedProps && arg.event.extendedProps.venue;
    const eventTextColor = venue ? venueColors[venue] : 'black';
    return (
      <React.Fragment>

        {arg.view.type === "timeGridWeek" ? 
         <div style={{ background: eventTextColor, width: "10px", height: "10px", borderRadius: "50%" }}></div> :
        <div className="fc-content" style={{ borderStyle: "solid", borderWidth: 2, borderColor: eventTextColor, background: eventTextColor, color: "#fff", width: "100%", padding: "3px", height: "100%", borderRadius: "4px" }}> 
          <span className="fc-title" style={{ display: 'block' }}>{arg.event.extendedProps.selectedSlot}</span>
          <span className="fc-title" style={{ fontSize: "16px", fontWeight: "600" }}>{arg.event.title}</span>
          <span style={{position:"absolute",top:"5px",right:"5px"}}>{getFirstCharacters(venue)}</span>
        </div>}
        {/* // </div> */}
      </React.Fragment>
    );
  };
  return loading?<Loader /> :(
    <main style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {/* <div style={{ width: "20%" }}> */}
      {/* <Calendar style={{ marginTop: "10px" }} headerRender={customHeaderRender} fullCellRender={customDateCellRender} /> */}
      {/* </div> */}
      <div className="calender-schedular">
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Ruby + Emerald'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Ruby + Emerald </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Emerald'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Emerald </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Ruby'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Ruby </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Diamond'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Diamond</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Sapphire'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Sapphire </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Topaz'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Topaz </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: "10px" }}>
            <div style={{ background: venueColors['Jade'], width: "10px", height: "10px", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 12, fontWeight: 400 }}>Jade</span>
          </div>
        </div>

        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          events={data}
          eventClick={handleEventClick}
          eventContent={eventContent}
          eventBackgroundColor='transparent'
          eventBorderColor='transparent'
          contentHeight={"auto"}
          showNonCurrentDates={false}
        />
        {selectedEvent && (
          <Modal  width={"30%"} title={""} open={open} onCancel={handleCloseModal} footer={[<> <Button onClick={()=>{
            navigate(`/Booking/View-Data/${selectedEvent.extendedProps.all._id}`, { state: selectedEvent.extendedProps.all });
            console.log(selectedEvent.extendedProps.all)}}>View</Button> </>]} style={{ padding: "20px", top: "32%" }} >
            <div className="schedule-container">
              <div style={{ display: "flex", gap: 5 }}>
                <div style={{ background: selectedEvent.extendedProps.venue ? venueColors[selectedEvent.extendedProps.venue] : 'black', width: "12px", height: "12px", borderRadius: "3px", marginTop: "5px" }}></div>
                <div className="schedule-heading-container">
                  <h2 className="schedule-heading">{selectedEvent.extendedProps.name}</h2>
                  <p className="schedule-date">{selectedEvent.extendedProps.selectedDate}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: "10px" }}>
                <img src={NewsPaper} alt='' width={20} height={20} />
                <div className="schedule-heading-container">
                  <h2 className="schedule-heading">Event Info</h2>
                  <p className="schedule-date">{selectedEvent.extendedProps.venue}</p>
                  <p className="schedule-date">{selectedEvent.title}</p>
                  <p className="schedule-date">{selectedEvent.extendedProps.noOfPerson}</p>
                  <p className="schedule-date">{selectedEvent.extendedProps.selectedSlot}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: "10px" }}>
                <img src={UserInfo} alt='' width={20} height={20} />
                <div className="schedule-heading-container">
                  <h2 className="schedule-heading">Contact Info</h2>
                  <p className="schedule-date">{selectedEvent.extendedProps.email}</p>
                  <p className="schedule-date">{selectedEvent.extendedProps.phone}</p>
                </div>
              </div>
             
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}

export default Scheduler;