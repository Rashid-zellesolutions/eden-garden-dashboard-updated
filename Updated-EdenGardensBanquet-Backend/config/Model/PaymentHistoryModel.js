const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {

        recived: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        paymentHistory: [{
            ref: {
                type: String,
                required: true,
            },
            date: { type: String },
            amount: { type: Number },
            balance: { type: Number },
            paymentType: { type: String },
            accountType: { type: String },
            paymentNote: { type: String },
            amountReceiver: { type: String },
            custom: { type: String },
        }]
    },
    { timestamps: true }
)
const PaymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;