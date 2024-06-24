import React, { useState } from "react";
import './components.css'
import date from '../../../../assets/date.png'
import time from '../../../../assets/time.png'
import hall from '../../../../assets/hall.png'
import arrowForward from '../../../../assets/rightarrow.png'
import arrowBackward from '../../../../assets/leftarrow.png'
import dayjs from "dayjs";

function TodayEvents({ upcomingEvents }) {
    const [activeIndex, setActiveIndex] = useState(0);

    function changeForward() {
        if (activeIndex + 1 < upcomingEvents.length) {
            setActiveIndex(activeIndex + 1);
        } else {
            setActiveIndex(0);
        }
    }


    function changeBackward() {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else {
            setActiveIndex(0);
        }
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
    return (
        <div className="todayEvent">
            <div className="todayEventLeft">
                <div className="imageTodayVenue" style={{
                    backgroundImage: `url(${upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]["venue"] === "Diamond" ? "https://regalpartyhall.com/main/ballrooms/dia.jpg"
                        : upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]["venue"] === "Ruby" ? "https://regalpartyhall.com/main/ballrooms/rub.jpg" : "https://regalpartyhall.com/main/ballrooms/dia.jpg"})`
                }}>
                    <div className="imgTodayEventFrame">
                        <div className="dateTimeEvent">
                            <h1>{upcomingEvents && upcomingEvents[activeIndex] &&
                                dayjs(upcomingEvents[activeIndex]['selectedDate']).format(' D')}</h1>
                            <h4>{upcomingEvents && upcomingEvents[activeIndex] &&
                                dayjs(upcomingEvents[activeIndex]['selectedDate']).format('ddd ')}</h4>
                        </div>
                        <div className="arrowsFB">
                            <div onClick={() => { changeBackward() }} className="backwardArrow1">
                                <img src={arrowBackward} alt="" srcSet="" />
                            </div>
                            <div style={{ width: '20px' }}></div>
                            <div onClick={() => { changeForward() }} className="forwardArrow1">
                                <img src={arrowForward} alt="" srcSet="" />
                            </div>
                        </div>
                        <p className="card-name" style={{
                            fontSize: '21px',
                            color: 'white',
                            fontWeight: 'bold',
                            marginLeft: '20px',
                            marginTop: '20px'
                        }}>
                            {upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]['firstName']} {upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]['lastName']}
                        </p>
                    </div>
                </div>
            </div>
            <div className="todayEventRight">
                <div className="imageTodayVenueA" style={{
                    backgroundImage: `url(${upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]["venue"] === "Diamond" ? "https://regalpartyhall.com/main/ballrooms/dia.jpg"
                        : upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]["venue"] === "Ruby" ? "https://regalpartyhall.com/main/ballrooms/rub.jpg" : "https://regalpartyhall.com/main/ballrooms/dia.jpg"})`

                }}>
                    <div className="overlayImgTV">
                        <h3>
                            {upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]['eventType']}
                        </h3>
                        <div style={{
                            width: '100%',
                            height: '70px',
                            opacity: '1',
                            borderTop: '1px solid white',
                            borderBottom: '1px solid white',
                            display: 'flex'
                        }}>
                            <div className="img-div" style={{
                                width: '30%',
                                height: '100%',
                                borderRight: '1px solid white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}>
                                <img style={{
                                    height: '30px',
                                    width: '30px'
                                }} src={date} alt="" srcSet="" />
                                <h5>
                                    Event Date
                                </h5>
                            </div>
                            <div style={{
                                // width: '70%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <h4>
                                    {upcomingEvents && upcomingEvents[activeIndex] && formatDate(upcomingEvents[activeIndex]['selectedDate'])}
                                </h4>
                            </div>
                        </div>

                        <div style={{
                            width: '100%',
                            height: '70px',
                            opacity: '1',
                            borderBottom: '1px solid white',
                            display: 'flex'
                        }}>

                            <div className="img-div" style={{
                                width: '30%',
                                height: '100%',
                                borderRight: '1px solid white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img style={{
                                    height: '40px',
                                    width: '40px'
                                }} src={hall} alt="" srcSet="" />
                                <h5>
                                    Selected Venue
                                </h5>
                            </div>
                            <div style={{
                                width: '70%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <h4>
                                    {upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]['venue']}
                                </h4>

                            </div>

                        </div>
                        <div style={{
                            width: '100%',
                            height: '70px',
                            opacity: '1',
                            borderBottom: '1px solid white',
                            display: 'flex'
                        }}>

                            <div className="img-div" style={{
                                width: '30%',
                                height: '100%',
                                borderRight: '1px solid white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img style={{
                                    height: '35px',
                                    width: '35px'
                                }} src={time} alt="" srcSet="" />
                                <h5>
                                    Selected Slots
                                </h5>

                            </div>
                            <div className="timing-div" style={{
                                width: '70%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', padding: "10px"
                            }}>

                                <h4>
                                    {mergeConsecutiveSlots(upcomingEvents && upcomingEvents[activeIndex] && upcomingEvents[activeIndex]['selectedSlot']).join(", ")}
                                </h4>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TodayEvents;
