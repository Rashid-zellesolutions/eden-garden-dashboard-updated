const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    BookingId: {
      type: String,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    selectedSlot: {
      type: Array,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    minPerson: {
      type: String,
      required: true,
    },
    maxPerson: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
