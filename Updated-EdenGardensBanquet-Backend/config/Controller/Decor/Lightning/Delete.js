const {Lightning} = require('../../../Model/decore/Decor');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedObj = await Lightning.findById(id);
        if(!deletedObj){
            res.status(400).json({status: 400, message: "Data not found"});
        }else{
            await Lightning.findByIdAndDelete(id);
            res.status(200).json({status: 200, message: "Data Deleted", deletedObj})
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({status: 500, message: "Internal Error"});
    }
};

module.exports = Delete;