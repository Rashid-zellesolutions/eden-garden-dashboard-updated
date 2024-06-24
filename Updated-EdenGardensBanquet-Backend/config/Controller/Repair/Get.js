const RepairModel = require("../../Model/RepairSchem");

const Get = async (req, res) => {
    try {
        const Repair = await RepairModel.find();
        if (!Repair) {
            res.status(400).json({
                message: "Repair not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Repair });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Repair", error: err });
    }
};

module.exports = Get;