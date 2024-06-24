
const mongoose = require("mongoose");

const SuppliesSchema = new mongoose.Schema(
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

const SuppliesModel = mongoose.model("Supplies", SuppliesSchema);
module.exports = SuppliesModel;
