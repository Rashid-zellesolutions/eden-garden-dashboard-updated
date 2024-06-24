const {Sound} = require('../../../Model/Others/Others');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name, cost,description} = req.body;
    const soundImage = req.files['soundImage'];
    try {
        const soundObj = await Sound.findById(id);
        if(!soundObj){
            res.status(400).json({status: 400, message: "Data Not Found"});
        }
        if(name) soundObj.name = name;
        if(cost) soundObj.cost = cost;
        if(description) soundObj.description = description;
        if(soundImage){
            soundObj.soundImageName = soundImage[0].originalname;
            soundObj.soundImagePath =  `/uploads/Others/Sound/${soundImage[0].filename}`;
        }
        await soundObj.save();
        res.status(200).json({status: 200, message: "Data Updated", soundObj});
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = Update;