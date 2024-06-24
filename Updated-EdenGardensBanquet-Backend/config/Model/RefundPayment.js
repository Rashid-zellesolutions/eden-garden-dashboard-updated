const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema(
    {

        date: {
            type: String,
            required: true
        },
        approvedby: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            required: true
        },
        account: {
            type: String,
        },
        total: {
            type: Number,
            required: true
        },
        cancelledFee: {
            type: Number,
            required: true
        },
        refundAmount: {
            type: Number,
            // required: true
        },
        reason: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const RefundModel = mongoose.model("Refund", RefundSchema);
module.exports = RefundModel;