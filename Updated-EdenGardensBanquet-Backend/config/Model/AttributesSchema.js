const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
    {
        AttributeId: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        attribute: {
            type: Array,
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
AttributeSchema.pre("save", async function (next) {
    // Only generate a custom ID if this is a new store (not updating an existing one)
    if (this.isNew) {
        try {
            // Find the last store in the database to determine the next custom ID
            const lastStore = await this.constructor
                .findOne({}, { AttributeId: 1 })
                .sort({ AttributeId: -1 })
                .limit(1);

            // If there are no stores yet, start with BK0001
            let newIdNumber = 1;
            if (lastStore && lastStore.AttributeId) {
                const lastId = parseInt(lastStore.AttributeId.replace("SER", ""), 10);
                newIdNumber = lastId + 1;
            }

            // Pad the ID with zeros to achieve the desired format (e.g., Bk0001)
            const newId = `SR${String(newIdNumber).padStart(4, "0")}`;
            this.AttributeId = newId;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        // If this is not a new store, just proceed with the save operation
        next();
    }
});
const AttributeModel = mongoose.model("Attribute", AttributeSchema);
module.exports = AttributeModel;