const express = require('express');
const Add = require('../../Controller/Decor/SeatingArrangments/Add');
const Get = require('../../Controller/Decor/SeatingArrangments/Get');
const GetSingleData = require('../../Controller/Decor/SeatingArrangments/GetSingle');
const Update = require('../../Controller/Decor/SeatingArrangments/Update');
const Delete = require('../../Controller/Decor/SeatingArrangments/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware')

const router = express.Router();

const addSeatingArrangmentMulter = dynamicMulter('/Decor/Seating-Arrangments', ['seatingImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

router.post('/add-seating-arrangments', addSeatingArrangmentMulter, Add);
router.get('/get-seating-arrangments', Get);
router.get('/get-single-seating-arrangment/:id', GetSingleData);
router.put('/update-seating-arrangments/:id', addSeatingArrangmentMulter, Update);
router.delete('/delete-seating-arrangments/:id', Delete);

module.exports = router;