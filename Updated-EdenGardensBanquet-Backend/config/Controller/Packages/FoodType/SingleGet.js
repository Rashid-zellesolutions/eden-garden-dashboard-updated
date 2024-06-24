const FoodType = require('../../../Model/FoodMenue/FoodType');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const foodTypeObj = await FoodType.findById(id);
        if(!foodTypeObj){
            res.status(404).json({success: false, message: "No Data Found"});
        }else{
            console.log(foodTypeObj.packages[0].appetizers._id)
            res.status(200).json({success: true, message: "Data Found", foodTypeObj});
        }
    } catch (error) {
        console.error("Error Geting Single Product");
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = GetSingleData;