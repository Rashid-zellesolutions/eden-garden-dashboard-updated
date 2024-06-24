const express = require("express");
const AddPayment = require("../Controller/PaymentHistory/AddHistory");
const SinglePayment = require("../Controller/PaymentHistory/SinglePayment");
const GetAllPayment = require("../Controller/PaymentHistory/GetAllPayment");
const router = express.Router();

//Add
router.put("/AddPayment/:id", AddPayment);
//Single Payment
router.get("/SinglePayment/:id", SinglePayment);
//Get All Payment
router.get("/GetAllPayment", GetAllPayment);
module.exports = router;