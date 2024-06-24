const BookAppointmentModel = require("../../Model/BookAppointmentSchema");
const Get = async (req, res) => {
    try {
        const Appointment = await BookAppointmentModel.find();
        if (!Appointment) {
            res.status(400).json({
                message: "Appointment not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Appointment });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Appointment", error: err });
    }
};

module.exports = Get;