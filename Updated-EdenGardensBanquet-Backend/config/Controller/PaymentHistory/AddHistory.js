// const PaymentModel = require("../../Model/PaymentHistoryModel");
// const generateReferenceNumber = async () => {
//     // Logic to generate reference number based on your requirements
//     // You can use a combination of current month, year, and a sequential number
//     const currentDate = new Date();
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
//     const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

//     // Get the latest payment record to determine the next sequential number
//     const latestPayment = await PaymentModel.findOne().sort({ _id: -1 });
//     const latestNumber = latestPayment ? latestPayment.paymentHistory.length + 1 : 1;

//     // Combine all components to form the reference number
//     const referenceNumber = `REC-${month}-${year}-${latestNumber}`;

//     return referenceNumber;
// };
// const AddPayment = async (req, res) => {
//     const { id } = req.params;
//     const { recived, balance, total, paymentHistory } = req.body;
//     // console.log(newData, recived);
//     try {
//         const Payment = await PaymentModel.findById(id)
//         if (!Payment) {
//             return res.status(404).json({ message: "Booking not found" });
//         } else {
//             const referenceNumber = await generateReferenceNumber();
//             const updatedPaymentHistory = paymentHistory.map(entry => ({
//                 ...entry,
//                 ref: referenceNumber,
//             }));
//             const PaymentAdd = await PaymentModel.findByIdAndUpdate(id, {
//                 $set: {
//                     recived: recived,
//                     balance: balance,
//                     total: total,
//                     paymentHistory: updatedPaymentHistory,
//                 },
//             }, {
//                 new: true,
//             });
//             res.status(200).json({
//                 message: "Payment Add Successfully",
//                 PaymentAdd,
//             });
//         }
//     } catch (err) {
//         res.status(500).json({ message: "Error updating Booking", error: err });
//     }
// }
// module.exports = AddPayment
const PaymentModel = require("../../Model/PaymentHistoryModel");

const generateReferenceNumber = async () => {
    // Logic to generate reference number based on your requirements
    // You can use a combination of current month, year, and a sequential number
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const year = currentDate.getFullYear().toString().slice(2); // Take the last two digits of the year

    // Get the latest payment record to determine the next sequential number
    const latestPayment = await PaymentModel.findOne().sort({ _id: -1 });
    const latestNumber = latestPayment ? latestPayment.paymentHistory.length + 1 : 1;

    // Combine all components to form the reference number
    const referenceNumber = `REC-${month}-${year}-${latestNumber}`;

    return referenceNumber;
};

const AddPayment = async (req, res) => {
    const { id } = req.params;
    const { recived, balance, total, paymentHistory } = req.body;

    try {
        const Payment = await PaymentModel.findById(id);

        if (!Payment) {
            return res.status(404).json({ message: "Booking not found" });
        } else {
            const updatedPaymentHistory = [];

            // Identify new entries and generate a unique reference number for them
            for (let i = 0; i < paymentHistory.length; i++) {
                const entry = paymentHistory[i];
                if (!entry.ref) {
                    const referenceNumber = await generateReferenceNumber();
                    updatedPaymentHistory.push({
                        ...entry,
                        ref: referenceNumber,
                    });
                } else {
                    // Preserve the existing entries
                    updatedPaymentHistory.push(entry);
                }
            }

            const PaymentAdd = await PaymentModel.findByIdAndUpdate(id, {
                $set: {
                    recived: recived,
                    balance: balance,
                    total: total,
                    paymentHistory: updatedPaymentHistory,
                },
            }, {
                new: true,
            });

            res.status(200).json({
                message: "Payment Add Successfully",
                PaymentAdd,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating Booking", error: err });
    }
};

module.exports = AddPayment;
