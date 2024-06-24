const SlotModel = require("../../Model/SlotSchema");

const AddSlot = async (req, res) => {
  const { slots, date, venue } = req.body;

  // Check if slots, date, or venue is missing
  if (!slots || !date || !venue) {
    return res.json({
      message: "Required parameters are missing",
    });
  }

  try {
    // Check if the date already exists in the database
    let existingSlot = await SlotModel.findOne({
      date,
      venue,
    });

    if (existingSlot) {
      // If the date exists, add new slots to the existing entry
      existingSlot.slots.push(...slots);
      existingSlot = await existingSlot.save();

      return res.json({
        status: 200,
        message: "New slots added successfully",
        Slot: existingSlot,
      });
    }

    // If the date doesn't exist, create a new entry in the database with the provided slots
    const data = { slots, date, venue };
    const newSlot = await SlotModel.create(data);

    res.json({
      status: 200,
      message: "Slots added successfully",
      Slot: newSlot,
    });
  } catch (error) {
    console.error("Error adding/updating slots:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = AddSlot;
