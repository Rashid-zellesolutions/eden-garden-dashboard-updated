const SettingServicesModel = require("../../Model/SettingServiceSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    console.log(newData);
    try {
        const Services = await SettingServicesModel.findById(id);
        if (!Services) {
            return res.status(404).json({ status: 404, message: "Services not found" });
        } else {
            const updatedServices = await SettingServicesModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Services updated Successfully",
                updatedServices,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Services", error: err });
    }
}
module.exports = Edit