const ConsultantModel = require("../../Model/ConsultantSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Consultant = await ConsultantModel.findById(id);
        if (!Consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        } else {
            await ConsultantModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Consultant deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Consultant", error: err });
    }
};

module.exports = Delete;