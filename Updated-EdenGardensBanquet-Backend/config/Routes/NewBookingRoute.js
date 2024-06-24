const express = require("express");
const Add = require("../Controller/NewBooking/Add");
const Get = require("../Controller/NewBooking/Get");
const Edit = require("../Controller/NewBooking/Edit");
const Delete = require("../Controller/NewBooking/Delete");
const GetSingle = require("../Controller/NewBooking/GetSingle");
const router = express.Router();

//Add
router.post("/Add", Add);

//Get
router.get("/Get", Get);

//Edit
router.post("/Edit/:id", Edit);

//Delete
router.delete("/Delete/:id", Delete);
//Delete
router.get("/GetSingle/:id", GetSingle);

module.exports = router;
