const NewBookingModel = require("../../Model/NewBookingSchema");
const PaymentModel = require("../../Model/PaymentHistoryModel");
const SinglePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const Booking = await PaymentModel.findById(id);
        if (!Booking) {
            res.status(400).json({
                message: "Booking not available",
            });
            return;
        } else {
            res.json(Booking);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Payment", error: err });
    }
};

module.exports = SinglePayment;