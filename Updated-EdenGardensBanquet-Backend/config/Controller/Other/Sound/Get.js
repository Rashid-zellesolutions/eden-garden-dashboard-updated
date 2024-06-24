const {Sound} = require('../../../Model/Others/Others');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let sound
        if(name){
            sound = await Sound.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, sound});
        }else{
            sound = await Sound.find();
            res.status(200).json({success: true, sound});
        }
        if(!sound){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;