const ServicesModel = require("../../Model/ServicesSchema");


const Get = async (req, res) => {
    try {
        const Services = await ServicesModel.find();
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

module.exports = Get;