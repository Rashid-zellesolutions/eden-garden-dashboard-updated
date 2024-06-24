const AttributeModel = require("../../Model/AttributesSchema");

const Add = async (req, res) => {
    const { name, attribute, addedBy, updatedBy } = req.body;
    // console.log(services.length > 0)
    // Check if required parameters are missing
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Required Attribute parameters are missing",
        });
    }
    try {
        const data = {
            attribute: attribute,
            name: name,
            addedBy: addedBy,
            updatedBy: updatedBy
        }
        const Attribute = await AttributeModel.create(data);
        res.status(200).json({
            status: 200,
            message: " Attribute Added Successfully",
            Attribute,

        });
    }
    catch (error) {
        console.error("Error Adding Attribute", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add