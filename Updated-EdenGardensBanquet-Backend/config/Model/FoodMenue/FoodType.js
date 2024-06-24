const mongoose = require('mongoose');

const FoodTypeSchema = new mongoose.Schema({
    foodType: {type: String, required: true},
    value: {type: String},
    packages: [
        {
            name: String ,
            descriptions: String,
            appetizers: [{ type: Object, ref: 'Appetizers' }],
            mainEntries: [{ type: Object, ref: 'mainEntries' }],
            desserts: [{ type: Object, ref: 'Desserts' }],
            teaCoffe: [{ type: Object, ref: 'TeaCoffe'}],
            juicesDrinks: [{ type: Object, ref: 'JuiceDrinks' }]
        }
    ]
    
})

const FoodType = mongoose.model("FoodType", FoodTypeSchema);
module.exports = FoodType;
