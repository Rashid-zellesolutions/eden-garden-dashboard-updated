const {JuiceDrinks} = require('../../../Model/FoodMenue/Packages');
const fs = require('fs');
const path = require('path')

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const juiceDrinkObj = await JuiceDrinks.findById(id);
        if(!juiceDrinkObj){
            res.status(404).json({success: false, message: "Data not Found"});
        }
        // else{
        //     await JuiceDrinks.findByIdAndDelete(id);
        //     res.status(200).json({success: true, message: "Data Deleted", juiceDrinkObj})
        // }
        const imagePath = juiceDrinkObj.juiceDrinkImagePath;
        if(imagePath && fs.unlinkSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }
        await JuiceDrinks.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Data Delete"});
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Delete;