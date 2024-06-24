const RepairModel = require("../../Model/RepairSchem");
const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Repair = await RepairModel.findById(id);
        if (!Repair) {
            return res.status(404).json({ status: 404, message: "Repair not found" });
        } else {
            const updatedRepair = await RepairModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Repair Rpdated Successfully",
                updatedRepair,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Repair", error: err });
    }
}
module.exports = Edit