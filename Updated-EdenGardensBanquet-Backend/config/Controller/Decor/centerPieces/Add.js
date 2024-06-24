const {CenterPiece} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const { name, cost,description } = req.body;
    const centerpieceImage = req.files['centerpieceImage'];
    
    if(!name || !cost || !centerpieceImage){
        return res.status(400).json({status: 400, message: "Required fields are missing"});
    }
    
    try {
     const centerObj = CenterPiece({
        name,
        cost,
        description,
        centerPieceImageName: centerpieceImage[0].originalname,
        centerPieceImagePath: `/uploads/Decor/Centerpieces/${centerpieceImage[0].filename}`,
     });
    await centerObj.save();
    res.status(200).json({status: 200, message: "Data Added Successfully"});

    } catch (error) {
        console.error("Error Adding Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
};

module.exports = Add;