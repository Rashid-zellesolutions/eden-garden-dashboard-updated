const {Lightning} = require('../../../Model/decore/Decor');

const GetSingleData = async(req, res) => {
    const {id} = req.params
    try {
        const singleLightData = await Lightning.findById(id);
        if(!singleLightData){
            res.status(400).json({status: 400, message: "Data not Found"});
        }else{
            res.status(200).json({status: 200, message: "Data Found", singleLightData});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = GetSingleData;