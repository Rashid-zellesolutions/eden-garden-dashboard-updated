const { MainEntries } = require('../../../Model/FoodMenue/Packages');

const Add = async (req, res) => {
    const { name, cost,description } = req.body;
    const mainEntriesImage = req.files['mainEntriesImage'];

    if (!name || !cost ) {
        return res.status(404).json({ success: false, message: "required fields are missing" });
    }

    try {
        const mainEntriesObj = new MainEntries({
            name,
            cost,
            description,
            mainEntriesImageName: mainEntriesImage ? mainEntriesImage[0].originalname : "",
            mainEntriesImagePath: mainEntriesImage ? `/uploads/FoodType/MainEntrees/${mainEntriesImage[0].filename}` : ""
        });

        await mainEntriesObj.save();
        res.status(200).json({ success: true, message: "Data Added", mainEntriesObj });
    } catch (error) {
        console.error("error Adding Data ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = Add;
