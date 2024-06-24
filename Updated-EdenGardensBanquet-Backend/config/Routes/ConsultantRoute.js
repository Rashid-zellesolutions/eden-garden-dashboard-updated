const express = require("express");
const Add = require("../Controller/Consultant/Add");
const GetAll = require("../Controller/Consultant/Get");
const Edit = require("../Controller/Consultant/Edit");
const Delete = require("../Controller/Consultant/Delete");
const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", GetAll);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);
module.exports = router