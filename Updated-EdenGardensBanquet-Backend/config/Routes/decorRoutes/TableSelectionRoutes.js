const express = require('express');
const Add = require('../../Controller/Decor/TableSelection/Add');
const Get = require('../../Controller/Decor/TableSelection/Get');
const GetSingleData = require('../../Controller/Decor/TableSelection/GetSingle');
const Update = require('../../Controller/Decor/TableSelection/Update');
const Delete = require('../../Controller/Decor/TableSelection/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');

const AddTableSelectionMulter = dynamicMulter('/Decor/Select-Table', ['tableImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-table-seletc', AddTableSelectionMulter, Add);
router.get('/get-table-select', Get);
router.get('/get-single-table-select/:id', GetSingleData);
router.put('/update-table-select/:id', AddTableSelectionMulter, Update);
router.delete('/delete-table-select/:id', Delete);

module.exports = router;