
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slots: [
      {
        slot: {
          type: String,
          required: true,
        },
        availability: {
          type: String,
          required: true,
        },
      },
    ],
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchema);
module.exports = AppointmentModel;
