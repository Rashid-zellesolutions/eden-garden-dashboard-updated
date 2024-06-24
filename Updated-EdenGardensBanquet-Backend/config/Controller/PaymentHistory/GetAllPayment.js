const PaymentModel = require("../../Model/PaymentHistoryModel");
const NewBookingModel = require("../../Model/NewBookingSchema");

const GetAllPayment = async (req, res) => {
    try {
        const payments = await PaymentModel.find();
        const bookings = await NewBookingModel.find();

        if (!payments || !bookings) {
            res.status(400).json({
                message: "Payment or booking not available",
            });
            return;
        }

        // Assuming there is a common field (e.g., 'id') to link payment and booking
        const combinedData = [];

        payments.forEach(payment => {
            const correspondingBooking = bookings.find(booking => booking.id === payment.id);

            if (correspondingBooking) {
                combinedData.push({
                    payment: payment,
                    booking: correspondingBooking,
                });
            }
        });

        res.json(combinedData);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving data", error: err });
    }
};

module.exports = GetAllPayment;
