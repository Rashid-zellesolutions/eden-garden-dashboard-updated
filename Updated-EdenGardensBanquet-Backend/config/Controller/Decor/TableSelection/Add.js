const {TableSelection} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const {name, cost} = req.body;
    const tableImage = req.files['tableImage'];
    if(!name || !cost || !tableImage){
        res.status(400).json({status: 400, message: "required fields are missing"});
    }
    try {
        const tableObj = TableSelection({
            name,
            cost,
            tableImageName: tableImage[0].originalname,
            tableImagePath: tableImage[0].path
        })
        console.log(tableObj);
        await tableObj.save();
        res.status(200).json({status: 200, message: "Object Created", tableObj})
    } catch (error) {
        console.error("Error Adding Data", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}

module.exports = Add;