const {JuiceDrinks} = require('../../../Model/FoodMenue/Packages');

const Add = async(req, res) => {
    const {name, cost,description} = req. body;
    const juiceDrinkImage = req.files['juiceDrinkImage'];
    if(!name ||  !cost ){
        res.status(404).json({success: false, message: "required fields are missing"});
    }
    try {
        const juiceDrinkObj = JuiceDrinks({
            name,
            cost,
            description,
            juiceDrinkImageName: juiceDrinkImage? juiceDrinkImage[0].originalname :"",
            juiceDrinkImagePath: juiceDrinkImage? `/uploads/FoodType/ColdDrinks/${juiceDrinkImage[0].filename}` :""
        });
        await juiceDrinkObj.save();
        res.status(200).json({success: true, message: "Data Add", juiceDrinkObj})
    } catch (error) {
        console.error("Error Adding Data", error);
        res.status(500).json({success: false, message: "Internel Server Error"});
    }
}

module.exports = Add;