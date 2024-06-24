const express = require('express');

const Add = require('../../Controller/Other/Sound/Add');
const Get = require('../../Controller/Other/Sound/Get');
const GetSingleData = require('../../Controller/Other/Sound/GetSingle');
const Update = require('../../Controller/Other/Sound/Update');
const Delete = require('../../Controller/Other/Sound/Delete')

const {dynamicMulter} = require('../../midlewares/multerMidleware');
const AddSoundMulter = dynamicMulter('/Others/Sound', ['soundImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-sound', AddSoundMulter, Add);
router.get('/get-sound', Get);
router.get('/get-single-sound/:id', GetSingleData);
router.put('/update-sound/:id', AddSoundMulter, Update);
router.delete('/delete-sound/:id', Delete);

module.exports = router;