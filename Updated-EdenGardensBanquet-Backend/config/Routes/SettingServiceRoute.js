const express = require("express");
const Add = require("../Controller/SettingService/Add");
const Get = require("../Controller/SettingService/Get");
const Edit = require("../Controller/SettingService/Edit");
const Delete = require("../Controller/SettingService/Delete");
const SingleGet = require("../Controller/SettingService/SingleGet");
const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", Get);
// //Edit
router.put("/Edit/:id", Edit);
// //Delete
router.delete("/Delete/:id", Delete);
// //Single Get
router.delete("/SingleGet/:id", SingleGet);
module.exports = router