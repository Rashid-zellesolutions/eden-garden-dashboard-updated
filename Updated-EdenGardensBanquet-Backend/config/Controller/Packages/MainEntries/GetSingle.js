const {MainEntries} = require('../../../Model/FoodMenue/Packages');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const mainEntriesObj = await MainEntries.findById(id);
        if(!mainEntriesObj){
            res.status(404).json({success: false, message: "Data not Found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", mainEntriesObj})
        }
    } catch (error) {
        console.error("Error Finding Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = GetSingleData