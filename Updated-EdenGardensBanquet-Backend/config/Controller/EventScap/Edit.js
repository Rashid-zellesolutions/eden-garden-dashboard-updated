const EventScapModel = require("../../Model/EventScapSchema");

const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const EventScap = await EventScapModel.findById(id);
        if (!EventScap) {
            return res.status(404).json({ status: 404, message: "EventScap not found" });
        } else {
            const updatedEventScap = await EventScapModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "EventScap Updated Successfully",
                updatedEventScap,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating EventScap", error: err });
    }
}
module.exports = Edit