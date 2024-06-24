const {TeaCoffe} = require('../../../Model/FoodMenue/Packages');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const teaCoffeObj = await TeaCoffe.findById(id);
        if(!teaCoffeObj){
            res.status(404).json({success: false, message: "Data not found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", teaCoffeObj});
        }
    } catch (error) {
        console.error("Error Geting Single Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = GetSingleData;