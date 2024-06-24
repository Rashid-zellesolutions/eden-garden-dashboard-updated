const express = require("express");
const Add = require("../Controller/Refund/Add");
const Get = require("../Controller/Refund/Get");

const router = express.Router();

//Add
router.post("/Add/:id", Add);
//Get
router.get("/Get", Get);
module.exports = router;