const VendorsModel = require("../../Model/VendorsSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Vendors = await VendorsModel.findById(id);
        if (!Vendors) {
            return res.status(404).json({ message: "Vendors not found" });
        } else {
            await VendorsModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Vendors deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Vendors", error: err });
    }
};

module.exports = Delete;