const Consultantmodel = require("../../Model/ConsultantSchema");
const GetAll = async (req, res) => {
    try {
        const Consultant = await Consultantmodel.find();
        if (!Consultant) {
            res.status(400).json({
                message: "Consultant not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Consultant });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Consultant", error: err });
    }
};

module.exports = GetAll;