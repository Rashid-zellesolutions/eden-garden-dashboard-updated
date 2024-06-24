
const mongoose = require("mongoose");

const VendorsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            //   required: true,
        },
        addedBy: {
            type: String,
            //   required: true,
        },
    },
    { timestamps: true }
);

const VendorsModel = mongoose.model("Vendors", VendorsSchema);
module.exports = VendorsModel;
