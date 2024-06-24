const mongoose = require('mongoose');

const diningOptionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    diningImageName: {type: String, required: true},
    diningImagePath: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const cutlerySchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    cutleryImageName: {type: String, required: true},
    cutleryImagePath: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const soundSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    soundImageName: {type: String, required: true},
    soundImagePath: {type: String, required: true},
    uId: {type: String, default: 'ss'}
})

const extrasSchema = new mongoose.Schema({
    extraRoomCost: {type: String, required: true},
    valetCost: {type: String, required: true},
    securityCost: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
},{ timestamps: true })

const DiningOption = mongoose.model("DiningOption", diningOptionSchema);
const Cutlery = mongoose.model("Cutlery", cutlerySchema);
const Sound = mongoose.model("Sound", soundSchema);
const Extras = mongoose.model("Extras", extrasSchema);

module.exports = {
    DiningOption,
    Cutlery,
    Sound,
    Extras
};