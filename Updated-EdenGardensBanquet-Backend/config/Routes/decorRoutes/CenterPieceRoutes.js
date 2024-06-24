const express = require('express');
const Add = require('../../Controller/Decor/centerPieces/Add');
const Get = require('../../Controller/Decor/centerPieces/Get');
const GetSingleData = require('../../Controller/Decor/centerPieces/GetSingle');
const Update = require('../../Controller/Decor/centerPieces/Update');
const Delete = require('../../Controller/Decor/centerPieces/Delete');

// Multer Midleware
const {dynamicMulter} = require('../../midlewares/multerMidleware');
// const {dynamicMulter, handleFaildRequest} = require('../../midlewares/multerMidleware');

const router = express.Router();
const addCenterMidlware = dynamicMulter('/Decor/Centerpieces', ['centerpieceImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);
// const addCenterPieceMidlware = dynamicMulter('/Decor/Center-Piece', ['centerpieceImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

router.post('/add-centerpiece', addCenterMidlware,  Add);
router.get('/get-centerpiece-data', Get);
router.get('/get-single-centerpiece/:id', GetSingleData)
router.put('/update-centerpiece/:id', addCenterMidlware, Update);
router.delete('/delete-centerpiece/:id', Delete)

module.exports = router;
