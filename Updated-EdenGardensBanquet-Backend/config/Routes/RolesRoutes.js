const express = require("express");
const Add = require("../Controller/Roles/Add");
const Edit = require("../Controller/Roles/Edit");
const Get = require("../Controller/Roles/Get");
const Delete = require("../Controller/Roles/Delete");
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