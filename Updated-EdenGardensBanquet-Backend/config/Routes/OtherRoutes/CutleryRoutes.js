const express = require('express');

const Add = require('../../Controller/Other/Cutlery/Add');
const Get = require('../../Controller/Other/Cutlery/Get');
const GetSingleData = require('../../Controller/Other/Cutlery/GetSingle');
const Update = require('../../Controller/Other/Cutlery/Update');
const Delete = require('../../Controller/Other/Cutlery/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');
const AddCutleryMulter = dynamicMulter('/Decor/Cutlery', ['cutleryImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-cutlery', AddCutleryMulter, Add);
router.get('/get-cutlery', Get);
router.get('/get-single-cutlery/:id', GetSingleData);
router.put('/update-cutlery/:id', AddCutleryMulter, Update);
router.delete('/delete-cutlery/:id', Delete);

module.exports = router;
