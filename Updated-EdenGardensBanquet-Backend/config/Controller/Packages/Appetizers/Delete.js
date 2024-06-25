const {Appetizers} = require('../../../Model/FoodMenue/Packages');
const fs = require('fs');
const path = require('path');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const appetizerObj = await Appetizers.findById(id);
        if(!appetizerObj){
            res.status(404).json({success: false, message: "data not found"});
        }
        const imagePath = appetizerObj.appetizersImagePath;
        if(imagePath && fs.existsSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }
        await Appetizers.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Appetizer Delete"})
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Delete;