const VenueModel = require("../../Model/VenueSchema");
const Edit = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    // const venueImage = req.files;
    try {
        const Venue = await VenueModel.findById(id);
        if (!Venue) {
            return res.status(404).json({ status: 404, message: "Venue not found" });
        } else {
            // if(venueImage){
            //     newData.venueImageName = venueImage[0].originalname;
            //     newData.venueImagePath = venueImage[0].path;
            // }
            const updatedVenue = await VenueModel.findByIdAndUpdate(id, newData, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                message: "Venue Updated Successfully",
                updatedVenue,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error Updating Repair", error: err });
    }
}
module.exports = Edit