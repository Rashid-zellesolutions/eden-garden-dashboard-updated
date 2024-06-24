const {MainEntries} = require('../../../Model/FoodMenue/Packages');

const Get = async(req, res) => {
    const {name,cost,description} = req.query;
    try {
        let mainEntriesObj;
        let query = {};
        if(name) query.name = name;
        if(cost) query.cost = cost;
        if(description) query.description = description;
        if(Object.keys(query).length > 0){
            mainEntriesObj = await MainEntries.find(query);
        }else{
            mainEntriesObj = await MainEntries.find();
        }
        if(mainEntriesObj.length > 0){
            res.status(200).json({success: true, message: "Data Gate", mainEntriesObj});
        }else{
            res.status(404).json({success: false, message: "Data not Found"})
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Get;