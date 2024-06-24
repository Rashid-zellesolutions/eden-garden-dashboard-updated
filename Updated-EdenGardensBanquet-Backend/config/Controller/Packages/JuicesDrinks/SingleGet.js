const {JuiceDrinks} = require('../../../Model/FoodMenue/Packages');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const juiceDrinkObj = await JuiceDrinks.findById(id);
        if(!juiceDrinkObj){
            res.status(404).json({success: false, message: "Data not Found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", juiceDrinkObj})
        }
    } catch (error) {
        console.error("Error Geting Single Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = GetSingleData;