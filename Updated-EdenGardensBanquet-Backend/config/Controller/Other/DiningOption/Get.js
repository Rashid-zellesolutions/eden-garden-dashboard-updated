const {DiningOption} = require('../../../Model/Others/Others');

const Get = async(req, res) => {
    const {name} = req.query;
    try {
        let dining
        if(name){
            dining = await DiningOption.find({name: { $regex: `^${name}`, Option: 'i' }});
            res.status(200).json({success: true, dining});
        }else{
            dining = await DiningOption.find();
            res.status(200).json({success: true, dining});
        }
        if(!dining){
            res.status(400).json({status: 400, message: "Arrangments not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching data", error: error});
    }
}

module.exports = Get;