const express = require('express');

const Add = require('../../Controller/Packages/MainEntries/Add');
const Get = require('../../Controller/Packages/MainEntries/Get');
const GetSingleData = require('../../Controller/Packages/MainEntries/GetSingle');
const Update = require('../../Controller/Packages/MainEntries/Update');
const Delete = require('../../Controller/Packages/MainEntries/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');
const AddMainEntriesMulter = dynamicMulter('/FoodType/MainEntrees', ['mainEntriesImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-main-entries', AddMainEntriesMulter, Add);
router.get('/get-main-entries', Get);
router.get('/get-single-entry/:id', GetSingleData);
router.put('/update-entries/:id', AddMainEntriesMulter, Update);
router.delete('/delete-entry/:id', Delete);

module.exports = router;