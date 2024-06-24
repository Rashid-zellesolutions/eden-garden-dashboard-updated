const {TeaCoffe} = require('../../../Model/FoodMenue/Packages');

const Add = async(req, res) => {
    const {name, cost,description} = req.body;
    const teaCoffeeImage = req.files['teaCoffeeImage'];
    if(!name || !cost   ){
        res.status(404).json({success: false, message: "required fields are missing"});
    }
    try {
        const teaCoffeObj = TeaCoffe({
            name,
            cost,
            description,
            teaCoffeImageName: teaCoffeeImage? teaCoffeeImage[0].originalname :"",
            teaCoffeImagePath:teaCoffeeImage? `/uploads/FoodType/HotDrinks/${teaCoffeeImage[0].filename}` :""
        });
        await teaCoffeObj.save();
        res.status(200).json({success: true, message: "Data Added", teaCoffeObj});


    } catch (error) {
        console.error("Error Adding Data", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = Add;