const RoleModel = require("../../Model/RoleSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Roles = await RoleModel.findById(id);
        if (!Roles) {
            return res.status(404).json({ status: 404, message: "Roles not found" });
        } else {
            const updatedRoles = await RoleModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Roles Updated Successfully",
                updatedRoles,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Roles", error: err });
    }
}
module.exports = Edit