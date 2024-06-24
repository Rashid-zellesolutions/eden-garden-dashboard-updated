const { ObjectId } = require('mongodb');
const FoodType = require('../../../Model/FoodMenue/FoodType');

const Add = async(req, res) => {
    const {foodType, packages} = req.body;
    try {
        console.log('Received request body:', req.body);
        // const convertedPackages = packages.map(pkg => ({
        //     ...pkg,
        //     appetizers: pkg.appetizers ? { ...pkg.appetizers, _id: new ObjectId(pkg.appetizers._id) } : null,
        //     mainEntries: pkg.mainEntries ? { ...pkg.mainEntries, _id: new ObjectId(pkg.mainEntries._id) } : null,
        //     desserts: pkg.desserts ? { ...pkg.desserts, _id: new ObjectId(pkg.desserts._id) } : null,
        //     teaCoffe: pkg.teaCoffe ? { ...pkg.teaCoffe, _id: new ObjectId(pkg.teaCoffe._id) } : null,
        //     juicesDrinks: pkg.juicesDrinks ? { ...pkg.juicesDrinks, _id: new ObjectId(pkg.juicesDrinks._id) } : null
        // }));
        
        
        const foodTypeObj = new FoodType({
            foodType,
            packages
            // packages: convertedPackages
        })
        
        await foodTypeObj.save();
        res.status(200).json({success: true, message: "Foood Type Added"});
    } catch (error) {
        console.error("Error Adding Food Type", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}



module.exports = Add;