const {Appetizers} = require('../../../Model/FoodMenue/Packages');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const appetizerObj = await Appetizers.findById(id);
        if(!appetizerObj){
            res.status(404).json({success: false, message: "Data not Found"});
        }else{
            res.status(200).json({success: true, message: "Data Found", appetizerObj});
        }
    } catch (error) {
        console.error("Error Geting Single Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = GetSingleData;