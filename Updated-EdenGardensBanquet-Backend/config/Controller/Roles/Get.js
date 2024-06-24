const RoleModel = require("../../Model/RoleSchema");

const GetAll = async (req, res) => {
    try {
        const Roles = await RoleModel.find();
        if (!Roles) {
            res.status(400).json({
                message: "Roles not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Roles });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Roles", error: err });
    }
};

module.exports = GetAll;