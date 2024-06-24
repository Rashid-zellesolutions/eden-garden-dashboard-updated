const express = require("express");
const AddSlot = require("../Controller/Appointment/Add");
const GetAll = require("../Controller/Appointment/Get");
const CheckAppointment = require("../Controller/Appointment/Check");
const router = express.Router();

//Add
router.post("/Add", AddSlot);

//Get
router.get("/Get", GetAll);

//Check
router.post("/CheckAppointment", CheckAppointment);

module.exports = router;
