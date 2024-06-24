const express = require("express");
const Add = require("../Controller/Supplies/Add");
const GetAll = require("../Controller/Supplies/Get");
const Edit = require("../Controller/Supplies/Get");
const Delete = require("../Controller/Supplies/Delete");
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