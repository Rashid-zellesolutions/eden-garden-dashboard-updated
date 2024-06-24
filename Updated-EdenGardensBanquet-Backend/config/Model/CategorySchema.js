const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
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
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;