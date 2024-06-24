const express = require("express");
const Add = require("../Controller/EventScap/Add");
const Get = require("../Controller/EventScap/Get");
const Edit = require("../Controller/EventScap/Edit");
const Delete = require("../Controller/EventScap/Delete");

const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", Get);
//Edit
router.put("/Edit/:id", Edit);
//Edit
router.delete("/Delete/:id", Delete);
module.exports = router;