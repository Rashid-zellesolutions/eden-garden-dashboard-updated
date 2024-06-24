const {Extras} = require('../../../Model/Others/Others');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const extrasObj = await Extras.findById(id);
        if(!extrasObj){
            res.status(400).json({status: 400, message: "Data not found"});
        }else{
            await Extras.findByIdAndDelete(id);
            res.status(200).json({status: 200, message: "Data Delete", extrasObj});
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({Status: 500, message: "Internal Server Error"});
    }
}

module.exports = Delete;