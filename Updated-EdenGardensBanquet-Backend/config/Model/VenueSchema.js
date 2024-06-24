const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        capacity: {
            type: String,
            required: true
        },
        venueImageName: {
            type: String,
            required: true
        },
        venueImagePath: {
            type: String,
            required: true
        },
        fixedCharges: {
            type: String,
            required: true
        },
        personCharges: {
            type: String,
            required: true
        },
    
    },
    { timestamps: true }
)
const VenueModel = mongoose.model("Venue", VenueSchema);
module.exports = VenueModel;