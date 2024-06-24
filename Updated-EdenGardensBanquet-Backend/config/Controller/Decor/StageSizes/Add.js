const {StageSize} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const {name, cost,description} = req.body;
    const stageImage = req.files['stageImage'];
    if(!name || !cost){
        return res.status(400).json({status: 400, message: "Required Field is missing"});
    }
    try {
        const dimention = new StageSize({
            name,
            cost,
            description,
            stageImageName:stageImage? stageImage[0].originalname :"",
            stageImagePath:stageImage? `/uploads/Decor/Stage/${stageImage[0].filename}` :""
        });

        await dimention.save();
        res.status(200).json({status: 200, message: "Stage Dimention Added", dimention})
    } catch (error) {
        console.error("Error Adding Stage Dimentions", error);
        res.status(500).json({message: "internal server error"});
    }
}

module.exports = Add;