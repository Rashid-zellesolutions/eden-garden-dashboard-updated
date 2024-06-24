const EventType = require("../../Model/EventTypeSchema");

const add = async (req, res) => {
    const { name, type } = req.body;
    const iconOne = req.files['iconOne'];
    const iconTwo = req.files['iconTwo'];
    if (!name || !type || !iconOne || !iconTwo) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    console.log(req.file);

  try {
    const event = new EventType({
        name,
        type,
        iconOneName: iconOne[0].originalname,
        iconOnePath: `/uploads/add-event/${iconOne[0].filename}`,
        iconTwoName: iconTwo[0].originalname,
        iconTwoPath: `/uploads/add-event/${iconTwo[0].filename}`,
      });
    await event.save()
    res.status(201).json({
      success: true,
      message: "Event type added successfully",
      data: event
    });
  } catch (error) {
    console.error("Error Adding EventType", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = add;
