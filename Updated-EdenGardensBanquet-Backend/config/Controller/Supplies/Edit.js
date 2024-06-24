const SuppliesModel = require("../../Model/SuppliesSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Supplies = await SuppliesModel.findById(id);
        if (!Supplies) {
            return res.status(404).json({ status: 404, message: "Supplies not found" });
        } else {
            const updatedSupplies = await SuppliesModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Supplies Updated Successfully",
                updatedSupplies,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Supplies", error: err });
    }
}
module.exports = Edit