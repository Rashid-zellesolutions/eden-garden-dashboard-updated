const express = require("express");
const Add = require("../Controller/Services/Add");
const Get = require("../Controller/Services/Get");
const Edit = require("../Controller/Services/Edit");
const Delete = require("../Controller/Services/Delete");
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