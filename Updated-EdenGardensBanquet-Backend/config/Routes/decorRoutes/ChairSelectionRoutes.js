const express = require('express');
const Add = require('../../Controller/Decor/ChairSelection/Add');
const Get = require('../../Controller/Decor/ChairSelection/Get');
const GetSingleData = require('../../Controller/Decor/ChairSelection/GetSingle');
const Update = require('../../Controller/Decor/ChairSelection/Update');
const Delete = require('../../Controller/Decor/ChairSelection/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');

const router = express.Router();

const addChairMidlware = dynamicMulter('/Decor/Chairs', ['chairImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

router.post('/add-chair-selection', addChairMidlware,  Add);
router.get('/get-chair-selection-data', Get);
router.get('/get-single-chair-selection/:id', GetSingleData)
router.put('/update-chair-selection/:id', addChairMidlware, Update);
router.delete('/delete-chair-selection/:id', Delete)

module.exports = router;
