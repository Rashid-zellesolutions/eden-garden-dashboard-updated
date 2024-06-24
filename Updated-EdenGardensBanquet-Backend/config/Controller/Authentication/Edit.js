const UserModel = require("../../Model/UserSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const User = await UserModel.findById(id);
        if (!User) {
            return res.status(404).json({ status: 404, message: "User not found" });
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "User Information Update Successfully",
                updatedUser,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating EventScap", error: err });
    }
}
module.exports = Edit