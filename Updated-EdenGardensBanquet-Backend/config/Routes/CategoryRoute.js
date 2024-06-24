const express = require("express");
const Add = require("../Controller/Category/Add");
const Get = require("../Controller/Category/Get");
const Edit = require("../Controller/Category/Edit");
const Delete = require("../Controller/Category/Delete");
const SingleGet = require("../Controller/Category/SingleGet");
const router = express.Router();

//Add
router.post("/Add", Add);
//Get
router.get("/Get", Get);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);
//Single Get
router.get("/SingleGet/:id", SingleGet);
module.exports = router