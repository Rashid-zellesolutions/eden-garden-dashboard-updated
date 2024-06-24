const SuppliesModel = require("../../Model/SuppliesSchema");
const GetAll = async (req, res) => {
    try {
        const Supplies = await SuppliesModel.find();
        if (!Supplies) {
            res.status(400).json({
                message: "Supplies not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Supplies });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Supplies", error: err });
    }
};

module.exports = GetAll;