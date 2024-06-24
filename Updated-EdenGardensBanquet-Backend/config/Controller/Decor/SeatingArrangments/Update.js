const {SeatingArangments} = require('../../../Model/decore/Decor');

const Update = async(req, res) => {
    const {id} = req.params;
    const {name, cost} = req.body;
    const seatingImage = req.files['seatingImage'];
    try {
        const seatingObj = await SeatingArangments.findById(id);
        if(!seatingObj){
            res.status(400).json({status: 200, message: "No Data Found"});
        }
        if(name) seatingObj.name = name;
        if(cost) seatingObj.cost = cost;
        if(seatingImage){
            seatingObj.seatingArrangmentsImageName = seatingImage[0].originalname;
            seatingObj.seatingArrangmentsImagePath =  `/uploads/Decor/Seating-Arrangments/${seatingImage[0].filename}`;
        }
        console.log(seatingObj);
        console.log(seatingImage);
        await seatingObj.save();
        res.status(200).json({status: 200, message: "Data Updated", seatingObj})
    } catch (error) {
        console.error("Error Updating Data");
        res.status(500).json({status: 500, message: "Internel Server Error"});
    }
};

module.exports = Update;