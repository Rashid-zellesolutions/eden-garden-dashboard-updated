const EventScapModel = require("../../Model/EventScapSchema");

const generateREPNumber = async (serviceName) => {
    // Logic to generate reference number based on your requirements
    // You can use a combination of current month, year, and a sequential number
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

    // Get the latest EventScap record to determine the next sequential number
    const latestEventScap = await EventScapModel.find();
    const latestNumber = latestEventScap ? latestEventScap.length + 1 : 1;

    // Take the first two letters of each word in serviceName and convert to uppercase
    const namePrefix = serviceName.split(' ').map(word => word.slice(0, 2).toUpperCase()).join('');

    // Combine all components to form the reference number
    const referenceNumber = `${namePrefix}-${month}-${year}-${latestNumber}`;

    return referenceNumber;
};

const Add = async (req, res) => {
    const { serviceName, serviceOptions, colorOptions, colorList, parentCategory, unitPrice, service, description } = req.body;

    // Check if required parameters are missing
    if (!serviceName || !parentCategory) {
        return res.status(400).json({
            status: 400,
            message: "Required EventScap parameters are missing",
        });
    }

    try {
        // Check if an EventScap with the same serviceName already exists
        const existingEventScap = await EventScapModel.findOne({ serviceName });

        if (existingEventScap) {
            return res.status(400).json({
                status: 400,
                message: "EventScap with the same name already exists",
            });
        }

        // If not, proceed with creating a new EventScap record
        const repNumber = await generateREPNumber(serviceName)
        const data = {
            esc: repNumber,
            serviceName: serviceName,
            serviceOptions: serviceOptions,
            colorOptions: colorOptions,
            colorList: colorList,
            parentCategory: parentCategory,
            unitPrice: unitPrice,
            service: service,
            description: description
        }
        const EventScap = await EventScapModel.create(data);
        res.status(200).json({
            status: 200,
            message: "EventScap Added Successfully",
            EventScap,
        });
    } catch (error) {
        // console.error("Error Adding Repair", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = Add;
