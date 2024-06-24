const EventTypeModel = require("../../Model/EventTypeSchema");

const Get = async (req, res) => {
    const {name, type} = req.query;
    try {
        let EventType;
        let query = {};
        if(name) query.name = { $regex: `^${name}`, Option: 'i'}
        if(type) query.type = type
        if(Object.keys(query).length > 0){
            EventType = await EventTypeModel.find(query);
        }else{
            EventType = await EventTypeModel.find();
            
        }
        if (EventType.length > 0) {
            res.status(200).json({ status: 200, message: "Data Found", EventType });
        }else { 
            res.status(400).json({
                message: "EventType not available",
            });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving EventType", error: err });
    }
};

module.exports = Get;