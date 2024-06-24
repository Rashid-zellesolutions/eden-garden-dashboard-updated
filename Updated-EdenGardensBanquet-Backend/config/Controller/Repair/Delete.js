const RepairModel = require("../../Model/RepairSchem");

const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Repair = await RepairModel.findById(id);
        if (!Repair) {
            return res.status(404).json({ message: "Repair not found" });
        } else {
            await RepairModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Repair deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Repair", error: err });
    }
};

module.exports = Delete;