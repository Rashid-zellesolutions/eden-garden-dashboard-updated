const NewBookingModel = require("../../Model/NewBookingSchema");
const PaymentModel = require("../../Model/PaymentHistoryModel");
const GetSingle = async (req, res) => {
    const { id } = req.params;
    try {
        const Booking = await NewBookingModel.findById(id);
        if (!Booking) {
            res.status(400).json({
                message: "Booking not available",
            });
            return;
        } else {
            res.json(Booking);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Booking", error: err });
    }
};

module.exports = GetSingle;