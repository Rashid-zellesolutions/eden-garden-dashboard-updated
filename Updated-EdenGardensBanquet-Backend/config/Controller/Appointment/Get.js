const Appointmentmodel = require("../../Model/AppointmentSchema");
const GetAll = async (req, res) => {
    try {
        const Appointment = await Appointmentmodel.find();
        if (!Appointment) {
            res.status(400).json({
                message: "Appointment not available",
            });
            return;
        } else {
            res.status(200).json(Appointment);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Appointment", error: err });
    }
};

module.exports = GetAll;