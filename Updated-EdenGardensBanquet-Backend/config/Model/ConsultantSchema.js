
const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema(
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

const ConsultantModel = mongoose.model("Consultant", ConsultantSchema);
module.exports = ConsultantModel;
