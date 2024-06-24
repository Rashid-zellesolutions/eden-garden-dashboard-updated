const SuppliesModel = require("../../Model/SuppliesSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Supplies = await SuppliesModel.findById(id);
        if (!Supplies) {
            return res.status(404).json({ message: "Supplies not found" });
        } else {
            await SuppliesModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Supplies deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Supplies", error: err });
    }
};

module.exports = Delete;