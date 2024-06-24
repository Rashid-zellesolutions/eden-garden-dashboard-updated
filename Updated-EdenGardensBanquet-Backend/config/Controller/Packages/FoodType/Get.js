const FoodType = require('../../../Model/FoodMenue/FoodType');

const Get = async(req, res) => {
    try {
        const foodTypeObj = await FoodType.find();
        if(!foodTypeObj){
            res.status(404).json({success: false, message: "Data no found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", foodTypeObj})
        }
    } catch (error) {
        console.error("Error Geting Food Type");
        res.status(500).json({success: false, message: "Server Error"})
    }
}

module.exports = Get;