const {SeatingArangments} = require('../../../Model/decore/Decor');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let seatingObj;
        if(name){
            seatingObj = await SeatingArangments.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({status: 200, message: "Data Found", seatingObj});
        }else{
            seatingObj = await SeatingArangments.find();
            res.status(200).json({status: 200, message: "Data Found", seatingObj});
        }
        if(!seatingObj){
            res.status(400).json({status: 400, message: "Not Data Found"});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Get;