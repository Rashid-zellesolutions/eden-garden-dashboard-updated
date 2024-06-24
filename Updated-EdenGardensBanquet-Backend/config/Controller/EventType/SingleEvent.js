const EventTypeModel = require('../../Model/EventTypeSchema');

const Single = async(req, res) => {
    const { id } = req.params;
    try {
        const eventType = await EventTypeModel.findById(id);
        if(!eventType){
            res.status(400).json({message: "Event Not available"});
            return;
        }else{
            res.status(200).json({success: true, eventType})
        }
    } catch (error) {
        res.status(500).json({message: "Error retriving Events", error: err})
    }
}

module.exports = Single;