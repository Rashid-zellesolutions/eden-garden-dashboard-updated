const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required:true,
      unique: true
    },
    accessType: {
      type: String,
      required: true,
    },
    access: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const RoleModel = mongoose.model("Role", RoleSchema);
module.exports = RoleModel;
