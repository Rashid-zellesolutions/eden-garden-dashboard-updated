const {Desserts} = require('../../../Model/FoodMenue/Packages');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const dessertObj = await Desserts.findById(id);
        if(!dessertObj){
            res.status(404).json({success: true, message: "Data Not Found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", dessertObj})
        }
    } catch (error) {
        console.error("Error Geting Single Product", error);
        res.status(500).json({success: false, message: "interna Server Error"});
    }
}

module.exports = GetSingleData;