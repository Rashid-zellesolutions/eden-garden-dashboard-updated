const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        addedBy: {
            type: String,
            required: true
        },
        updatedBy: {
            type: String,
        }
    },
    { timestamps: true }
)
const StageModel = mongoose.model("Stage", StageSchema);
module.exports = StageModel;