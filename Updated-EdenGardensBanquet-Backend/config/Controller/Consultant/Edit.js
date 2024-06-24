const ConsultantModel = require("../../Model/ConsultantSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Consultant = await ConsultantModel.findById(id);
        if (!Consultant) {
            return res.status(404).json({ status: 404, message: "Consultant not found" });
        } else {
            const updatedConsultant = await ConsultantModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Consultant Updated Successfully",
                updatedConsultant,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Consultant", error: err });
    }
}
module.exports = Edit