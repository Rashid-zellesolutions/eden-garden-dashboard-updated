const SettingServiceModel = require("../../Model/SettingServiceSchema");

const Add = async (req, res) => {
    const { category, name, addedBy, updatedBy, attributes } = req.body;
    // console.log(services.length > 0)
    // Check if required parameters are missing
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Required Service parameters are missing",
        });
    }
    try {
        const data = {
            category: category,
            name: name,
            addedBy: addedBy,
            updatedBy: updatedBy,
            attributes: attributes
        }
        const Serivce = await SettingServiceModel.create(data);
        res.status(200).json({
            status: 200,
            message: " Serivce Added Successfully",
            Serivce,

        });
    }
    catch (error) {
        console.error("Error Adding Serivce", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add