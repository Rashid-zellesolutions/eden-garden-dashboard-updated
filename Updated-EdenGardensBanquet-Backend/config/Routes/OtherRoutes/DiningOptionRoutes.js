const express = require('express');
const Add = require('../../Controller/Other/DiningOption/Add');
const Get = require('../../Controller/Other/DiningOption/Get');
const GetSingleData = require('../../Controller/Other/DiningOption/GetSingle');
const Update = require('../../Controller/Other/DiningOption/Update');
const Delete = require('../../Controller/Other/DiningOption/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');
const AddDiningOptionMulter = dynamicMulter('/Decor/Dining', ['diningImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-dining', AddDiningOptionMulter, Add);
router.get('/get-dining', Get);
router.get('/get-single-dining/:id', GetSingleData);
router.put('/update-dining/:id', AddDiningOptionMulter, Update);
router.delete('/delete-dining/:id', Delete);

module.exports = router;