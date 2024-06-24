
const dotenv = require("dotenv");
const express = require("express");
const path = require('path');

// Midleware to update packages of food type according to Any change
const appetizerChangeStream = require('./config/midlewares/ChangesStreem');
const mainEntriesChangeStream = require('./config/midlewares/ChangesStreem');
const dessertsChangeStream = require('./config/midlewares/ChangesStreem');
const teaCoffeChangeStream = require('./config/midlewares/ChangesStreem');
const juicesDrinksChangeStream = require('./config/midlewares/ChangesStreem')
const cors = require("cors");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const AuthenticationRoute = require("./config/Routes/AuthenticationRoute");
const BookingRoute = require("./config/Routes/BookingRoute");
const NewBookingRoute = require("./config/Routes/NewBookingRoute");
const SlotRoute = require("./config/Routes/SlotRoute");
const PaymentRoute = require("./config/Routes/PaymentRoute");
const RefundRoute = require("./config/Routes/RefundRoute");
const RepairRoute = require("./config/Routes/RepiarRoute");
const ServicesRoute = require("./config/Routes/ServicesRoute");
const EventScapRoute = require("./config/Routes/EventScapRoute");
const CategoryRoute = require("./config/Routes/CategoryRoute");
const SettingServiceRoute = require("./config/Routes/SettingServiceRoute");
const VenueRoute = require("./config/Routes/VenueRoute");
const EventTypeRoute = require("./config/Routes/EventTypeRoute");
const StageRoute = require("./config/Routes/StageRoute");
const AppointmentRoute = require("./config/Routes/AppointmentRoute");
const BookAppointmentRoute = require("./config/Routes/BookAppointmentRoute");
const ConsultantRoute = require("./config/Routes/ConsultantRoute");
const VendorsRoute = require("./config/Routes/VendorsRoute");
const SuppliesRoute = require("./config/Routes/SuppliesRoute");
const EmailSubscribeRoute = require("./config/Routes/EmailSubscribeRoute");
const AppointmentEmailSend = require("./config/Routes/AppointmentEmailSendRoute");

// Decor Section Routes
const SeatingArrangements = require('./config/Routes/decorRoutes/SeatingArrangmentsRoutes');
const TableSelection = require('./config/Routes/decorRoutes/TableSelectionRoutes');
const ChairSelection = require('./config/Routes/decorRoutes/ChairSelectionRoutes');
const StageSize = require('./config/Routes/decorRoutes/StageSizeRoutes');
const BackdropAndMandap = require('./config/Routes/decorRoutes/BackdropAndMandap');
const CenterPiece = require('./config/Routes/decorRoutes/CenterPieceRoutes');
const Lightning = require('./config/Routes/decorRoutes/LightningRoutes');

// Others Section Routes
const DiningOption = require('./config/Routes/OtherRoutes/DiningOptionRoutes');
const CutleryRoutes = require('./config/Routes/OtherRoutes/CutleryRoutes');
const SoundRoutes = require('./config/Routes/OtherRoutes/SoundRoutes');
const ExtrasRoute = require('./config/Routes/OtherRoutes/ExtrasRoute');

// Food Type Routes
const FoodTypeRoutes = require('./config/Routes/FoodTypeRoutes/FoodTypeRoutes')

// Food Type Objects Routes
const TeaCoffee = require('./config/Routes/FoodTypeRoutes/TeaCoffeRoutes');
const Appetiser = require('./config/Routes/FoodTypeRoutes/AppetizersRoutes');
const Dessert = require('./config/Routes/FoodTypeRoutes/DessertRoutes');
const MainEntries = require('./config/Routes/FoodTypeRoutes/MainEntries');
const JuicesDrinks = require('./config/Routes/FoodTypeRoutes/JuicesDrinksRoutes');

const RolesRoutes = require("./config/Routes/RolesRoutes");

const deleteRoute1 = require('./config/Routes/deleteRoute1');


// config env
dotenv.config();


// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//  config mongodb
// const DBURI = `${process.env.MONGODB_URL}`;
const DBURI = "mongodb+srv://rashidalizellesolutions:Sniper+122@mycluster.v4cfzgl.mongodb.net/eden-garden-backend";
mongoose.connect(DBURI);
mongoose.connection.on("connected", () => console.log("Database Connect"));
mongoose.connection.on("error", () => console.log("error"));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/deleteroute1",deleteRoute1);

// AuthenticationRoute router
app.use("/api/v1/Authentication", AuthenticationRoute);

// Booking router
app.use("/api/v1/Booking", BookingRoute);

// New Booking router
app.use("/api/v1/New-Booking", NewBookingRoute);

//Slot Route
app.use("/api/v1/Slot", SlotRoute);

//Payment Route
app.use("/api/v1/Payment", PaymentRoute);

//Refund Route
app.use("/api/v1/Refund", RefundRoute);

//Repair Route
app.use("/api/v1/Repair", RepairRoute);

//Services Route
app.use("/api/v1/Services", ServicesRoute);

//EventScap Route
app.use("/api/v1/EventScap", EventScapRoute);

//Category Route
app.use("/api/v1/Category", CategoryRoute);

//SettingService Route
app.use("/api/v1/SettingService", SettingServiceRoute);

//Venue Route
app.use("/api/v1/Venue", VenueRoute);

//EventType Route
app.use("/api/v1/EventType", EventTypeRoute);

//Stage Route
app.use("/api/v1/Stage", StageRoute);

//Appointment Route
app.use("/api/v1/Appointment", AppointmentRoute);
//BookAppointment Route
app.use("/api/v1/BookAppointment", BookAppointmentRoute);

//Consultant Route
app.use("/api/v1/Consultant", ConsultantRoute);

//Vendors Route
app.use("/api/v1/Vendors", VendorsRoute);

app.use("/api/v1/Supplies", SuppliesRoute);

app.use("/api/v1/Roles", RolesRoutes);


app.use("/api/v1/Email", EmailSubscribeRoute);

app.use("/api/v1/Email", AppointmentEmailSend);

//Slash Route
app.get("/", (req, res) => {
  res.send(`<h1> hello world!</h1>`);
});

// Decor Routes 
app.use('/api/v1/SeatingArrangments', SeatingArrangements);
app.use('/api/v1/TableSelect', TableSelection);
app.use("/api/v1/ChairSelection", ChairSelection)
app.use("/api/v1/StageSize", StageSize);
app.use('/api/v1/BackdropAndMandap', BackdropAndMandap);
app.use('/api/v1/CenterPieces', CenterPiece)
app.use('/api/v1/Lighting', Lightning);

// Others Routes
app.use('/api/v1/Dining', DiningOption);
app.use('/api/v1/Cutlery', CutleryRoutes);
app.use('/api/v1/Sound', SoundRoutes);
app.use('/api/v1/Extras', ExtrasRoute);


// FoodType Routes
app.use('/api/v1/FoodType', FoodTypeRoutes)

// Food Type Objec Routes
app.use('/api/v1/TeaCoffee', TeaCoffee);
app.use('/api/v1/Appetizers', Appetiser);
app.use('/api/v1/Dessert', Dessert);
app.use('/api/v1/MainEntries', MainEntries);
app.use('/api/v1/JuicesDrinks', JuicesDrinks);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

// process.on("unhandledRejection", err => {
//   console.log(`An error occurred: ${err.message}`)
//   server.close(() => process.exit(1))
// })