const {Appetizers} = require('../../../Model/FoodMenue/Packages');

const Get = async(req, res) => {
    const {name, cost,description} = req.query;
    try {
        let appetizerObj;
        let query = {};
        if(name) query.name = {$regex: `^${name}`, Option: 'i'};
        if(cost) query.cost = cost;
        if(description) query.description = description;
        if(Object.keys(query).length > 0){
            appetizerObj = await Appetizers.find(query);
        }else{
            appetizerObj = await Appetizers.find();
        }
        if(appetizerObj.length > 0){
            res.status(200).json({success: true, message: "Data Found", appetizerObj})
        }else{
            res.status(404).json({success: false, message: "Data Not Found"});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Get;