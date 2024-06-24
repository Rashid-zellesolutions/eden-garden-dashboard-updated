const EventScapModel = require("../../Model/EventScapSchema");


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const EventScap = await EventScapModel.findById(id);
        if (!EventScap) {
            return res.status(404).json({ message: "EventScap not found" });
        } else {
            await EventScapModel.findByIdAndDelete(id);
            res.status(200).json({ status: 200, message: "EventScap deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Deleting EventScap", error: err });
    }
};

module.exports = Delete;