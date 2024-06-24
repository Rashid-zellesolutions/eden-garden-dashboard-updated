const express = require("express");
const Add = require("../Controller/Vendors/Add");
const GetAll = require("../Controller/Vendors/Get");
const Edit = require("../Controller/Vendors/Edit");
const Delete = require("../Controller/Vendors/Delete");
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