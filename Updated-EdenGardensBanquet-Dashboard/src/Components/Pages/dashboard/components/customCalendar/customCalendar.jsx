import React, { useState, useRef, useEffect } from "react";
import './customCalendar.css'


function CheckAvailabilityTab() {
    useEffect(() => {
        // Your code here
        renderCalendar();
    }, []);

    function renderCalendar() {
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        let selectedDate = currentDate;
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const prevLastDay = new Date(currentYear, currentMonth, 0);

        const firstDayIndex = firstDay.getDay();
        const lastDayDate = lastDay.getDate();
        const prevLastDayDate = prevLastDay.getDate();
        const nextDays = 7 - (lastDay.getDay() + 1);

        // month.innerHTML = `${months[currentMonth]} ${currentYear}`;

        let daysHTML = "";

        // Calculate the previous month's last day
        const prevMonthLastDay = new Date(currentYear,
            currentMonth, 0).getDate();

        // Render the previous month's dates
        for (let x = firstDayIndex - 1; x >= 0; x--) {
            const date = prevMonthLastDay - x;
            daysHTML += `<div className="day prev disabled">${date}</div>`;
        }
        for (let i = 1; i <= lastDayDate; i++) {
            const currentDate = new Date(currentYear, currentMonth, i);
            const isToday = currentDate.toDateString() === new Date().toDateString();
            const isSelected = null;
            const isDisabled =
                currentDate.getMonth() !== currentMonth ||
                currentDate.getFullYear() !== currentYear ||
                (currentDate < new Date() && !isToday && !isSelected) ||
                currentDate.getDay() === 0 ||
                (currentDate.getDay() === 0 && currentDate > new Date());

            const isSunday = currentDate.getDay() === 0;

            daysHTML += `<div className="day ${isToday ? "today" : ""}
${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}
${isSunday && currentDate > new Date() ? "sunday" : ""}">${i}</div>`;
        }


        for (let j = 1; j <= nextDays; j++) {
            daysHTML += `<div className="day next disabled">${j}</div>`;
        }



        const days =
            Array.from(document.querySelectorAll(".day:not(.disabled)"));
        days.forEach((day) => {
            day.addEventListener("click", () => {
                days.forEach((d) => d.classList.remove("selected"));
                day.classList.add("selected");
                selectedDate = new Date(
                    currentYear,
                    currentMonth,
                    parseInt(day.textContent)
                );
                const options = {
                    timeZone: 'America/New_York',
                    timeZoneName: 'short'
                };
                console.log(selectedDate.toLocaleString('en-US',
                    options)); // Print the selected date in the console
                console.log("above");



                var btn1 = document.getElementById("second");

            });
        });


    }
    return <>
        <div className="calendar">
            <div className="header">
                <div className="btns">
                    <div className="btn prev-btn">Prev</div>
                    <div className="btn next-btn">Next</div>
                </div>
                <div className="month"></div>
                <div className="today-btn"></div>
            </div>

            <div className="weekdays">
                <div className="day">Sun</div>
                <div className="day">Mon</div>
                <div className="day">Tue</div>
                <div className="day">Wed</div>
                <div className="day">Thu</div>
                <div className="day">Fri</div>
                <div className="day">Sat</div>
            </div>

            <div className="days"></div>
        </div>
    </>
}
export default CheckAvailabilityTab;