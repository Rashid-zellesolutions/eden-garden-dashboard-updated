const {Sound} = require('../../../Model/Others/Others');

const GetSingleData = async(req, res) => {
    const {id} = req.params;
    try {
        const soundObj = await Sound.findById(id);
        if(!soundObj){
            res.status(400).json({status: 400, message: "Data Not Found"});
        }else{
            res.status(200).json({status: 200, message: "Single Data Found", soundObj})
        }
    } catch (error) {
        console.error("Error Geting Single Data");
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = GetSingleData;