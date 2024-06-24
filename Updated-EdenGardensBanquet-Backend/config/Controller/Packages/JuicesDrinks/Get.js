const {JuiceDrinks} = require('../../../Model/FoodMenue/Packages');

const Get = async(req, res) => {
    const {name, cost,description} = req.query;
    try {
        let juiceDrinkObj;
        let query = {};
        if(name) query.name = name;
        if(cost) query.cost = cost;
        if(description) query.description = description;
        if(Object.keys(query).length > 0){
            juiceDrinkObj = await JuiceDrinks.find(query);
        }else{
            juiceDrinkObj = await JuiceDrinks.find();
        }

        if(juiceDrinkObj.length > 0) {
            res.status(200).json({success: true, message: "Data Get", juiceDrinkObj});
        }else{
            res.status(404).json({success: false, message: "Data not found"})
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Get;