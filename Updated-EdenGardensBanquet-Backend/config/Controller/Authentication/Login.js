const UserModel = require("../../Model/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ status: 400, message: "Required fields are missing" });
  }

  try {
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }

    bcryptjs.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ status: 500, message: "Password comparison error" });
      }

      if (!result) {
        return res.status(401).json({ status: 401, message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          username: user.userName,
          userName: user.userName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      let obj = {
        username: user.userName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: token,
        profileImage: user.profileImage,
        lastLogin: user.lastLogin,
      };
      return res.status(200).json({
        status: 200,
        message: "successfully login",
        data: obj,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: 500, message: "An error occurred during login" });
  }
};

module.exports = Login;
