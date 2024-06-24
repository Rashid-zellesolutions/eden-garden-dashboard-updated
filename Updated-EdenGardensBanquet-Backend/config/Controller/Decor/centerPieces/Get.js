const {CenterPiece} = require('../../../Model/decore/Decor')

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let centerpiece
        if(name){
            centerpiece = await CenterPiece.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, centerpiece});
        }else{
            centerpiece = await CenterPiece.find();
            res.status(200).json({success: true, centerpiece});
        }
        if(!centerpiece){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;