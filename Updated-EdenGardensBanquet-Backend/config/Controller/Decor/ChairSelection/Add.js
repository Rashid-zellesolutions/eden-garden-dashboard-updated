const {ChairSelection} = require('../../../Model/decore/Decor');

const Add = async(req, res) => {
    const {name, cost,description} = req.body;
    const chairImage = req.files['chairImage'];
    if(!name || !cost || !chairImage){
        res.status(400).json({status: 400, message: "required fields are missing"});
    }
    try {
        const tableObj = ChairSelection({
            name,
            cost,
            description,
            chairImageName: chairImage[0].originalname,
            chairImagePath: `/uploads//Decor/Chairs/${chairImage[0].filename}`
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