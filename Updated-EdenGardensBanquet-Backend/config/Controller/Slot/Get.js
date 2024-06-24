const BookingDateModel = require("../../Model/SlotSchema");
const GetAllBookingDate = async (req, res) => {
  try {
    const BookingDate = await BookingDateModel.find();
    if (!BookingDate) {
      res.status(400).json({
        message: "BookingDate not available",
      });
      return;
    } else {
      res.json(BookingDate);
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving SLot", error: err });
  }
};

module.exports = GetAllBookingDate;