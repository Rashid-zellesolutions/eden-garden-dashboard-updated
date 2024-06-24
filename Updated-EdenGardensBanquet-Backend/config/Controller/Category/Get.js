const CategoryModel = require("../../Model/CategorySchema");
const SettingServiceModel = require("../../Model/SettingServiceSchema");

const Get = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        if (!categories || categories.length === 0) {
            res.status(400).json({
                message: "Category not available",
            });
            return;
        }

        // Loop through each category and fetch related SettingService records
        const categoriesWithSettingServices = await Promise.all(
            categories.map(async (category) => {
                const settingServices = await SettingServiceModel.find({
                    category: category._id,
                });

                const categoryWithServices = { ...category._doc, services: settingServices.length }
                    
                return categoryWithServices;
            })
        );

        res.status(200).json({
            status: 200,
            Category: categoriesWithSettingServices,
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Category", error: err });
    }
};

module.exports = Get;
