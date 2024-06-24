const SlotSchema = require("../../Model/SlotSchema");

const CheckBooking = async (req, res) => {
  const { date, venue } = req.body;

  // Check if nameSlot or date is missing
  if (!date || !venue) {
    return res.json({
      message: "Required Booking parameters are missing",
    });
  }

  try {
    // Check if the date already exists in the database
    const existingBooking = await SlotSchema.find({
      date,
      venue,
    });

    if (existingBooking && existingBooking.length > 0) {
      return res.json({ status: 200, data: existingBooking });
    }
    // If the date doesn't exist, add it to the database
    const data = { date, venue };

    res.json({
      status: 500,
      message: "Please create a slot this date",
    });
  } catch (error) {
    console.error("Error adding booking date:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = CheckBooking;
