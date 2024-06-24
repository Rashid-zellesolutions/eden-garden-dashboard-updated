const {Extras} = require('../../../Model/Others/Others');

const Add = async(req, res) => {
    const {
        extraRoomCost,
        valetCost,
        securityCost
    } = req.body;
    if(!extraRoomCost || !valetCost || !securityCost){
        res.status(400).json({status: 400, message: "Required fields are missing"});
    }
    try {
        const extrasObj = Extras({
            extraRoomCost,
            valetCost,
            securityCost
        });

        await extrasObj.save();
        res.status(200).json({status: 200, message: "Data Added", extrasObj});
    } catch (error) {
        console.error("Error Adding Data");
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = Add;