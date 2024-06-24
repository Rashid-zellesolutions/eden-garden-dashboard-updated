const {SeatingArangments} = require('../../../Model/decore/Decor');

const Delete = async(req, res) => {
    const {id} = req.params;
    try {
        const seatingObj = await SeatingArangments.findById(id);
        if(!seatingObj){
            res.status(400).json({status: 400, message: "Data Not Found"});
        }else{
            await SeatingArangments.findByIdAndDelete(id);
            res.status(200).json({status: 200, message: "Data Deleted", seatingObj})
        }
    } catch (error) {
        console.error("Error Deleting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Delete;