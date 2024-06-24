const mongoose = require('mongoose');

// Appetizers Schema
const AppetizersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // pacFor: {type: String, required: true},
    constant: {type: String, default: 'false'},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    appetizersImageName: {type: String, required: false},
    appetizersImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

// Main Entries Schema
const MainEntriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // pacFor: {type: String, required: true},
    constant: {type: String, default: 'false'},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    mainEntriesImageName: {type: String, required: false},
    mainEntriesImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
})

// Desserts Schema
const DessertsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // pacFor: {type: String, required: true},
    constant: {type: String, default: 'false'},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    dessertsImageName: {type: String, required: false},
    dessertsImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
})

// TeaCoffe Schema
const teaCoffeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // pacFor: {type: String, required: true},
    cost: {type: String, required: true},
    constant: {type: String, default: 'false'},
    description: {type: String, required: false},
    teaCoffeImageName: {type: String, required: false},
    teaCoffeImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
})

// Juices And Drinks Schema
const juicesDrinksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // pacFor: {type: String, required: true},
    constant: {type: String, default: 'false'},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    juiceDrinkImageName: {type: String, required: false},
    juiceDrinkImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
})

const Appetizers = mongoose.model("Appetizers", AppetizersSchema)
const MainEntries = mongoose.model("MainEntries", MainEntriesSchema);
const Desserts = mongoose.model("Desserts", DessertsSchema);
const TeaCoffe = mongoose.model("TeaCoffe", teaCoffeSchema);
const JuiceDrinks = mongoose.model("JuiceDrinks", juicesDrinksSchema)

module.exports = {Appetizers, MainEntries, Desserts, TeaCoffe, JuiceDrinks};