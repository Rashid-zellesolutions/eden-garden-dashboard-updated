const express = require("express");
const Signup = require("../Controller/Authentication/Signup");
const Login = require("../Controller/Authentication/Login");
const SignOut = require("../Controller/Authentication/SignOut");
const Get = require("../Controller/Authentication/Get");
const Edit = require("../Controller/Authentication/Edit");
const Delete = require("../Controller/Authentication/Delete");
const SingleGet = require("../Controller/Authentication/SingleGet");
const ChangePassword = require("../Controller/Authentication/ChangePassword");

const router = express.Router();

router.post("/Signup", Signup);

router.post("/Login", Login);

router.get("/logout", SignOut);

router.get("/Get", Get);

router.put("/Edit/:id", Edit);

router.delete("/Delete/:id", Delete);

router.get("/SingleGet/:id", SingleGet);

router.post("/ChangePassword/:id", ChangePassword);

module.exports = router;
