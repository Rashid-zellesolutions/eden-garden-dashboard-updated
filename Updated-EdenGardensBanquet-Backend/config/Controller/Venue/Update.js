const VenueModel = require('../../Model/VenueSchema');

const Update = async (req, res) => {
    const { id } = req.params;
    const { name, capacity, fixedCharges, personCharges, imageLinks } = req.body;
    const venueImage = req.files['venueImage'];

    try {
        const venue = await VenueModel.findById(id);
        if (!venue) {
            return res.status(404).json({ status: 404, message: "Venue not found" });
        }

        // Update only the fields that are provided in the request body
        if (name) venue.name = name;
        if (capacity) venue.capacity = capacity;
        if (fixedCharges) venue.fixedCharges = fixedCharges;
        if (personCharges) venue.personCharges = personCharges;
        if (venueImage) {
            venue.venueImageName = venueImage[0].originalname;
            venue.venueImagePath = `/uploads/venue/${venueImage[0].filename}`;
        }
        if (imageLinks) venue.imageLinks = imageLinks;

        await venue.save();

        res.status(200).json({
            status: 200,
            message: "Venue Updated Successfully",
            venue,
        });
    } catch (error) {
        console.error("Error updating venue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = Update;
