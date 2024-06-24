const {Lightning} = require('../../../Model/decore/Decor');

const Update = async(req, res) => {
    const {id} = req.params
    const {name, cost} = req.body
    const lightingImage = req.files['lightingImage'];

    try {
        const lightObj = await Lightning.findById(id);
        if(!lightObj){
            res.status(400).json({status: 400, message: "Data not found"})
        }
        if(name) lightObj.name = name;
        if(cost) lightObj.cost = cost;
        if(lightingImage){
            lightObj.lightingImageName = lightingImage[0].originalname;
            lightObj.lightingImagePath = `/uploads/Decor/Lighting/${lightingImage[0].filename}`
        }

        await lightObj.save();
        res.status(200).json({status: 200, message: "Data Updated", lightObj});
        
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "internal servver error"});
    }
};

module.exports = Update;