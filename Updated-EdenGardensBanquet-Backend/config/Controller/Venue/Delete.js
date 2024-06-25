const VenueModel = require("../../Model/VenueSchema");
const fs = require('fs');
const path = require('path');


const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Venue = await VenueModel.findById(id);
        if (!Venue) {
            return res.status(404).json({ message: "Venue not found" });
        }
        const oldImage = Venue.venueImagePath;
        if(oldImage && fs.unlinkSync(path.resolve(`.${oldImage}`))){
            fs.unlinkSync(path.resolve(`.${oldImage}`));
        }
        await VenueModel.findByIdAndDelete(id);
        res.status(200).json({ status: 200, message: "Venue deleted successfully" });
        
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Venue", error: err });
    }
};

module.exports = Delete;