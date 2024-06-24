const CategoryModel = require("../../Model/CategorySchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Category = await CategoryModel.findById(id);
        if (!Category) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        } else {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Category Updated Successfully",
                updatedCategory,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Category", error: err });
    }
}
module.exports = Edit