const { SeatingArangments } = require('../../../Model/decore/Decor');
const fs = require('fs');
const path = require('path');

const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const seatingObj = await SeatingArangments.findById(id);
        if (!seatingObj) {
            return res.status(400).json({ status: 400, message: "No Data Found" });
        }

        // Delete the image file
        const imagePath = seatingObj.seatingArrangmentsImagePath;
        if (imagePath && fs.existsSync(path.resolve(`.${imagePath}`))) {
            fs.unlinkSync(path.resolve(`.${imagePath}`));
        }

        // Remove the document from the database
        await SeatingArangments.findByIdAndDelete(id);
        res.status(200).json({ status: 200, message: "Data Deleted" });
    } catch (error) {
        console.error("Error Deleting Data:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = Delete;
