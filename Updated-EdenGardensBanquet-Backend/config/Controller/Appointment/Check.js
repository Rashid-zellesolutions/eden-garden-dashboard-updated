const AppointmentSchema = require("../../Model/AppointmentSchema");

const CheckAppointment = async (req, res) => {
    const { date, name } = req.body;

    // Check if name or date is missing
    if (!date || !name) {
        return res.json({
            message: "Required Appointment parameters are missing",
        });
    }

    try {
        // Check if the date already exists in the database
        const existingAppointment = await AppointmentSchema.find({
            date,
            name,
        });

        if (existingAppointment && existingAppointment.length > 0) {
            return res.status(200).json({ status: 200, data: existingAppointment });
        }
        // If the date doesn't exist, add it to the database
        // const data = {
        //     date, name, slots: [
        //         {
        //             slot: "09:00 AM - 09:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "09:30 AM - 10:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "10:00 AM - 10:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "10:30 AM - 11:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "11:00 AM - 11:30 AM",
        //             "availability": "yes"
        //         },
        //         {
        //             slot: "11:30 AM - 12:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "12:00 AM - 12:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "12:30 AM - 01:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "01:00 AM - 01:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "01:30 AM - 02:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "02:00 AM - 02:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "02:30 AM - 03:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "03:00 AM - 03:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "03:30 AM - 04:00 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "04:00 AM - 04:30 AM",
        //             availability: "yes"
        //         },
        //         {
        //             slot: "04:30 AM - 05:00 AM",
        //             availability: "yes"
        //         },
        //     ],
        // };
        // const newSlot = await AppointmentSchema.create(data);
        res.status(400).json({
            status: 400,
            message: "Appointment Not Availabe",
            // data: newSlot
        });
    } catch (error) {
        console.error("Error adding Appointment date:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = CheckAppointment;
