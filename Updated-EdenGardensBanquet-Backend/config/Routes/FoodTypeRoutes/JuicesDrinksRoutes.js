const express = require('express');

const Add = require('../../Controller/Packages/JuicesDrinks/Add');
const Get = require('../../Controller/Packages/JuicesDrinks/Get');
const GetSingleData = require('../../Controller/Packages/JuicesDrinks/SingleGet');
const Update = require('../../Controller/Packages/JuicesDrinks/Update');
const Delete = require('../../Controller/Packages/JuicesDrinks/Delete');

const {dynamicMulter} = require('../../midlewares/multerMidleware');
const AddJuicesDrinksMulter = dynamicMulter('/FoodType/ColdDrinks', ['juiceDrinkImage'], 1, ['image/jpg', 'image/jpeg', 'image/png'], 2*1024*1024);

const router = express.Router();

router.post('/add-juices-drinks', AddJuicesDrinksMulter, Add);
router.get('/get-juices-drinks', Get);
router.get('/get-single-juice-drink/:id', GetSingleData);
router.put('/update-juices-drinks/:id', AddJuicesDrinksMulter, Update);
router.delete('/delete-juices-drinks/:id', Delete);

module.exports = router;