const BookingModel = require("../../Model/BookingSchema");
const SlotModel = require("../../Model/SlotSchema");
const Edit = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const Booking = await BookingModel.findById(id);
    if (!Booking) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      const existingSlots = await SlotModel.find({
        date: Booking.selectedDate,
        venue: Booking.venue,
      });
      if (existingSlots) {

        if (newData.Status === "Cancelled") {
          // Filter out slots that were already booked before
          const bookedSlots = Booking?.selectedSlot || [];
          const slotsToUpdate = existingSlots
            .flatMap(e => e.slots)
            .filter(slot => bookedSlots.includes(slot.slot));

          // Set the availability to "yes" for the remaining slots
          slotsToUpdate.forEach(slot => {
            slot.availability = "yes";
          });
          // console.log(bookedSlots.includes("Full Day"));
          // If it was a Full Day booking, set the availability of all slots to "yes"
          if (bookedSlots.includes("Full Day")) {
            existingSlots.forEach(e => {
              e.slots.forEach(slot => {
                console.log(slot);
                slot.availability = "yes";
              });
            });
          }
        }
        await Promise.all(existingSlots.map((e) => e.save()));
        const updatedBooking = await BookingModel.findByIdAndUpdate(id, newData, {
          new: true,
        });
        res.json({
          message: "Booking updated successfully",
          updatedBooking,
        });
        // res.json({ message: "helo" })
      }
      else {
        res.status(500).json({ message: "Slots Not Found" })
      }
    }

  } catch (err) {
    res.status(500).json({ message: "Error updating conetent", error: err });
  }
};

module.exports = Edit;