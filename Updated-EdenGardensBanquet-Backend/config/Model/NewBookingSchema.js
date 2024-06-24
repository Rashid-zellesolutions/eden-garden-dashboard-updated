const mongoose = require("mongoose");

const NewBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true
    },
    inv: {
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
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    venue: {
      type: Array,
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
    note: {
      type: String,
      // required: true,
    },
    createAt: {
      type: String,
    },
    updated: {
      type: String,
      // required: true,
    },
    capacity: {
      type: Number,
    },
    venueUnitPrice: {
      type: Number,
    },
    Services: {
      type: Array
    },
    inventory: {
      type: Array
    },
    custom: {
      type: Array,
    },
    summary: {
      subTotal: {
        type: Number,
      },
      tip: {
        type: Number,
      },
      tipType: {
        type: String,
      },
      tax: {
        type: Number,
      },
      discountType: {
        type: String,
      },
      discount: {
        type: String,
      },
      total: {
        type: Number,
      },
    },
    venueCharges: {
      type: Number
    },
    stage: {
      type: String
    }
  },
  { timestamps: true }
);
//  mongoose.model("NewBooking", NewBookingSchema);

NewBookingSchema.pre("save", async function (next) {
  // Only generate a custom ID if this is a new store (not updating an existing one)
  if (this.isNew) {
    try {
      // Find the last store in the database to determine the next custom ID
      const lastStore = await this.constructor
        .findOne({}, { bookingId: 1 })
        .sort({ bookingId: -1 })
        .limit(1);

      // If there are no stores yet, start with BK0001
      let newIdNumber = 1;
      if (lastStore && lastStore.bookingId) {
        const lastId = parseInt(lastStore.bookingId.replace("Bk", ""), 10);
        newIdNumber = lastId + 1;
      }

      // Pad the ID with zeros to achieve the desired format (e.g., Bk0001)
      const newId = `Bk${String(newIdNumber).padStart(4, "0")}`;
      this.bookingId = newId;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    // If this is not a new store, just proceed with the save operation
    next();
  }
});



const NewBookingModel = mongoose.model("NewSlotsBooking", NewBookingSchema);
module.exports = NewBookingModel;