const {Desserts} = require('../../../Model/FoodMenue/Packages');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const dessertObj = await Desserts.findById(id);
        if(!dessertObj){
            res.status(404).json({success: false, message: "Data not found"});
        }else{
            await Desserts.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Data Deleted", dessertObj})
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Delete;