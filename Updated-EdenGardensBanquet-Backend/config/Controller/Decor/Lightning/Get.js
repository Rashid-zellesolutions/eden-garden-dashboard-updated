const {Lightning} = require('../../../Model/decore/Decor')

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let lighting
        if(name){
            lighting = await Lightning.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, lighting});
        }else{
            lighting = await Lightning.find();
            res.status(200).json({success: true, lighting});
        }
        if(!lighting){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;