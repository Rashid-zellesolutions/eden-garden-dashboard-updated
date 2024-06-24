const express = require('express');
const Add = require('../../Controller/Decor/BackdropAndMandap/Add');
const Get = require('../../Controller/Decor/BackdropAndMandap/Get');
const GetSingleData = require('../../Controller/Decor/BackdropAndMandap/GetSingle');
const Update = require('../../Controller/Decor/BackdropAndMandap/Update');
const Delete = require('../../Controller/Decor/BackdropAndMandap/Delete');

// Multer Midleware
const {dynamicMulter, handleFaildRequest} = require('../../midlewares/multerMidleware');

const router = express.Router();

const addMandapMidlware = dynamicMulter('/Decor/Backdrop-and-Mandap', ['backDropImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

router.post('/add-backdrop', addMandapMidlware, Add);
router.get('/get-backdrop-data', Get);
router.get('/get-single-backdrop/:id', GetSingleData)
router.put('/update-backdrop/:id', addMandapMidlware, Update);
router.delete('/delete-backdrop/:id', Delete)

module.exports = router;
