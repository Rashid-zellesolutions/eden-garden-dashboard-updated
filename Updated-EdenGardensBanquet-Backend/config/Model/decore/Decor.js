const mongoose = require('mongoose');

// Seating Arrangment Schema
const SeatingArrangmentsSchema = new mongoose.Schema({
    name:{type:String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    seatingArrangmentsImageName: {type: String, required: true},
    seatingArrangmentsImagePath: {type:String, required: true},
    createdAt: {type: Date, default: Date.now}
});

// Table Selection Schema
const TableSelectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String,required: true},
    tableImageName: {type: String, required: true},
    tableImagePath: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

// Chair Selection Schema
const ChairSelectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    chairImageName: {type: String, required: true},
    chairImagePath: {type: String, required: true},
    uId: {type: String, default: 'chair'},
    createdAt: {type: Date, default: Date.now}
});

// Stage Dimentions Schema
const StageSizeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    description: {type: String, required: false},
    stageImageName: {type: String, required: false},
    stageImagePath: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

// Backdrop and mandap Schema
const BackdropAndMandapSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    backdropImageName: {type: String, required: true},
    backdropImagePath: {type: String, required: true},
    description: {type: String, required: false},
    uId: {type: String, default: 'backdrop'},
    createdAt: {type: Date, default: Date.now}
});

// Center piece Schema
const CenterPiecesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    centerPieceImageName: {type: String, required: true},
    centerPieceImagePath: {type: String, required: true},
    description: {type: String, required: false},
    uId: {type: String, default: 'cp'},
    createdAt: {type: Date, default: Date.now}
});

// Lightning Schema
const LightningSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    lightingImageName: {type: String, required: true},
    lightingImagePath: {type: String, required: true},
    description: {type: String, required: false},
    uId: {type: String, default: 'lg'},
    createdAt: {type: Date, default: Date.now}
});

const SeatingArangments = mongoose.model("SeatingArangments", SeatingArrangmentsSchema);
const TableSelection = mongoose.model("TableSelection", TableSelectionSchema);
const ChairSelection = mongoose.model("ChairSelection", ChairSelectionSchema);
const StageSize = mongoose.model("StageSize", StageSizeSchema);
const BackdropAndMandap = mongoose.model("Backdrop", BackdropAndMandapSchema);
const CenterPiece = mongoose.model("CenterPiece", CenterPiecesSchema);
const Lightning = mongoose.model("Lightning", LightningSchema)

module.exports = {
    SeatingArangments, 
    TableSelection, 
    ChairSelection, 
    StageSize, 
    BackdropAndMandap, 
    CenterPiece, 
    Lightning
}