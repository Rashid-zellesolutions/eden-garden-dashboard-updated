const {StageSize} = require('../../../Model/decore/Decor');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const singleData = await StageSize.findById(id);
        if(!singleData){
            res.status(400).json({status: 400, message: "Single Stage Dimention not found"})
        }else{
            res.status(200).json({status: 200, message: "Single Data Found", singleData});
        }
    } catch (error) {
        console.error("Error Geting Single Data", error);
        res.status(400).json({status: 400, message: "Internal Server Error"});
    }
}

module.exports = GetSingleData;