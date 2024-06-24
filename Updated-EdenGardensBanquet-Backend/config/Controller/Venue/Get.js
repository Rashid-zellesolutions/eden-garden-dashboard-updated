const VenueModel = require("../../Model/VenueSchema");

const Get = async (req, res) => {
    const { name, capacity, fixedCharges, personCharges } = req.query;
    try {
        let Venue;
        let query = {};
        if(name) query.name = { $regex: new RegExp(`^${name}$`, 'i')};
        if(capacity) query.capacity = capacity;
        if(fixedCharges) query.fixedCharges = fixedCharges;
        if(personCharges) query.personCharges = personCharges;
        console.log(query)
        if(Object.keys(query).length > 0){
            Venue = await VenueModel.find(query);
        }else{
            Venue = await VenueModel.find();
        }

        if (Venue.length > 0) {
            res.status(200).json({status: 200, message: "Data Found", Venue})
        } else {
            return res.status(404).json({ message: "Venues not found" });
            console.log(Venue)
        }

    } catch (error) {
        console.error("Error retrieving venues:", error);
        res.status(500).json({ message: "Error retrieving venues", error });
    }
};

module.exports = Get;
