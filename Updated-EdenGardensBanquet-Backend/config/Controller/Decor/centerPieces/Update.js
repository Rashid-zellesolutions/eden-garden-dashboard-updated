const {CenterPiece} = require('../../../Model/decore/Decor');

const Update = async(req, res) => {
    const {id} = req.params
    const {name, cost,description} = req.body
    const centerpieceImage = req.files['centerpieceImage'];

    try {
        const centerObj = await CenterPiece.findById(id);
        if(!centerObj){
            res.status(400).json({status: 400, message: "Data not found"})
        }
        if(name) centerObj.name = name;
        if(cost) centerObj.cost = cost;
        if(description) centerObj.description = description;
        if(centerpieceImage){
            centerObj.centerPieceImageName = centerpieceImage[0].originalname;
            centerObj.centerPieceImagePath =  `/uploads/Decor/Centerpieces/${centerpieceImage[0].filename}`
        }

        await centerObj.save();
        res.status(200).json({status: 200, message: "Data Updated", centerObj});
        
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "internal servver error"});
    }
};

module.exports = Update;