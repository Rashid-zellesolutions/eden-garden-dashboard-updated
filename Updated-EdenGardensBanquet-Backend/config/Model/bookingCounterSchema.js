const mongoose = require("mongoose");

const BookingCounterSchema = new mongoose.Schema({
  currentBookingNumber: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("BookingCounter", BookingCounterSchema);
