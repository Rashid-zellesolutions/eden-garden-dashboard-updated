const UserModel = require("../../Model/UserSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await UserModel.findById(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        } else {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "User deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting User", error: err });
    }
};

module.exports = Delete;