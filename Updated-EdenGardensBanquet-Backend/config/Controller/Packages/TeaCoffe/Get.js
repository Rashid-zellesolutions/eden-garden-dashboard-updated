const {TeaCoffe} = require('../../../Model/FoodMenue/Packages');

const Get = async(req, res) => {
    const {name, cost,description} = req.query;
    try {
        let teaCoffeObj;
        let query = {};
        if(name) query.name = name;
        if(cost) query.cost = cost;
        if(description) query.description = description;
        if(Object.keys(query).length > 0){
            teaCoffeObj = await TeaCoffe.find(query);
        }else{
            teaCoffeObj = await TeaCoffe.find();
        }
        if(teaCoffeObj.length > 0) {
            res.status(200).json({success: true, message: "Data Get", teaCoffeObj});
        }else{
            res.status(404).json({success: false, message: "Data not found"});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Get;