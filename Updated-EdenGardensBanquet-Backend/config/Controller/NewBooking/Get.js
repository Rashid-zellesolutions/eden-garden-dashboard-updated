const NewBookingModel = require("../../Model/NewBookingSchema");
const Get = async (req, res) => {
  try {
    const Booking = await NewBookingModel.find();
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

module.exports = Get;