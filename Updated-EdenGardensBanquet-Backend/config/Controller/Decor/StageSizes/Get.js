const { StageSize} = require('../../../Model/decore/Decor');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let stageSize
        if(name){
            stageSize = await StageSize.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, stageSize});
        }else{
            stageSize = await StageSize.find();
            res.status(200).json({success: true, stageSize});
        }
        if(!stageSize){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;