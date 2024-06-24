const {Desserts} = require('../../../Model/FoodMenue/Packages');

const Get = async(req, res) => {
    const {name, cost,description} = req.query;
    try {
        let dessertObj;
        let query = {};
        if(name) query.name = name;
        if(cost) query.cost = cost;
        if(description) query.description = description;
        if(Object.keys(query).length > 0){
            dessertObj = await Desserts.find(query);
        }else{
            dessertObj = await Desserts.find();
        }
        if(dessertObj.length > 0){
            res.status(200).json({success: true, message: "Data Get Successfully", dessertObj})
        }else{
            res.status(404).json({success: false, message: "Data not found"});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Get;