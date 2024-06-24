const express = require("express");
const Add = require("../Controller/Repair/Add");
const Edit = require("../Controller/Repair/Edit");
const Get = require("../Controller/Repair/Get");
const Delete = require("../Controller/Repair/Delete");
const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", Get);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);
module.exports = router