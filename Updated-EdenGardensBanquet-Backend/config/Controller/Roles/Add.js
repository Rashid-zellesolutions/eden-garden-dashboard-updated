const RoleModel = require("../../Model/RoleSchema");

const Add = async (req, res) => {
    const { role, accessType, access } = req.body;
    // console.log(name.length > 0)
    // Check if required parameters are missing
    if (!role || !accessType || !access) {
        return res.status(400).json({
            status: 400,
            message: "Required name parameter are missing",
        });
    }
    try {
        let roleCheck = await RoleModel.find({ role })
        if (roleCheck.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "this name is already exist",
            });
        }
        const data = {
            role: role,
            accessType : accessType,
            access: access,
        }
        const Roles = await RoleModel.create(data);
        res.status(200).json({
            status: 200,
            message: "Roles Added Successfully",
            Roles,

        });
    }
    catch (error) {
        console.error("Error Adding Roles", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add