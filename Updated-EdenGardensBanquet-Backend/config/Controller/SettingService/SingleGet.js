const SettingServicesModel = require("../../Model/SettingServiceSchema");


const SingleGet = async (req, res) => {
    const { id } = req.params
    try {
        const Services = await SettingServicesModel.findById(id);
        if (!Services) {
            res.status(400).json({
                message: "Services not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Services });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Services", error: err });
    }
};

module.exports = SingleGet;