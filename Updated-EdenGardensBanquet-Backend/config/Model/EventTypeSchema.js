const mongoose = require("mongoose");

const EventTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        iconOnePath: {type: String, required: true},
        iconOneName: {type: String, required: true},
        iconTwoPath: {type: String, required: true},
        iconTwoName: {type: String, required: true},
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)
const EventType = mongoose.model("EventType", EventTypeSchema);
module.exports = EventType;