const AppointmentModel = require("../../Model/AppointmentSchema");
const BookAppointmentModel = require("../../Model/BookAppointmentSchema");
const AppointmentEmailSender = require("../AppointmentEmailSend");

const Add = async (req, res) => {
    const { appointmentName, name, appointmentDate, slot, bookingId ,email,city,eventType} = req.body
    if (!appointmentName || !name || !appointmentDate || !bookingId || !slot || !email ||!city || !eventType) {
        return res.status(400).json({
            status: 400,
            message: "Required Appointment parameters are missing",
        });
    }
    try {
        const existingSlots = await AppointmentModel.find({
            date: appointmentDate,
            name: appointmentName,
        });
        if (!existingSlots.length) {
            throw { status: 500, message: `No available slots for ${appointmentName} on ${appointmentDate}` };
        }
        const invalidSlots = !existingSlots.some(e =>
            e.slots.some(s =>
                s.slot === slot && s.availability === 'yes'
            )
        )
        if (invalidSlots) {
            throw {
                status: 500,
                message: `The following slots are not available: ${invalidSlots}`,
            };
        }
        console.log(invalidSlots);
        for (let i = 0; i < existingSlots.length; i++) {
            for (let j = 0; j < existingSlots[i].slots.length; j++) {
                const currentSlot = existingSlots[i].slots[j];
                if (currentSlot.slot === slot && currentSlot.availability === 'yes') {
                    currentSlot.availability = 'no';
                    break; // No need to continue iterating, as we found the slot
                }
            }
        }

        console.log(existingSlots);
        await existingSlots.map(e => e.save());
        await AppointmentEmailSender("osama.zellesolutions@gmail.com",name,email,slot,appointmentDate,city,eventType);
        console.log("working");
        const Booking = await BookAppointmentModel.create({ appointmentName, name, appointmentDate, bookingId, slot,email,city,eventType });
        res.status(200).json({
            status: 200,
            message
                : "Booking added successfully",
            Booking,

        });
    } catch (error) {
        console.error("Error adding appiontment", error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}
module.exports = Add