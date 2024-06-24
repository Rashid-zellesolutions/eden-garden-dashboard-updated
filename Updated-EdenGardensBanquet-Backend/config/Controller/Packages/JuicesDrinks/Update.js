const {JuiceDrinks} = require('../../../Model/FoodMenue/Packages');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name,cost,description} = req.body;
    const juiceDrinkImage = req.files['juiceDrinkImage'];
    try {
        const juiceDrinkObj = await JuiceDrinks.findById(id);
        if(!juiceDrinkObj){
            res.status(404).json({success: false, message: "Data not found"});
        }
        if(name) juiceDrinkObj.name = name;
        if(cost) juiceDrinkObj.cost = cost;
        if(description) juiceDrinkObj.description = description;
        if(juiceDrinkImage){
            juiceDrinkObj.juiceDrinkImageName = juiceDrinkImage[0].originalname,
            juiceDrinkObj.juiceDrinkImagePath = `/uploads/FoodType/ColdDrinks/${juiceDrinkImage[0].filename}`
        }
        await juiceDrinkObj.save();
        res.status(200).json({success: true, message: "Data Updated", juiceDrinkObj});
    } catch (error) {
        console.error("Error Updating data");
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Update;