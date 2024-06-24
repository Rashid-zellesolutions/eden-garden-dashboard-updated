const {BackdropAndMandap} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const { name, cost ,description} = req.body;
    const backDropImage = req.files['backDropImage'];
    
    if(!name || !cost || !backDropImage){
        return res.status(400).json({status: 400, message: "Required fields are missing"});
    }
    
    try {
     const backdropObj = BackdropAndMandap({
        name,
        cost,
        description,
        backdropImageName: backDropImage[0].originalname,
        backdropImagePath: `/uploads/Decor/Backdrop-and-Mandap/${backDropImage[0].filename}`,
     });
    await backdropObj.save();
    res.status(200).json({status: 200, message: "Data Added Successfully"});

    } catch (error) {
        console.error("Error Adding Backdrop and mandap", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Add;