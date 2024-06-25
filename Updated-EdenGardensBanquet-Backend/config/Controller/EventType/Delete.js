const EventTypeModel = require("../../Model/EventTypeSchema");
const fs = require('fs');
const path = require('path');


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const EventType = await EventTypeModel.findById(id);
        if (!EventType) {
            return res.status(404).json({ message: "EventType not found" });
        }
        const oldIconOne = EventType.iconOnePath;
        const oldIconTwo = EventType.iconTwoPath;
        if(oldIconOne && fs.unlinkSync(path.resolve(`.${oldIconOne}`))){
            fs.unlinkSync(path.resolve(`.${oldIconOne}`));
        }
        if(oldIconTwo && fs.unlinkSync(path.resolve(`.${oldIconTwo}`))){
            fs.unlinkSync(path.resolve(`.${oldIconTwo}`));
        }
        await EventTypeModel.findByIdAndDelete(id);
        res.status(200).json({ status: 200, message: "EventType deleted successfully" });
        
    } catch (err) {
        res.status(500).json({ message: "Error Deleting EventType", error: err });
    }
};

module.exports = Delete;