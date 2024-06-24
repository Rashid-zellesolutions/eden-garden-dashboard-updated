import { Route, Routes, useNavigate } from "react-router-dom";
import AddAttribute from "../Components/Pages/AddAttribute";
import AddSettingService from "../Components/Pages/AddSettingService";
import AllAppointment from "../Components/Pages/AllAppointment";
import AllBooking from "../Components/Pages/AllBooking";
import AllCategory from "../Components/Pages/AllCategory";
import AllServicesAndRepair from "../Components/Pages/AllServicesAndRepair";
import AddBooking from "../Components/Pages/Booking/AddBooking";
import CancelledHistory from "../Components/Pages/CancelledHistory";
import AddCategory from "../Components/Pages/Category";
import EventPlanner from "../Components/Pages/EventPlanner";
import EventPlannerData from "../Components/Pages/EventPlannerData";
import Inquire from "../Components/Pages/Inquire";
import Login from "../Components/Pages/Login";
import OrderSupplies from "../Components/Pages/OrderSupplies";
import OrderSuppliesData from "../Components/Pages/OrderSuppliesData";
import Other from "../Components/Pages/Others";
import PaymentHistory from "../Components/Pages/PaymentHistory";
import RepairView from "../Components/Pages/ReapirView";
import RefundHistory from "../Components/Pages/RefundHistory";
import Repair from "../Components/Pages/Repair";
import SalesHistory from "../Components/Pages/SalesHistory";
import Services from "../Components/Pages/Services";
import AllSettingService from "../Components/Pages/SettingAllService";
import Users from "../Components/Pages/Users";
import Dashboard from "../Components/Pages/dashboard/dashboard";
import Scheduler from "../Components/Scheduler";
import ViewAllBookingData from "../Components/ViewAllBookingData";
import FoodCouses from "../Components/Pages/BanquetManagment/FoodCouses";
import { useEffect } from "react";
// import FoodType from "../Components/Pages/banquet-managment/FoodType";
// import FoodType from "../Components/Pages/banquet-managment/FoodType/MultiFoodType";
import Others from "../Components/Pages/BanquetManagment/Others";
import ShowFoodCouses from "../Components/Pages/BanquetManagment/FoodCouses/ShowFoodCouses";
import UpdateAppetizer from "../Components/Pages/BanquetManagment/FoodCouses/FoodCousesComponents/UpdateAppetizer";
import UpdateMainEntries from "../Components/Pages/BanquetManagment/FoodCouses/FoodCousesComponents/UpdateMainEntries";
import UpdateDesserts from "../Components/Pages/BanquetManagment/FoodCouses/FoodCousesComponents/UpdateDesserts";
import UpdateTeaCoffe from "../Components/Pages/BanquetManagment/FoodCouses/FoodCousesComponents/UpdateTeaCoffe";
import UpdateJuiceDrinks from "../Components/Pages/BanquetManagment/FoodCouses/FoodCousesComponents/UpdateJuiceDrinks";
import FoodTypeData from "../Components/Pages/BanquetManagment/FoodType/FoodTypeData";
import SingleFoodType from "../Components/Pages/BanquetManagment/FoodType/SingleFoodType";
import UpdateFood from "../Components/Pages/BanquetManagment/FoodType/UpdateFood";
import AddDecors from "../Components/Pages/BanquetManagment/Decor/AddDecors";
import ShowDecor from "../Components/Pages/BanquetManagment/Decor/ShowDecor";
import OthersData from "../Components/Pages/BanquetManagment/Others/OthersData";
import AddFood from "../Components/Pages/BanquetManagment/FoodType/AddFood";
// import FoodCoursec from "../Components/Pages/banquet-managment/FoodType/FoodPackages/FoodCoursec";
import Courses from "../Components/Pages/BanquetManagment/FoodType/Courses";
// import AddBookingTwo from "../Components/Pages/Booking/AddBookingTwo";
// import Login from "../Components/Pages/Login";
import ShowDinings from "../Components/Pages/BanquetManagment/Dining/dining";
import PurchaseSupplies from "../Components/Pages/OrderSupplies/purchaseSupplies";
import PayRoll from "../Components/Pages/OrderSupplies/payroll";
import PermissionsTab from "../Components/PermisionsTab/permission";

