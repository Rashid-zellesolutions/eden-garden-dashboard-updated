const VendorsModel = require("../../Model/VendorsSchema");

const Add = async (req, res) => {
    const { name, addedBy, updatedBy } = req.body;
    // console.log(name.length > 0)
    // Check if required parameters are missing
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Required name parameter are missing",
        });
    }
    try {
        let nameCheck = await VendorsModel.find({ name })
        if (nameCheck.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "this name is already exist",
            });
        }
        const data = {
            name: name,
            addedBy,
            updatedBy
        }
        const Vendors = await VendorsModel.create(data);
        res.status(200).json({
            status: 200,
            message: "Vendors Added Successfully",
            Vendors,

        });
    }
    catch (error) {
        console.error("Error Adding Vendors", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add