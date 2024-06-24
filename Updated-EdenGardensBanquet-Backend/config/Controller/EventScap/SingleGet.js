const EventScapModel = require("../../Model/EventScapSchema");

const SingleGet = async (req, res) => {
    const { id } = req.params; 
    try {
        const EventScap = await EventScapModel.findById(id);
        if (!EventScap) {
            res.status(400).json({
                message: "EventScap not available",
            });
            return;
        } else {
            res.status(200).json({ status: 200, EventScap });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving EventScap", error: err });
    }
};

module.exports = SingleGet;