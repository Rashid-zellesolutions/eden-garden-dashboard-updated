const FoodType = require('../../../Model/FoodMenue/FoodType');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const foodTypeObj = await FoodType.findById(id);
        if(!foodTypeObj){
            res.status(404).json({success: false, message: "Data not found"});
        }else{
            await FoodType.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Data Deleted", foodTypeObj})
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
    }
};

module.exports = Delete;