const {TableSelection} = require('../../../Model/decore/Decor');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const tableObj = await TableSelection.findById(id);
        if(!tableObj){
            res.status(400).json({status: 400, message: "No Single Data Found"});
        }else{
            res.status(200).json({status: 200, message: "Data Found", tableObj});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = GetSingleData;