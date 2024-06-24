const express = require("express");
const EmailSubscribe = require("../Controller/EmailSubscribe");

const router = express.Router();

//Add
router.post("/EmailSubscribe", EmailSubscribe);


module.exports = router;
