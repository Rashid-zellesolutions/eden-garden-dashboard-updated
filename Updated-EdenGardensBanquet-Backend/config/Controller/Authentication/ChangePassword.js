const UserModel = require("../../Model/UserSchema");
const bcryptjs = require("bcryptjs");

const ChangePassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        const isPasswordMatch = await bcryptjs.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ status: 401, message: "Incorrect old password" });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ status: 400, message: "New passwords do not match" });
        }

        const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ status: 200, message: "Password successfully changed" });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};

module.exports = ChangePassword;
