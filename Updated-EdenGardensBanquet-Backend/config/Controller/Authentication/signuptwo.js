const UserModel = require("../../Model/UserSchema");
const bcryptjs = require("bcryptjs");
const path = require('path');

const SignupTwo = async (req, res) => {
  const {fullName, userName, email, password, confirmpassword, idNumber, role, lastLogin, dateAdded} = req.body
  if(!fullName || !userName || !email || !password || !idNumber || !role || !dateAdded || !req.file){
    return res.status(400).json({message: "Required Fields Missing"})
  }else if(password != confirmpassword){
    return res.status(400).send({status: 400, message: "password not matched"})
  }else{
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userObj = UserModel({
      ...req.body,
      password: hashedPassword,
      profileImageName: req.file.originalname,
      profileImagePath: req.file.path
    });
  
    try {
      // Check if user exist
      const ifUserExist = await UserModel.find({email})

      if(ifUserExist.length > 0){
        return res.status(400).send({status: 400, message: "user already exist"});
      }else{
        const user = await UserModel.create(userObj);
        res.status(201).json({success: true, user});
      }
    } catch (err) {
      // Handle errors
      console.error("Error:", err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
};

module.exports = SignupTwo;


// const UserModel = require("../../Model/UserSchema");
// const bcryptjs = require("bcryptjs");
// const path = require('path')
// const Signup = async (req, res) => {
//   const { userName, fullName, email, password, confirmpassword, idNumber, role, lastLogin, dateAdded } = req.body;
//   if (  (!fullName || !email || !password || !confirmpassword || !idNumber || !role || !dateAdded || !userName) ) {
//     return res.json({ message: "Required field are missing" });
//   }  else if (password != confirmpassword) {
//     return res
//       .status(400)
//       .send({ status: 400, message: "Not Match Password" });
//   }  else {

//     const hashPassword = await bcryptjs.hash(password, 10);
//     const userObj = {
//       ...req.body,
//       password: hashPassword,
//     };
//     try {
//        const existingUsers = await UserModel.find({ email });

//       if (existingUsers.length > 0) {
//         res.status(400).send({ status: 400, message: "User Already Exists" });
//       } else { 
//         const user = await UserModel.create(userObj);
//         res.status(200).send({ status: 200, message: "User Successfully Registered", user });
//        }
//     } catch (err) {
//       res.send(err);
//     }
//   }
// };
// module.exports = Signup;