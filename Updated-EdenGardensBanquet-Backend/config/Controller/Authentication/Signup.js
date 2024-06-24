const UserModel = require("../../Model/UserSchema");
const bcryptjs = require("bcryptjs");
const Signup = async (req, res) => {
  const { userName, fullName, email, password, confirmpassword, idNumber, profileImage, role, lastLogin, dateAdded } = req.body;
  if ((!fullName || !email || !password || !confirmpassword || !idNumber || !profileImage || !role || !dateAdded || !userName)) {
    return res.json({ message: "Required field are missing" });
  } else if (password != confirmpassword) {
    return res
      .status(400)
      .send({ status: 400, message: "Not Match Password" });
  } else {
    const hashPassword = await bcryptjs.hash(password, 10);
    const userObj = {
      ...req.body,
      password: hashPassword,
    };
    try {
      const existingUsers = await UserModel.find({ email });

      if (existingUsers.length > 0) {
        res.status(400).send({ status: 400, message: "User Already Exists" });
      } else {
        const user = await UserModel.create(userObj);
        res.status(200).send({ status: 200, message: "User Successfully Registered", user });
      }
    } catch (err) {
      res.send(err);
    }
  }
};
module.exports = Signup;
