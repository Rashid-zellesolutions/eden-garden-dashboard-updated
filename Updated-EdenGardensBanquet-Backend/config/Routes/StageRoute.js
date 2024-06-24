const express = require("express");
const Add = require("../Controller/Stage/Add");
const Get = require("../Controller/Stage/Get");
const Edit = require("../Controller/Stage/Edit");
const Delete = require("../Controller/Stage/Delete");

const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", Get);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);

module.exports = router;
