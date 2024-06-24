const {Cutlery} = require('../../../Model/Others/Others');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const cutleryObj = await Cutlery.findById(id);
        if(!cutleryObj){
            res.status(400).json({status: 400, message: "Data not found"});
        }else{
            await Cutlery.findByIdAndDelete(id);
            res.status(200).json({status: 200, message: "Data Delete", cutleryObj});
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({Status: 500, message: "Internal Server Error"});
    }
}

module.exports = Delete;