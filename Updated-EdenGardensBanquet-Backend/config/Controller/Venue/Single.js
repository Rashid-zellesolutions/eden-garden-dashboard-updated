const VenueModel = require('../../Model/VenueSchema');

const Single = async(req, res) => {
    const {id} = req.params;
    try {
        const singleVenue = await VenueModel.findById(id);
        if(!singleVenue){
            res.status(400).json({message: "Venue Not Available"});
        }else{
            res.status(200).json({success: true, singleVenue})
        }
    } catch (error) {
        res.status(500).json({message: "Error retriving Events", error: err})
    }
}

module.exports = Single;