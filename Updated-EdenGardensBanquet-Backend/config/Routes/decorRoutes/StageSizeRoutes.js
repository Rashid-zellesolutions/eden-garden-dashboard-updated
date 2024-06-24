const express = require('express');
const Add = require('../../Controller/Decor/StageSizes/Add');
const Get = require('../../Controller/Decor/StageSizes/Get')
const GetSingleData = require('../../Controller/Decor/StageSizes/GetSingle');
const Update = require('../../Controller/Decor/StageSizes/Update');
const Delete = require('../../Controller/Decor/StageSizes/Delete');
const {dynamicMulter} = require('../../midlewares/multerMidleware');

const router = express.Router();

const stageImage = dynamicMulter('/Decor/Stage', ['stageImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

router.post('/add-stage-size',stageImage, Add);
router.get('/get-all-stage-size', Get);
router.get('/get-single-stage-size/:id', GetSingleData);
router.put('/update-stage-size/:id', stageImage,Update);
router.delete('/delete-stage-size/:id', Delete)

module.exports = router;