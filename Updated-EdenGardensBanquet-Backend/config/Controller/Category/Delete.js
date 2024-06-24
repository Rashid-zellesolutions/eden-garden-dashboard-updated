const CategoryModel = require("../../Model/CategorySchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Category = await CategoryModel.findById(id);
        if (!Category) {
            return res.status(404).json({ message: "Category not found" });
        } else {
            await CategoryModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Category deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Category", error: err });
    }
};

module.exports = Delete;