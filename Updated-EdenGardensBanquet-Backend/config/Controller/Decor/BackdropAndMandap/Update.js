const {BackdropAndMandap} = require('../../../Model/decore/Decor');

const Update = async(req, res) => {
    const {id} = req.params
    const {name, cost,description} = req.body
    const backDropImage = req.files['backDropImage'];

    try {
        const backdropObj = await BackdropAndMandap.findById(id);
        if(!backdropObj){
            res.status(400).json({status: 400, message: "Data not found"})
        }
        if(name) backdropObj.name = name;
        if(cost) backdropObj.cost = cost;
        if(description) backdropObj.description = description;
        if(backDropImage){
            backdropObj.backdropImageName = backDropImage[0].originalname;
            backdropObj.backdropImagePath = `/uploads/Decor/Backdrop-and-Mandap/${backDropImage[0].filename}`
        }

        await backdropObj.save();
        res.status(200).json({status: 200, message: "Data Updated", backdropObj});
        
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "internal servver error"});
    }
};

module.exports = Update;