const {Desserts} = require('../../../Model/FoodMenue/Packages');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name,cost,description} = req.body;
    const dessertImage = req.files['dessertImage'];
    try {
        const dessertObj = await Desserts.findById(id);
        if(!dessertObj){
            res.status(404).json({success: false, message: "data not found"});
        }
        if(name) dessertObj.name = name;
        if(cost) dessertObj.cost = cost;
        if(description) dessertObj.description = description;
        if(dessertImage){
            dessertObj.dessertsImageName = dessertImage[0].originalname;
            dessertObj.dessertsImagePath = `/uploads/FoodType/Desserts/${dessertImage[0].filename}`
        };
        console.log(dessertImage)
        await dessertObj.save();
        res.status(200).json({success: true, message: "data updated", dessertObj});
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
}

module.exports = Update;