const express = require("express");
const Add = require("../Controller/Venue/Add");
const Get = require("../Controller/Venue/Get");
const Single = require("../Controller/Venue/Single")
const Edit = require("../Controller/Venue/Edit");
const Update = require('../Controller/Venue/Update')
const Delete = require("../Controller/Venue/Delete");
const { dynamicMulter} = require("../midlewares/multerMidleware");
// const addVenueMulter = dynamicMulter('add-venue', ['venueImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 5*1024*1024);
const router = express.Router();

const addVenueMulter = dynamicMulter(
    '/venue', 
    ['venueImage'],
    1, 
    ['image/jpg', 'image/jpeg', 'image/png'], 
    5*1024*1024
);

//Add
router.post("/add-venue", addVenueMulter, Add);
//Get
router.get("/get", Get);
// Single Get
router.get('/single-venue/:id', Single);
//Edit
router.put("/update-venue/:id", addVenueMulter, Update);
//Delete
router.delete("/delete/:id", Delete);

module.exports = router;
