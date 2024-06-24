
const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    venue: {
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

const SlotModel = mongoose.model("slot", SlotSchema);
module.exports = SlotModel;
