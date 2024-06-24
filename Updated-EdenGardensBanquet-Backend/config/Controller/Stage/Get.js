const StageModel = require("../../Model/StageSchema");

const Get = async (req, res) => {
    try {
        const Stage = await StageModel.find();
        if (!Stage) {
            res.status(400).json({
                message: "Stage not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, Stage });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Stage", error: err });
    }
};

module.exports = Get;