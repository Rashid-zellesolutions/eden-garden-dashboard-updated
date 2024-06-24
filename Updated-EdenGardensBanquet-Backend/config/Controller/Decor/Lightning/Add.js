const {Lightning} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const { name, cost,description } = req.body;
    const lightingImage = req.files['lightingImage'];
    
    if(!name || !cost || !lightingImage){
        return res.status(400).json({status: 400, message: "Required fields are missing"});
    }
    
    try {
     const lightObj = Lightning({
        name,
        cost,
        description,
        lightingImageName: lightingImage[0].originalname,
        lightingImagePath: `/uploads/Decor/Lighting/${lightingImage[0].filename}`
     });
    await lightObj.save();
    res.status(200).json({status: 200, message: "Data Added Successfully"});

    } catch (error) {
        console.error("Error Adding Backdrop and mandap", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Add;