const Routing = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"))
  useEffect(() => {
    if (data?.token) {
      navigate("/dashboard")
    }else{
      navigate("/Login")
    }
  }, [])
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/" element={<Dashbo/ard />} /> */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Booking/Add-Booking" element={<AddBooking />} />
      <Route path="/Booking/all-booking" element={<AllBooking />} />
      <Route path="/Booking/all-inquire" element={<Inquire />} />
      <Route path="/Reports/sales-history" element={<SalesHistory />} />
      <Route path="/Booking/view-data/:id" element={<ViewAllBookingData />} />
      <Route path="/Reports/payment-history" element={<PaymentHistory />} />
      <Route path="/Reports/refund-history" element={<RefundHistory />} />
      <Route path="/Reports/cancelled-history" element={<CancelledHistory />} />
      <Route path="/Booking/all-appointment" element={<AllAppointment />} />
      <Route path="/Event/event-planner" element={<EventPlanner />} />
      <Route path="/Event/calendar" element={<Scheduler />} />
      <Route path="/Event/event-planner-data/:id" element={<EventPlannerData />} />
      <Route path="/order-supplies" element={<OrderSupplies />} />
      <Route path="/purchase-supplies" element={<PurchaseSupplies />} />
      <Route path="/payroll" element={<PayRoll />} />
      <Route path="/Repair&Services/repair" element={<Repair />} />
      <Route path="/Repair&Services/services" element={<Services />} />
      <Route path="/Repair&Services/allservicesandrepair" element={<AllServicesAndRepair />} />
      <Route path="/Repair&Services/view" element={<RepairView />} />
      {/* Banquet Managment Routes */}
      <Route path="/banquet-managment/food-packages" element={<AddFood />} />
      {/* <Route path="/banquet-managment/food-type" element={<FoodCoursec />} /> */}
      <Route path="/banquet-managment/meals" element={<Courses />} />
      <Route path="/banquet-managment/others" element={<Others />} />
      <Route path="/update-appetizer/:id" element={<UpdateAppetizer />} />
      <Route path="/update-main-entry/:id" element={<UpdateMainEntries />} />
      <Route path="/update-dessert/:id" element={<UpdateDesserts />} />
      <Route path="/update-tea-coffe/:id" element={<UpdateTeaCoffe />} />
      <Route path="/update-juice-drink/:id" element={<UpdateJuiceDrinks />} />
      <Route path="/banquet-managment/show-food-data" element={<FoodTypeData />} />
      <Route path="/get-single-food/:id" element={<SingleFoodType />}/>
      <Route path="/update-food-data/:id" element={<UpdateFood />} />
      {/* Decors Routes */}
      <Route path="/banquet-managment/add-decors" element={<AddDecors />}/>
      <Route path="/banquet-managment/decor" element={<ShowDecor />} />
      <Route path="/banquet-managment/dining" element={<ShowDinings />} />

      <Route path="/banquet-managment/show-others" element={<OthersData />} />

      {/* Banquet Managment Routes End */}
      <Route path="/Settings/all-service" element={<AllSettingService />} />
      <Route path="/Settings/add-service" element={<AddSettingService />} />
      <Route path="/Settings/users" element={<Users />} />
      <Route path="/Settings/permissions" element={<PermissionsTab />} />
      <Route path="/Settings/add-category" element={<AddCategory />} />
      <Route path="/Settings/all-category" element={<AllCategory />} />
      <Route path="/Settings/add-attribute" element={<AddAttribute />} />
      <Route path="/Others/other" element={<Other />} />
      <Route path="/order-supplies-data/:id" element={<OrderSuppliesData />} />
      <Route path="/banquet-managment/show-food-couses" element={<ShowFoodCouses />} />
      {/* <Route path="/Settings/all-category" element={<AllCategory />} /> */}
    </Routes>

  );
};

export default Routing;
