// const FoodType = require('../../../Model/FoodMenue/FoodType');

// const Update = async(req, res) => {
//     const {id} = req.params;
//     const {foodType, packages} = req.body
//     try {
//         const foodTypeObj = await FoodType.findById(id);
//         if(!foodTypeObj){
//             res.status(404).jsn({success: false, message: "Data not found"});
//         }
//         if(foodType) foodTypeObj.foodType = foodType;
//         if(packages) foodTypeObj.packages = packages;

//         if (packages) {
//             if (!Array.isArray(packages)) {
//                 return res.status(400).json({ success: false, message: "Packages should be an array" });
//             }

//             // Convert package items to objects if they are not already
//             const convertedPackages = packages.map(pkg => {
//                 if (typeof pkg === 'object' && pkg !== null) {
//                     return pkg; // If it's already an object, return as is
//                 } else {
//                     return { id: pkg }; // Otherwise, wrap it in an object
//                 }
//             });

//             foodTypeObj.packages = convertedPackages;
//         }

//         await foodTypeObj.save();
//         res.status(200).json({success: true, message: "Data Updated", foodTypeObj})
//     } catch (error) {
//         console.error("Error Updating Data", error);
//         res.status(500).json({success: false, message: "Internal Server Error"});
//     }
// }

// module.exports = Update;

const FoodType = require('../../../Model/FoodMenue/FoodType');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Update = async (req, res) => {
    const { id } = req.params;
    const { foodType, packages } = req.body;

    try {
        const foodTypeObj = await FoodType.findById(id);
        if (!foodTypeObj) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        if (foodType) foodTypeObj.foodType = foodType;
        if(packages) foodTypeObj.packages = packages;

        // if (packages) {
        //     if (!Array.isArray(packages)) {
        //         return res.status(400).json({ success: false, message: "Packages should be an array" });
        //     }

        //     const updatedPackages = packages.map(pkg => ({
        //         ...pkg,
        //         appetizers: pkg.appetizers ? { ...pkg.appetizers, _id: new ObjectId(pkg.appetizers._id) } : null,
        //         mainEntries: pkg.mainEntries ? { ...pkg.mainEntries, _id: new ObjectId(pkg.mainEntries._id) } : null,
        //         desserts: pkg.desserts ? { ...pkg.desserts, _id: new ObjectId(pkg.desserts._id) } : null,
        //         teaCoffe: pkg.teaCoffe ? { ...pkg.teaCoffe, _id: new ObjectId(pkg.teaCoffe._id) } : null,
        //         juicesDrinks: pkg.juicesDrinks ? { ...pkg.juicesDrinks, _id: new ObjectId(pkg.juicesDrinks._id) } : null
        //     }));
        //     console.log(updatedPackages)
        //     foodTypeObj.packages = updatedPackages;
        // }

        await foodTypeObj.save();
        res.status(200).json({ success: true, message: "Data Updated", foodTypeObj });
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = Update;


