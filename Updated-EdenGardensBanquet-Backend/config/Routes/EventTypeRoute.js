const express = require("express");
const Add = require('../Controller/EventType/Add')
const Get = require("../Controller/EventType/Get");
const Edit = require("../Controller/EventType/Edit");
const Delete = require("../Controller/EventType/Delete");
const SingleEvent = require("../Controller/EventType/SingleEvent")
// const dynamicUploads = require("../midlewares/image-uploads-multer");
const {dynamicMulter, handleFaildRequest} = require("../midlewares/multerMidleware");
// const dynamicUploads = require('../midlewares/image-uploads-multer')
const addEventMulter = dynamicMulter('/add-event/', ['iconOne', 'iconTwo'], 2, ['image/jpg', 'image/jpeg', 'image/png'], 5*1024*1024);

const router = express.Router();

//Add
router.post('/add-event', addEventMulter,  Add);
//Get
router.get("/get", Get);
// Single Get
router.get('/single-event/:id', SingleEvent)
//Edit
router.put("/edit-event/:id", addEventMulter, Edit);
//Delete
router.delete("/delete/:id", Delete);


module.exports = router;
