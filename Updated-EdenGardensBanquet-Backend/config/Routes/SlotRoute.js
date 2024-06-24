const express = require("express");
const Add = require("../Controller/Slot/Add");
const Get = require("../Controller/Slot/Get");
const router = express.Router();

//Add
router.post("/Add", Add);

//Get
router.post("/Get", Get);

module.exports = router;
