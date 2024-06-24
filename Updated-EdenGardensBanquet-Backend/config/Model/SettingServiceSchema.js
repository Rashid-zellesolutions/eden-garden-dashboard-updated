const mongoose = require("mongoose");

const SettingServiceSchema = new mongoose.Schema(
    {
        // SettingServiceId: {
        //     type: String,
        //     unique: true
        // },
        category: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        attributes: {
            type: Array
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
const SettingServiceModel = mongoose.model("SettingService", SettingServiceSchema);
module.exports = SettingServiceModel;