const ServicesModel = require("../../Model/ServicesSchema");

const generateSERNumber = async () => {
    // Logic to generate reference number based on your requirements
    // You can use a combination of current month, year, and a sequential number
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

    // Get the latest payment record to determine the next sequential number
    const latestNewBooking = await ServicesModel.find();
    const latestNumber = latestNewBooking ? latestNewBooking.length + 1 : 1;

    // Combine all components to form the reference number
    const referenceNumber = `SER-${month}-${year}-${latestNumber}`;

    return referenceNumber;
};
const Add = async (req, res) => {
    const { services } = req.body;
    // console.log(services.length > 0)
    // Check if required parameters are missing
    if (services?.length < 0) {
        return res.status(400).json({
            status: 400,
            message: "Required Services parameters are missing",
        });
    }
    try {

        const serNumber = await generateSERNumber()
        const data = {
            ser: serNumber,
            services: services
        }
        const service = await ServicesModel.create(data);
        res.status(200).json({
            status: 200,
            message: " Services Added Successfully",
            service,

        });
    }
    catch (error) {
        console.error("Error Adding Services", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add