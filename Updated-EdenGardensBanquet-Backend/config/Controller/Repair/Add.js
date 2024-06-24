const RepairModel = require("../../Model/RepairSchem");
const generateREPNumber = async () => {
    // Logic to generate reference number based on your requirements
    // You can use a combination of current month, year, and a sequential number
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

    // Get the latest payment record to determine the next sequential number
    const latestNewBooking = await RepairModel.find();
    const latestNumber = latestNewBooking ? latestNewBooking.length + 1 : 1;

    // Combine all components to form the reference number
    const referenceNumber = `REP-${month}-${year}-${latestNumber}`;

    return referenceNumber;
};
const Add = async (req, res) => {
    const { repair } = req.body;
    // console.log(repair.length > 0)
    // Check if required parameters are missing
    if (repair?.length < 0) {
        return res.status(400).json({
            status: 400,
            message: "Required Repair parameters are missing",
        });
    }
    try {

        const repNumber = await generateREPNumber()
        const data = {
            rep: repNumber,
            repair: repair
        }
        const Repair = await RepairModel.create(data);
        res.status(200).json({
            status: 200,
            message: "Repair Added Successfully",
            Repair,

        });
    }
    catch (error) {
        console.error("Error Adding Repair", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Add