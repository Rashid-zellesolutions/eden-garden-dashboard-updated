const express = require("express");
const AppointmentEmailSender = require("../Controller/AppointmentEmailSend");

const router = express.Router();

//Add
router.post("/AppointmentEmailSend", AppointmentEmailSender);


module.exports = router;
