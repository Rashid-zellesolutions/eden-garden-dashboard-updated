const {ChairSelection} = require('../../../Model/decore/Decor');
const fs = require('fs');
const path = require('path');

const Delete = async(req, res) => {
    const {id} = req.params;
    console.log("chair backend id ", id)
    try {
        const deletedObj = await ChairSelection.findById(id);
        if(!deletedObj){
            res.status(400).json({status: 400, message: "Data not found"});
        }
        const imagePath = deletedObj.chairImagePath;
        if(imagePath && fs.unlinkSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }
        await ChairSelection.findByIdAndDelete(id);
        console.log("chair backend id ", id)
        res.status(200).json({success: true, message: "Data Deleted"});
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({status: 500, message: "Internal Error"});
        // console.log("chair backend id ", id)
    }
};

module.exports = Delete;