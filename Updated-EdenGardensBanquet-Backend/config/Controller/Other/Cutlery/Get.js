const {Cutlery} = require('../../../Model/Others/Others');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let cutlery
        if(name){
            cutlery = await Cutlery.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, cutlery});
        }else{
            cutlery = await Cutlery.find();
            res.status(200).json({success: true, cutlery});
        }
        if(!cutlery){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;