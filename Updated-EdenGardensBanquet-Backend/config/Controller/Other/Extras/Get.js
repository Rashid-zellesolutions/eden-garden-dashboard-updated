const {Extras} = require('../../../Model/Others/Others');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let extras
        if(name){
            extras = await Extras.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, extras});
        }else{
            extras = await Extras.find();
            res.status(200).json({success: true, extras});
        }
        if(!extras){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;