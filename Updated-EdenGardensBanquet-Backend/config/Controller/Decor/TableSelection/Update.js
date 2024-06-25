const {TableSelection} = require('../../../Model/decore/Decor');
const fs = require('fs');
const path = require('path');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const tableImage = req.files['tableImage'];
    try {
        const tableObj = await TableSelection.findById(id);
        if(!tableObj){
            res.status(400).json({status: 200, message: "No Data Found"});
        }
        if(name) tableObj.name = name;
        if(tableImage && tableImage.length > 0){
            const oldPath = tableObj.tableImagePath;
            if(oldPath && fs.unlinkSync(path.resolve(`.${oldPath}`)))
            tableObj.tableImageName = tableImage[0].originalname;
            tableObj.tableImagePath = `/uploads/Decor/Stage${tableImage[0].filename}`;
        }
        await tableObj.save();
        res.status(200).json({status: 200, message: "Data Updated", tableObj})
    } catch (error) {
        console.error("Error Updating Data");
        res.status(500).json({status: 500, message: "Internel Server Error"});
    }
};

module.exports = Update;