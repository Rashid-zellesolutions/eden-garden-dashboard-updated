const RefundModel = require("../../Model/RefundPayment");

const Add = async (req, res) => {
    const { id } = req.params;
    const { date, approvedby, accountType, account, cancelledFee, refundAmount, reason, total } = req.body;
    if (!date || !approvedby || !accountType || !cancelledFee  || !reason || !total) {
        return res.status(400).json({
            status: 400,
            message: "Required Booking parameters are missing",
        });
    }
    try {
        const data = {
            _id: id,
            date,
            approvedby,
            accountType,
            account,
            cancelledFee,
            total,
            refundAmount,
            reason
        }
        const Refund = await RefundModel.create(data);
        res.status(200).json({
            status: 200,
            message: "Refund added successfully",
            Refund,

        });
    } catch (err) {
        res.status(500).json({ message: "Error updating Refund", error: err });
    }
}
module.exports = Add
