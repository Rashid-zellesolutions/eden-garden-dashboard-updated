const VenueModel = require('../../Model/VenueSchema')

const Add = async (req, res) => {
    const { name, capacity, fixedCharges, personCharges } = req.body;
    const venueImage = req.files['venueImage'];
    if (!name || !capacity || !venueImage || !fixedCharges || !personCharges ) {
        return res.status(400).json({
            status: 400,
            message: `Required Venue parameters are missing ${name}, ${capacity}, ${fixedCharges}, ${personCharges}`,
        });
    }

    console.log(req.body)
    console.log(venueImage)
    
    try {

        const venue = new VenueModel({
            name,
            venueImageName: venueImage[0].originalname,
            venueImagePath: `/uploads/venue/${venueImage[0].filename}`,
            capacity,
            fixedCharges,
            personCharges,
            
        }); 
        

        await venue.save()

        res.status(201).json({
            status: 200,
            message: " Venue Added Successfully",
            venue,
        });
    }
    catch (error) {
        console.error("Error Adding Venue", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = Add;
