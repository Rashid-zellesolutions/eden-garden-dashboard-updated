const {DiningOption} = require('../../../Model/Others/Others');
const fs = require('fs');
const path = require('path');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const diningObj = await DiningOption.findById(id);
        if(!diningObj){
            res.status(400).json({status: 400, message: "Error Deleting data"});
        }
        const imagePath = diningObj.diningImagePath;
        if(imagePath && fs.unlinkSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }
        await DiningOption.findByIdAndDelete(id);
        res.status(200).json({status: 200, message: "Data Deleted", diningObj});
        
    } catch (error) {
        console.log("Error Deleting data");
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = Delete;