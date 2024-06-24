const mongoose = require('mongoose')
const { Appetizers, MainEntries, Desserts, TeaCoffe, JuiceDrinks } = require('../../config/Model/FoodMenue/Packages');
const FoodType = require('../../config/Model/FoodMenue/FoodType');
const { ObjectId } = require('mongodb');

const appetizerChangeStream = Appetizers.watch();
const mainEntriesChangeStream = MainEntries.watch();
const dessertsChangeStream = Desserts.watch();
const teaCoffeChangeStream = TeaCoffe.watch();
const juicesDrinksChangeStream = JuiceDrinks.watch();

// Appetizers Midleware
appetizerChangeStream.on('change', async (change) => {

    if (change.operationType === 'insert' || change.operationType === 'update') {
        const updatedAppetizerId = change.documentKey._id;
        const updatedAppetizer = await Appetizers.findById(updatedAppetizerId);
        
        const updatedFoodTypes = await FoodType.updateMany(
            { 'packages.appetizers._id': updatedAppetizerId },
            { $set: { 'packages.$[].appetizers': updatedAppetizer } },
        );
    }
});

// Main Entries Midleware
mainEntriesChangeStream.on('change', async (change) => {

    if (change.operationType === 'insert' || change.operationType === 'update') {
        const updatedMainEntriesId = change.documentKey._id;
        const updatedMainEntries = await MainEntries.findById(updatedMainEntriesId);

        const updatedFoodTypes = await FoodType.updateMany(
            { 'packages.mainEntries._id': updatedMainEntriesId },
            { $set: { 'packages.$[].mainEntries': updatedMainEntries } },
            { arrayFilters: [{ 'package.mainEntries._id': updatedMainEntriesId}] }
        );
    }
});

// Desserts Midleware
dessertsChangeStream.on('change', async (change) => {
    if(change.operationType === 'insert' || change.operationType === 'update'){
        const updatedDessertId = change.documentKey._id;
        const updatedDessert = await Desserts.findById(updatedDessertId);

        const updatedFoodTypes = await FoodType.updateMany(
            { 'packages.desserts._id': updatedDessertId },
            { $set: { 'packages.$[].desserts': updatedDessert } },
            { arrayFilters: [{ 'package.desserts._id': updatedDessertId}] }
        );
    }
});

// TeaCoffe Midleware
teaCoffeChangeStream.on('change', async (change) => {
    if(change.operationType === 'insert' || change.operationType === 'update'){
        const updatedTeaCoffeId = change.documentKey._id;
        const updatedTeaCoffe = await TeaCoffe.findById(updatedTeaCoffeId);

        const updatedFoodTypes = await FoodType.updateMany(
            { 'packages.teaCoffe._id': updatedTeaCoffeId },
            { $set: { 'packages.$[].teaCoffe': updatedTeaCoffe } },
            { arrayFilters: [{ 'package.teaCoffe._id': updatedTeaCoffeId}] }
        );
    }
});

// Juices Drinks Midleware
juicesDrinksChangeStream.on('change', async(change) => {
    if(change.operationType === 'insert' || change.operationType === 'update'){
        const updatedJuicesDrinksId = change.documentKey._id;
        const updatedJuicesDrinks = await JuiceDrinks.findById(updatedJuicesDrinksId);

        const updatedFoodTypes = await FoodType.updateMany(
            { 'packages.juicesDrinks._id': updatedJuicesDrinksId },
            { $set: { 'packages.$[].juicesDrinks': updatedJuicesDrinks } },
            { arrayFilters: [{ 'package.juicesDrinks._id': updatedJuicesDrinksId}] }
        );
    }
})