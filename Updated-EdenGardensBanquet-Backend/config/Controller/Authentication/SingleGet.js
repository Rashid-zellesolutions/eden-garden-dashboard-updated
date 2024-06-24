const UserModel = require("../../Model/UserSchema");
const SingleGet = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await UserModel.findById(id);
        if (!User) {
            res.status(400).json({
                message: "User not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, User });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving User", error: err });
    }
};

module.exports = SingleGet;
