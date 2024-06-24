const {ChairSelection} = require('../../../Model/decore/Decor');

const GetSingleData = async(req, res) => {
    const {id} = req.params
    try {
        const singleChairData = await ChairSelection.findById(id);
        if(!singleChairData){
            res.status(400).json({status: 400, message: "Data not Found"});
        }else{
            res.status(200).json({status: 200, message: "Data Found", singleChairData});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = GetSingleData;