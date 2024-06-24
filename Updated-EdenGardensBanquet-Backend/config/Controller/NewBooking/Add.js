const { Types } = require("mongoose");
const NewBookingModel = require("../../Model/NewBookingSchema");
const SlotModel = require("../../Model/SlotSchema");
const PaymentModel = require("../../Model/PaymentHistoryModel");
const nodemailer = require("nodemailer");
require("dotenv").config();
const generateINVNumber = async () => {
    // Logic to generate reference number based on your requirements
    // You can use a combination of current month, year, and a sequential number
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

    // Get the latest payment record to determine the next sequential number
    const latestNewBooking = await NewBookingModel.find();
    const latestNumber = latestNewBooking ? latestNewBooking.length + 1 : 1;

    // Combine all components to form the reference number
    const referenceNumber = `INV-${month}-${year}-${latestNumber}`;

    return referenceNumber;
};
const Add = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        zip,
        city,
        state,
        venue,
        selectedDate,
        selectedSlot,
        eventType,
        minPerson,
        maxPerson,
        createAt,
        updated,
        Services,
        summary,
        venueCharges,
        stage,
        capacity,
        venueUnitPrice,
        custom,
        inventory, Status, note
    } = req.body;

    // Check if required parameters are missing
    if (
        !firstName ||
        !email ||
        !phone ||
        !zip ||
        !city ||
        !state ||
        !venue.length ||
        !selectedDate ||
        !selectedSlot.length ||
        !eventType ||
        !minPerson ||
        !maxPerson ||
        !createAt ||
        !Status
    ) {
        return res.status(400).json({
            status: 400,
            message: "Required Booking parameters are missing",
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            service: "webmail", // Use lowercase "gmail" for the service
            secure: true,
            host: "mail.zameeransari.com.pk",
            tls: {
                rejectUnauthorized: false, // Allow less secure apps (not recommended)
            },
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });
        const sharedId = new Types.ObjectId();
        const results = await Promise.all(
            venue.map(async (element) => {
                const currentDate = selectedDate;

                // Check if slots exist for the given venue and date
                const existingSlots = await SlotModel.find({
                    date: currentDate,
                    venue: element,
                });

                // If no slots are available, return an error
                if (!existingSlots.length) {
                    throw { status: 500, message: `No available slots for ${element} on ${currentDate}` };
                }

                // Check if the selected slots are valid
                const invalidSlots = selectedSlot.filter(slot =>
                    !existingSlots.some(e =>
                        e.slots.some(s =>
                            s.slot === slot && s.availability === 'yes'
                        )
                    )
                );

                if (invalidSlots.length > 0) {
                    throw {
                        status: 500,
                        message: `The following slots are not available: ${invalidSlots.join(', ')}`,
                    };
                }

                // Update slot availability based on the selected slots
                for (let i = 0; i < existingSlots.length; i++) {
                    for (let j = 0; j < existingSlots[i].slots.length; j++) {
                        const slot = existingSlots[i].slots[j];
                        if (selectedSlot.includes(slot.slot)) {
                            slot.availability = 'no';
                        }
                        if (slot.slot === 'Full Day') {
                            slot.availability = 'no';
                        }

                    }
                }

                // If Full Day is selected, set the availability of all slots to 'no'
                if (selectedSlot.includes('Full Day')) {
                    for (let i = 0; i < existingSlots.length; i++) {
                        for (let j = 0; j < existingSlots[i].slots.length; j++) {
                            existingSlots[i].slots[j].availability = 'no';
                        }
                    }
                }

                // For Full Day event, ensure only one slot is present in the array
                if (selectedSlot.includes('Full Day')) {
                    const fullDaySlotIndex = selectedSlot.findIndex(slot => slot === 'Full Day');
                    selectedSlot.splice(fullDaySlotIndex + 1);
                }

                // Add the booking
                await Promise.all(existingSlots.map(e => e.save()));
            })
        );

        const hasErrors = results.some(result => result instanceof Error);
        const invNumber = await generateINVNumber()
        if (!hasErrors) {
            const data = {
                inv: invNumber,
                _id: sharedId,
                firstName,
                lastName,
                email,
                phone,
                zip,
                city,
                state,
                venue,
                selectedDate,
                selectedSlot,
                eventType,
                minPerson,
                maxPerson,
                createAt,
                updated,
                Services,
                venueCharges,
                summary,
                stage,
                capacity,
                venueUnitPrice,
                Status: Status,
                custom,
                inventory,
                note: note
            };

            const Booking = await NewBookingModel.create(data);
            const paymentHistory = {
                _id: sharedId,
                recived: 0,
                balance: summary.total,
                total: summary.total,
            }
            const payment = await PaymentModel.create(paymentHistory);

            const template = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Email Title</title>
      <style>
        /* Inline CSS for better compatibility */
        .center {
          text-align: center;
        }
        .borders {
          border: 1px solid #000;
        }
        .width-100{
          width:100%
        }
        body{
          font-family: 'Poppins', sans-serif;
        }
        body,p,th,td,h2,h4{
          font-family: 'Poppins', sans-serif;
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
    rel="stylesheet"
  />
    </head>
    <body style="margin: 0; padding: 0; text-align: center;
    font-family: 'Poppins', sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0" style="background-color: #efefef">
              <tr>
                <td align="center" bgcolor="#E7E7E7">
                  <div style="text-align: center">
                    <img width="100" height="100" src="https://res.cloudinary.com/dnwbw493d/image/upload/v1699033802/Zameer-Logo-New_e52irz.jpg" alt="">
                  </div>
                  </td>
                  </tr>
                  </table>
                  </td>
                  </tr>
                  </table>
                  <body>
                  </html>`
            const UserEmailOptions = {
                from: `${process.env.EMAIL_USERNAME} <${process.env.EMAIL}>`,
                // bcc: [
                //   "shuja.zellesolutions@gmail.com",
                //   "osama.zellesolutions@gmail.com",
                //   "faraya.zellesolutions@gmail.com",
                //   "sawera.zellesolutions@gmail.com",
                //   "sajid.zellesolutions@gmail.com",
                //   "aman.zellesolutions@gmail.com",
                //   "arbaz.zellesolutions@gmail.com",
                // ],
                to: `saqib.zellesolutions@gmail.com`,
                subject:
                    "Your Eden Garden Booking Confirm",
                html: template,
            };
            await new Promise((resolve, reject) => {
                // send mail
                transporter.sendMail(UserEmailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });
            res.status(200).json({
                status: 200,
                message: selectedSlot.includes("Full Day")
                    ? "Full day event booked successfully"
                    : "Booking added successfully",
                Booking,

            });
        } else {
            // Handle errors from Promise.all
            res.status(500).json({ message: "Error in processing slots" });
        }
    } catch (error) {
        console.error("Error adding booking", error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = Add;
