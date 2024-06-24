// const NewRefundModel = require("../../Model/NewBookingSchema");
const NewBookingModel = require("../../Model/NewBookingSchema");
const RefundModel = require("../../Model/RefundPayment");
const Get = async (req, res) => {
    try {
        const Refund = await RefundModel.find();
        const bookings = await NewBookingModel.find();
        if (!Refund || !bookings) {
            res.status(400).json({
                message: "Payment or booking not available",
            });
            return;
        }

        // Assuming there is a common field (e.g., 'id') to link payment and booking
        const combinedData = [];

        Refund.forEach(Refund => {
            const correspondingBooking = bookings.find(booking => booking.id === Refund.id);

            if (correspondingBooking) {
                combinedData.push({
                    Refund: Refund,
                    booking: correspondingBooking,
                });
            }
        });

        res.json(combinedData);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Refund", error: err });
    }
};

module.exports = Get;