const {Appetizers} = require('../../../Model/FoodMenue/Packages');

const Add = async(req, res) => {
    const {name, cost,description} = req.body
    const appetizerImage = req.files['appetizerImage'];
    if(!name || !cost){
        res.status(400).json({success: false, message: "Required Fileds are missing"});
    }
    try {

        const appetizerObj = Appetizers({
            name,
            cost,
            description,
            appetizersImageName: appetizerImage? appetizerImage[0].originalname :"",
            appetizersImagePath: appetizerImage? `/uploads/FoodType/Appetizers/${appetizerImage[0].filename}`:""
        });

        await appetizerObj.save();
         // Construct the URL for the image
         const imageUrl = appetizerImage ? `${req.protocol}://${req.get('host')}/uploads/FoodType/Appetizers/${appetizerImage[0].filename}` : "";
        console.log(imageUrl);
        res.status(200).json({success: true, message: "Data Upload", appetizerObj})
    } catch (error) {
        console.error("Error Adding Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}


module.exports = Add;