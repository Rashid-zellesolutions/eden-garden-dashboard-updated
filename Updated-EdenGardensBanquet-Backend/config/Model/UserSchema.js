const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    }, 
    profileImageName: {
      type: String,
      required: true,
    },
    profileImagePath: {type: String, required: true},
    lastLogin: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin'
    }, 
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
