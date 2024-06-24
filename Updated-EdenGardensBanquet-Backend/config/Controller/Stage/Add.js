const StageModel = require("../../Model/StageSchema");

const Add = async (req, res) => {
    const { name, addedBy, updatedBy, } = req.body;
    // console.log(services.length > 0)
    // Check if required parameters are missing
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Required Stage parameters are missing",
        });
    }
    try {
        const data = {
            name: name,
            addedBy: addedBy,
            updatedBy: updatedBy,
        }
        const Stage = await StageModel.create(data);
        res.status(200).json({
            status: 200,
            message: " Stage Added Successfully",
            Stage,

        });
    }
    catch (error) {
        console.error("Error Adding Stage", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add