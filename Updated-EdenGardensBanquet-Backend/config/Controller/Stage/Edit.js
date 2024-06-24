const StageModel = require("../../Model/StageSchema");
const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const Stage = await StageModel.findById(id);
        if (!Stage) {
            return res.status(404).json({ status: 404, message: "Stage not found" });
        } else {
            const updatedStage = await StageModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Stage Updated Successfully",
                updatedStage,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Stage", error: err });
    }
}
module.exports = Edit