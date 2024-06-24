const mongoose = require("mongoose");

const BookAppointmentSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
        },
        appointmentId: {
            type: String,
        },
        slot: {
            type: String
        },
        appointmentDate: {
            type: String
        },
        appointmentName: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String,
        },
        city: {
            type: String,
        },
        eventType: {
            type: String,
        },

    },
    { timestamps: true }
);
//  mongoose.model("BookAppointment", BookAppointmentSchema);

BookAppointmentSchema.pre("save", async function (next) {
    // Only generate a custom ID if this is a new store (not updating an existing one)
    if (this.isNew) {
        try {
            // Find the last store in the database to determine the next custom ID
            const lastStore = await this.constructor
                .findOne({}, { appointmentId: 1 })
                .sort({ appointmentId: -1 })
                .limit(1);

            // If there are no stores yet, start with BK0001
            let newIdNumber = 1;
            if (lastStore && lastStore.appointmentId) {
                const lastId = parseInt(lastStore.appointmentId.replace("APM", ""), 10);
                newIdNumber = lastId + 1;
            }

            // Pad the ID with zeros to achieve the desired format (e.g., Bk0001)
            const newId = `Bk${String(newIdNumber).padStart(4, "0")}`;
            this.appointmentId = newId;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        // If this is not a new store, just proceed with the save operation
        next();
    }
});



const BookAppointmentModel = mongoose.model("bookApppointment", BookAppointmentSchema);
module.exports = BookAppointmentModel;