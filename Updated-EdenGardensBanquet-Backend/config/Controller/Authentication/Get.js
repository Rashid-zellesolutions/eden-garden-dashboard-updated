const UserModel = require("../../Model/UserSchema");
const Get = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            res.status(400).json({
                message: "users not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, users });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users", error: err });
    }
};

module.exports = Get;