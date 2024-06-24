const AppointmentModel = require("../../Model/AppointmentSchema");
const BookAppointmentModel = require("../../Model/BookAppointmentSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const findOldAppointment = await BookAppointmentModel.findById(id)
        if (!findOldAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        } else {
            if (findOldAppointment.slot === newData.slot && newData.appointmentDate === findOldAppointment.appointmentDate) {
                const updatedAppointment = await BookAppointmentModel.findByIdAndUpdate(id, newData, {
                    new: true,
                });
                res.status(200).json({
                    message: "Appointment updated successfully",
                    updatedAppointment,
                });
            } else {
                const existingSlots = await AppointmentModel.find({
                    date: newData.appointmentDate,
                    name: newData.appointmentName,
                });
                if (!existingSlots.length) {
                    throw { status: 500, message: `No available slots for ${newData.appointmentName} on ${newData.appointmentDate}` };
                }
                const invalidSlots = !existingSlots.some(e =>
                    e.slots.some(s =>
                        s.slot === newData.slot && s.availability === 'yes'
                    )
                )
                if (invalidSlots) {
                    throw {
                        status: 500,
                        message: `The following slots are not available: ${invalidSlots}`,
                    };
                }
                // console.log(invalidSlots);
                for (let i = 0; i < existingSlots.length; i++) {
                    for (let j = 0; j < existingSlots[i].slots.length; j++) {
                        const currentSlot = existingSlots[i].slots[j];
                        if (currentSlot.slot === newData.slot && currentSlot.availability === 'yes') {
                            currentSlot.availability = 'no';
                            break; // No need to continue iterating, as we found the slot
                        }
                    }
                }

                // console.log(existingSlots);
                await existingSlots.map(e => e.save());
                const existingSlotsOld = await AppointmentModel.find({
                    date: findOldAppointment.appointmentDate,
                    name: findOldAppointment.appointmentName,
                });
                console.log(existingSlots);
                for (let i = 0; i < existingSlotsOld.length; i++) {
                    for (let j = 0; j < existingSlotsOld[i].slots.length; j++) {
                        const currentSlot = existingSlotsOld[i].slots[j];
                        if (currentSlot.slot === findOldAppointment.slot && currentSlot.availability === 'no') {
                            console.log("hello");
                            currentSlot.availability = 'yes';
                            break; // No need to continue iterating, as we found the slot
                        }
                    }
                }
                await existingSlotsOld.map(e => e.save());
                const updatedAppointment = await BookAppointmentModel.findByIdAndUpdate(id, newData, {
                    new: true,
                });
                res.status(200).json({
                    message: "Appointment updated successfully",
                    updatedAppointment,
                });
            }
        }
    }
    catch (error) {
        // console.error("Error upding appiontment", error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}
module.exports = Edit