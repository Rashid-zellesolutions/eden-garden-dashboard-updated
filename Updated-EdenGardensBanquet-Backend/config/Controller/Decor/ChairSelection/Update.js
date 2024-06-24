const {ChairSelection} = require('../../../Model/decore/Decor');

const Update = async(req, res) => {
    const {id} = req.params
    const {name, cost,description} = req.body
    const chairSelectionImage = req.files['chairImage'];

    // console.log(id)
    // console.log(name, cost)
    // console.log(chairSelectionImage)
    try {
        const chairObj = await ChairSelection.findById(id);
        if(!chairObj){
            res.status(400).json({status: 400, message: "Data not found"})
        }
        if(name) chairObj.name = name;
        if(cost) chairObj.cost = cost;
        if(description) chairObj.description = description;
        if(chairSelectionImage){
            chairObj.chairImageName = chairSelectionImage[0].originalname;
            chairObj.chairImagePath = chairSelectionImage[0].path
        }

        console.log(chairSelectionImage)
        console.log(chairObj)
        await chairObj.save();
        res.status(200).json({status: 200, message: "Data Updated", chairObj});
        
    } catch (error) {
        console.error("Error Updating Data", error);
        res.status(500).json({status: 500, message: "internal servver error"});
    }
};

module.exports = Update;