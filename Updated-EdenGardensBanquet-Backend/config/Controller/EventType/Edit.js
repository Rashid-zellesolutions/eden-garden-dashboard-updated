const EventTypeModel = require("../../Model/EventTypeSchema");
const fs = require('fs');
const path = require('path')

const Edit = async (req, res) => {
    const { id } = req.params;
    // const newData = req.body;
    const {name, type} = req.body;
    const iconOne = req.files['iconOne'];
    const iconTwo = req.files['iconTwo'];

    // console.log(iconOne)
    // console.log(iconTwo)
    console.log(req.body)
    try {
        const EventType = await EventTypeModel.findById(id);
        if (!EventType) {
            return res.status(404).json({ status: 404, message: "EventType not found" });
        } 
        if(name) EventType.name = name;
        if(type) EventType.type = type;
        if(iconOne && iconOne.length > 0){
            const oldIconOne = EventType.iconOnePath;
            if(oldIconOne && fs.unlinkSync(path.resolve(`.${oldIconOne}`))){
                fs.unlinkSync(path.resolve(`.${oldIconOne}`))
            }
            EventType.iconOneName = iconOne[0].originalname;
            EventType.iconOnePath = `/uploads/add-event/${iconOne[0].filename}`;
        }
        if(iconTwo && iconTwo.length > 0){
            const oldIconTwo = EventType.iconTwoPath;
            if(oldIconTwo && fs.unlinkSync(path.resolve(`.${oldIconTwo}`))){
                fs.unlinkSync(path.resolve(`.${oldIconTwo}`))
            }
            EventType.iconTwoName = iconTwo[0].originalname;
            EventType.iconTwoPath = `/uploads/add-event/${iconTwo[0].filename}`
        }

        console.log(EventType.iconOneName)
        console.log(EventType.iconTwoName)
        console.log(EventType)

        await EventType.save();
        res.status(200).json({
            status: 200,
            message: "Event Updated Successfully",
            EventType,
        });
    } catch (error) {
        console.error("Error updating venue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = Edit