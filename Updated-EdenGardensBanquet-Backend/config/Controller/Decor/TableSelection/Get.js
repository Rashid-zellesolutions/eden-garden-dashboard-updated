const {TableSelection} = require('../../../Model/decore/Decor');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let tableObj;
        if(name){
            tableObj = await TableSelection.find({name: { $regex: `^${name}`, Option: 'i'}});
            res.status(200).json({status: 200, message: "Data Found", tableObj});
        }else{
            tableObj = await TableSelection.find();
            res.status(200).json({status: 200, message: "Data Found", tableObj});
        }
        if(!tableObj){
            res.status(400).json({status: 400, message: "Not Data Found"});
        }
    } catch (error) {
        console.error("Error Geting Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Get;