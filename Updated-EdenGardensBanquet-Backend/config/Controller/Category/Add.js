const CategoryModel = require("../../Model/CategorySchema");

const Add = async (req, res) => {
    const { name, addedBy, updatedBy } = req.body;
    // console.log(services.length > 0)
    // Check if required parameters are missing
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Required Category parameters are missing",
        });
    }
    try {
        const data = {
            name: name,
            addedBy: addedBy,
            updatedBy: updatedBy
        }
        const Category = await CategoryModel.create(data);
        res.status(200).json({
            status: 200,
            message: " Category Added Successfully",
            Category,

        });
    }
    catch (error) {
        console.error("Error Adding Category", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add