const { SeatingArangments } = require('../../../Model/decore/Decor');
const fs = require('fs');
const path = require('path');

const Update = async (req, res) => {
    const { id } = req.params;
    const { name, cost } = req.body;
    const seatingImage = req.files['seatingImage'];
    try {
        const seatingObj = await SeatingArangments.findById(id);
        if (!seatingObj) {
            return res.status(400).json({ status: 400, message: "No Data Found" });
        }

        if (name) seatingObj.name = name;
        if (cost) seatingObj.cost = cost;

        if (seatingImage && seatingImage.length > 0) {
            // Delete old image file if it exists
            const oldImagePath = seatingObj.seatingArrangmentsImagePath;
            if (oldImagePath && fs.existsSync(path.resolve(`.${oldImagePath}`))) {
                fs.unlinkSync(path.resolve(`.${oldImagePath}`));
            }

            // Update with new file information
            seatingObj.seatingArrangmentsImageName = seatingImage[0].originalname;
            seatingObj.seatingArrangmentsImagePath = `/uploads/Decor/Seating-Arrangments/${seatingImage[0].filename}`;
        }

        await seatingObj.save();
        res.status(200).json({ status: 200, message: "Data Updated", seatingObj });
    } catch (error) {
        console.error("Error Updating Data:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = Update;
