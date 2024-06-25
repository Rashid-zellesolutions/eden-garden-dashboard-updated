const {MainEntries} = require('../../../Model/FoodMenue/Packages');
const fs = require('fs');
const path = require('path');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const mainEntriesObj = await MainEntries.findById(id);
        if(!mainEntriesObj){
            res.status(404).json({success: false, message: "Data not found"});
        }
        const imagePath = mainEntriesObj.mainEntriesImagePath;
        if(imagePath && fs.unlinkSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`))
        }
        mainEntriesObj = await MainEntries.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Data Deleted", mainEntriesObj})
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(200).json({success: true, message: "Internel Server Error"});
    }
};

module.exports = Delete;