const Vendorsmodel = require("../../Model/VendorsSchema");
const GetAll = async (req, res) => {
    try {
        const Vendors = await Vendorsmodel.find();
        if (!Vendors) {
            res.status(400).json({
                message: "Vendors not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Vendors });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Vendors", error: err });
    }
};

module.exports = GetAll;