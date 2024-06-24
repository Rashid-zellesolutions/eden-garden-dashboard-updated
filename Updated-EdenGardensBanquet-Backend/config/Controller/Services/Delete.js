const ServicesModel = require("../../Model/ServicesSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Services = await ServicesModel.findById(id);
        if (!Services) {
            return res.status(404).json({ message: "Services not found" });
        } else {
            await ServicesModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Services deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Services", error: err });
    }
};

module.exports = Delete;