const BookingModel = require("../../Model/BookingSchema");
const GetAllBooking = async (req, res) => {
  try {
    const Booking = await BookingModel.find();
    if (!Booking) {
      res.status(400).json({
        message: "Booking not available",
      });
      return;
    } else {
      res.json(Booking);
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Booking", error: err });
  }
};

module.exports = GetAllBooking;