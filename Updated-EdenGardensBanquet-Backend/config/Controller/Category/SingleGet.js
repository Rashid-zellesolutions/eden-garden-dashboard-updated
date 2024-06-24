const CategoryModel = require("../../Model/CategorySchema");
const SettingServiceModel = require("../../Model/SettingServiceSchema");


const SingleGet = async (req, res) => {
    const { id } = req.params;
    try {
        const Category = await CategoryModel.findById(id);
        // console.log(Category);
        if (!Category) {
            res.status(400).json({
                message: "Category not available",
            });
            return;
        } else {
            const service = await SettingServiceModel.find({ category: Category._id });
            const categoryWithService = { ...Category._doc, services: service.length }
            res.status(200).json({ status: 200, Category: categoryWithService });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Category", error: err });
    }
};

module.exports = SingleGet;