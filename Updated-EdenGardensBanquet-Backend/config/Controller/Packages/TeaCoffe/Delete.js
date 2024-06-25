const {TeaCoffe} = require('../../../Model/FoodMenue/Packages');
const fs =  require('fs');
const path = require('path')

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const teaCoffeObj = await TeaCoffe.findById(id);
        if(!teaCoffeObj){
            res.status(404).json({success: false, message: "Data not found"});
        }
        // else{
        //     await TeaCoffe.findByIdAndDelete(id);
        //     res.status(200).json({success: true, message: "Data Deleted", teaCoffeObj})
        // }
        const imagePath = teaCoffeObj.teaCoffeImagePath;
        if(imagePath && fs.unlinkSync(path.resolve(`.${imagePath}`))){
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }
        await TeaCoffe.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Data Delete"});
    } catch (error) {
        console.error("error Deleting Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Delete;