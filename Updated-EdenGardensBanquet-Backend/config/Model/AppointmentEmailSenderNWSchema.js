const mongoose = require("mongoose");

const AppEmailSenderNW = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    selectedAppointDate:{
      type: String,
      required: true,
    },
    selectedAppointSlot:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);
const AppEmailSenderNWSchema = mongoose.model("AppEmailSenderNW", AppEmailSenderNW);
module.exports = AppEmailSenderNWSchema;
