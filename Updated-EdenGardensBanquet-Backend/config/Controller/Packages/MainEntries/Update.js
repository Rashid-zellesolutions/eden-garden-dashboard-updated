const {MainEntries} = require('../../../Model/FoodMenue/Packages');
const fs = require('fs');
const path = require('path');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name,cost,description} = req.body;
    const mainEntriesImage = req.files['mainEntriesImage'];
    try {
        const mainEntriesObj = await MainEntries.findById(id);
        if(!mainEntriesObj){
            res.status(404).json({success: false, message: "Data not Found"});
        }
        if(name) mainEntriesObj.name = name;
        if(cost) mainEntriesObj.cost = cost;
        if(description) mainEntriesObj.description = description;
        if(mainEntriesImage && mainEntriesImage.length > 0){
            const oldPath = mainEntriesObj.mainEntriesImagePath
            if(oldPath && fs.existsSync(path.resolve(`.${oldPath}`))){
                fs.unlinkSync(path.resolve(`.${oldPath}`))
            }
            mainEntriesObj.mainEntriesImageName = mainEntriesImage[0].originalname;
            mainEntriesObj.mainEntriesImagePath = `/uploads/FoodType/MainEntrees/${mainEntriesImage[0].filename}`
        }
        // console.log(mainEntriesImage);
        // console.log(mainEntriesObj)
        await mainEntriesObj.save();
        res.status(200).json({success: true, message: "Data Updated", mainEntriesObj});
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Update;