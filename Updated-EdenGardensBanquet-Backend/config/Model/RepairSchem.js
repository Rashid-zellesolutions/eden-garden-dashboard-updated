const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema(
    {
        repairId: {
            type: String,
            // unique: true
        },
        rep: {
            type: String,
            unique: true
        },
        repair: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)
RepairSchema.pre("save", async function (next) {
    // Only generate a custom ID if this is a new store (not updating an existing one)
    if (this.isNew) {
        try {
            // Find the last store in the database to determine the next custom ID
            const lastStore = await this.constructor
                .findOne({}, { repairId: 1 })
                .sort({ repairId: -1 })
                .limit(1);

            // If there are no stores yet, start with BK0001
            let newIdNumber = 1;
            if (lastStore && lastStore.repairId) {
                const lastId = parseInt(lastStore.repairId.replace("RP", ""), 10);
                newIdNumber = lastId + 1;
            }

            // Pad the ID with zeros to achieve the desired format (e.g., Bk0001)
            const newId = `RP${String(newIdNumber).padStart(4, "0")}`;
            this.repairId = newId;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        // If this is not a new store, just proceed with the save operation
        next();
    }
});
const RepairModel = mongoose.model("Repair", RepairSchema);
module.exports = RepairModel;