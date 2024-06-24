const {Appetizers} = require('../../../Model/FoodMenue/Packages');

const Delete = async(req, res) => {
    const {id} = req.params;
    console.log("appetizer id", id)
    try {
        const appetizerObj = await Appetizers.findById(id);
        if(!appetizerObj){
            res.status(404).json({success: false, message: "data not found"});
        }else{
            await Appetizers.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Data Deleted", appetizerObj});
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Delete;