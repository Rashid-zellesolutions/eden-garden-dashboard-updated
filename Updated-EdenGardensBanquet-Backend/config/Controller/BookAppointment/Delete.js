const BookAppointmentModel = require("../../Model/BookAppointmentSchema");
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const Appointment = await BookAppointmentModel.findById(id);
    if (!Appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    } else {
      await BookAppointmentModel.findByIdAndDelete(id);
      res.json({ message: "Appointment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Content", error: err });
  }
};

module.exports = Delete;