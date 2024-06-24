const {Cutlery} = require('../../../Model/Others/Others');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const cutleryObj = await Cutlery.findById(id);
        if(!cutleryObj){
            res.status(400).json({status: 400, message: "Single Data Not Found"});
        }else{
            res.status(200).json({status: 200, message: "Single Data Found", cutleryObj});
        }
    } catch (error) {
        console.error("Error Geting Single Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = GetSingleData;