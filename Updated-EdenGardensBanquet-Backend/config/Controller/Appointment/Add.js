const AppointmentModel = require("../../Model/AppointmentSchema");

const AddSlot = async (req, res) => {
  const { slots, date, name } = req.body;

  // Check if slots, date, or name is missing
  if (!slots || !date || !name) {
    return res.json({
      message: "Required parameters are missing",
    });
  }

  try {
    // Check if the date already exists in the database
    let existingSlot = await AppointmentModel.findOne({
      date,
      name,
    });

    if (existingSlot) {
      // If the date exists, add new slots to the existing entry
      existingSlot.slots.push(...slots);
      existingSlot = await existingSlot.save();

      return res.json({
        status: 200,
        message: "New AppointmentSlot added successfully",
        Slot: existingSlot,
      });
    }

    // If the date doesn't exist, create a new entry in the database with the provided slots
    const data = { slots, date, name };
    const newSlot = await AppointmentModel.create(data);

    res.json({
      status: 200,
      message: "AppointmentSlot added successfully",
      Slot: newSlot,
    });
  } catch (error) {
    console.error("Error adding/updating AppointmentSlot:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = AddSlot;
