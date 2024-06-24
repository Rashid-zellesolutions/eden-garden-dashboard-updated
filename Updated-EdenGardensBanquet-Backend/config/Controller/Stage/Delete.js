const StageModel = require("../../Model/StageSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Stage = await StageModel.findById(id);
        if (!Stage) {
            return res.status(404).json({ message: "Stage not found" });
        } else {
            await StageModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "Stage deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Stage", error: err });
    }
};

module.exports = Delete;