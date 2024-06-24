const VendorsModel = require("../../Model/VendorsSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Vendors = await VendorsModel.findById(id);
        if (!Vendors) {
            return res.status(404).json({ status: 404, message: "Vendors not found" });
        } else {
            const updatedVendors = await VendorsModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Vendors Updated Successfully",
                updatedVendors,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Vendors", error: err });
    }
}
module.exports = Edit