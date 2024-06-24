const NewBookingModel = require("../../Model/NewBookingSchema");
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const Booking = await NewBookingModel.findById(id);
    if (!Booking) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      await NewBookingModel.findByIdAndDelete(id);
      res.json({ message: "Booking deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Content", error: err });
  }
};

module.exports = Delete;