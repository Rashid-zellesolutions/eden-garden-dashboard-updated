const express = require("express");
const Add = require("../Controller/BookAppointment/Add");
const Get = require("../Controller/BookAppointment/Get");
const Delete = require("../Controller/BookAppointment/Delete");
const Edit = require("../Controller/BookAppointment/Edit");

const router = express.Router();

//Add
router.post("/Add", Add);
//Check
// router.post("/CheckBooking", CheckBooking);
//Get
router.get("/Get", Get);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);
//Delete
// router.post("/CompleteBooking", CompleteBooking);

module.exports = router;
