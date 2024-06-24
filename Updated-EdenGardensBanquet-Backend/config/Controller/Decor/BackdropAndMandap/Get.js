const {BackdropAndMandap} = require('../../../Model/decore/Decor')

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let backdrop
        if(name){
            backdrop = await BackdropAndMandap.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, backdrop});
        }else{
            backdrop = await BackdropAndMandap.find();
            res.status(200).json({success: true, backdrop});
        }
        if(!backdrop){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;