const express = require("express");
const Add = require("../Controller/Booking/Add");
const GetAllBooking = require("../Controller/Booking/Get");
const Edit = require("../Controller/Booking/Edit");
const Delete = require("../Controller/Booking/Delete");
const CheckBooking = require("../Controller/Booking/CheckBooking");
const CompleteBooking = require("../Controller/Booking/CompleteBooking");
const router = express.Router();

//Add
router.post("/Add", Add);
//Check
router.post("/CheckBooking", CheckBooking);
//Get
router.get("/Get", GetAllBooking);
//Edit
router.put("/Edit/:id", Edit);
//Delete
router.delete("/Delete/:id", Delete);
//Delete
router.post("/CompleteBooking", CompleteBooking);

module.exports = router;
