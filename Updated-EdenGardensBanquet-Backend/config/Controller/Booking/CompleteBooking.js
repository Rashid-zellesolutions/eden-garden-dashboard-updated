// Complete.js
const BookingModel = require("../../Model/BookingSchema");

const CompleteBooking = async (req, res) => {
  try {
    const { selectedDate } = req.body;

    // Check if required parameters are missing
    if (!selectedDate) {
      return res.json({
        status: 400,
        message: "Missing selectedDate parameter",
      });
    }

    // Update the status of bookings with the selectedDate to "Completed"
    const result = await BookingModel.updateMany(
      { selectedDate },
      { $set: { Status: "Completed" } }
    );

    res.json({
      status: 200,
      message: `Successfully completed ${result.nModified} bookings for selected date`,
    });
  } catch (error) {
    console.error("Error completing bookings", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = CompleteBooking;
