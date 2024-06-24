const {Extras} = require('../../../Model/Others/Others');

const Update = async(req, res) => {
    const {id} = req.params;
    const {extraRoomCost} = req.body;
    const {valetCost} = req.body;
    const {securityCost} = req.body;
    console.log("extra services id", id)
    try {
        const extrasObj = await Extras.findById(id);
        if(!extrasObj){
            res.status(400).json({status: 400, message: "Data Not Found"});
        }
        if(extraRoomCost) extrasObj.extraRoomCost = extraRoomCost;
        if(valetCost) extrasObj.valetCost = valetCost;
        if(securityCost) extrasObj.securityCost = securityCost;
      
        await extrasObj.save();
        res.status(200).json({status: 200, message: "Data Updated", extrasObj});
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = Update;