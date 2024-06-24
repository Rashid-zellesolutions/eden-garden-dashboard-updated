const AttributeModel = require("../../Model/AttributesSchema");
const CategoryModel = require("../../Model/CategorySchema");
const SettingServicesModel = require("../../Model/SettingServiceSchema");


const Get = async (req, res) => {
    try {
        const Services = await SettingServicesModel.find();
        if (!Services) {
            res.status(400).json({
                message: "Services not available",
            });
            return;
        } else {
            const categoriesWithSettingServices = await Promise.all(
                Services.map(async (category) => {
                    const settingServices = await CategoryModel.findById({
                        _id: category.category,
                    });
                    // const Attribute = await AttributeModel.find({ name: category.name })
                    const categoryWithServices = { ...category._doc, category: settingServices?.name }

                    return categoryWithServices;
                })
                // console.log(settingServices);
            );
            res.status(200).json({ status: 200, Services: categoriesWithSettingServices });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Services", error: err });
    }
};

module.exports = Get;