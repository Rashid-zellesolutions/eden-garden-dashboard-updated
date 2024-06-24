const RoleModel = require("../../Model/RoleSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Roles = await RoleModel.findById(id);
        if (!Roles) {
            return res.status(404).json({ message: "Roles not found" });
        } else {
            await RoleModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Roles deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Roles", error: err });
    }
};

module.exports = Delete;