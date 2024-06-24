const express = require('express');

const Add = require('../../Controller/Other/Extras/Add');
const Get = require('../../Controller/Other/Extras/Get');
const Update = require('../../Controller/Other/Extras/Update');
const Delete = require('../../Controller/Other/Extras/Delete');

const router = express.Router();

router.post('/add-extras', Add);
router.get('/get-extras', Get);
router.put('/update-extras/:id', Update);
router.delete('/delete-extras/:id', Delete);

module.exports = router;
