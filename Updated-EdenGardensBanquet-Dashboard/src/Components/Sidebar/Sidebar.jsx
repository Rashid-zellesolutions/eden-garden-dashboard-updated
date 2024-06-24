import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import Routing from '../../Routing/Routing';
import MenuList from '../Menu/MenuList';
import TogglethemeBtn from '../ToggleThemeBtn/TogglethemeBtn.jsx';
import './Sidebar.css';
import EGLogo from "../../assets/EG-Logo-2.png"
import Icon from "../../assets/Icon.png"
import { Link, useLocation } from 'react-router-dom';
import Login from '../Pages/Login/index.jsx';
const { Header, Sider } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  console.log(location.pathname);
  const UseerName = JSON.parse(localStorage.getItem("data"))
  const isActive = (path) => location.pathname === path;
  const tabTitles = {
    // "/Booking/Add-Booking": "Add Booking",
    "/Booking/all-booking": "All Bookings",
    "/Booking/all-inquire": "All Inquires",
    "/Booking/all-appointment": "All Appointment",
    "/Reports/sales-history": "Sales Report",
    "/Reports/cancelled-history": "Cancellation Report",
    "/Reports/payment-history": "Payment Report",
    "/Reports/refund-history": "Refund Report",
    "/Event/event-planner": "Event ",
    "/Event/calendar": "Calendar",
    "/Order/order-supplies": "Order Supplies",
    "/Repair&Services/repair": "Repairs",
    "/Repair&Services/services": "Services",
    "/Repair&Services/allservicesandrepair": "All Repairs And Services",
    "/banquet-managment/foodcouses": "Food Couses",
    "/banquet-managment/show-food-couses" : "Show Foods",
    "/banquet-managment/show-food-types" : "Show Food Types",
    "/Settings/all-services": "All Services",
    "/Settings/add-services": "Add Services",
    "/Settings/users": "Users",
    "/Settings/add-category": "Add Category",
    "/Settings/all-category": "All Categories",
    "/Settings/all-service": "All Services",
    "/Settings/add-service": "Add Service",
    "/Settings/add-attribute": "Add Attribute",
    "/Settings/AllAttribute": "All Attributes",
    "/Settings/permissions":"Permissions",
    "/Others/other": "General",
    "/Booking/view-data/:id": "View Booking",
    "/Event/event-planner-data/:id": "View Event Planner",
    "/Order/order-supplies-data/:id": "View Order Supplies",
    "/banquet-managment/meals":"Meals",
    "/banquet-managment/food-packages":"Food Packages",
    "/order-supplies":"Order Supplies",
    "/purchase-supplies":"Purchase Supplies",
    "/payroll":"Payroll",
   
  }
  const matchBookingViewData = location.pathname.match(/^\/Booking\/View-Data\/([^/]+)$/);
  const matchEventViewData = location.pathname.match(/^\/Event\/Event-Planner-Data\/([^/]+)$/);
  const matchOrderViewData = location.pathname.match(/^\/Order\/Order-Supplies-Data\/([^/]+)$/);
  const bookingId = matchBookingViewData ? matchBookingViewData[1] : null;
  const EventId = matchEventViewData ? matchEventViewData[1] : null;
  const OrderId = matchOrderViewData ? matchOrderViewData[1] : null;
  let activeTabTitle = "Dashboard";
  // console.log(bookingId);
  if (bookingId) {
    activeTabTitle = `View Booking`;
  } else if (EventId) {
    activeTabTitle = `View Event Planner`
  } else if (OrderId) {
    activeTabTitle = `View Order Supplies`
  } else {
    Object.keys(tabTitles).forEach((path) => {
      if (isActive(path)) {
        activeTabTitle = tabTitles[path];
      }
    });
  }
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function greet() {
    var currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  // const [sidebarWidth, setSidebarWidth] = useState()
  // useEffect(() => {
  //   const handleResizing = () => {
  //     if((window.innerWidth >= 1000) && (window.innerWidth < 1200)){
  //       setSidebarWidth(200)
  //     }else{
  //       setSidebarWidth(200)
  //     }
  //   }
  //   window.addEventListener('reset', handleResizing);
  //   handleResizing();
  //   console.log(sidebarWidth)
  //   return () => window.removeEventListener('resize', handleResizing);
  // }, [sidebarWidth]) 


  return location.pathname === "/Login" ? <Login/> : (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
      width={230}
        collapsed={collapsed}
        className='Sidebar'
        collapsible
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        style={{position: 'fixed', left: 0, height: '100vh', zIndex: 99999, transition: "width 0.3s" }}
      >
        {/* <Logo /> */}
        <Link to='/dashboard' className='logo-image'>
          <img src={collapsed ? Icon : EGLogo} alt='Logo' />
        </Link>
        <MenuList darkTheme={darkTheme} />
        <Button
          type="text"
          className='toggle toggle-theme-btn'
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ left: collapsed ? "8px" : "230px", transition: 'left 0.3s', background: "#fff", boxShadow: "2px 2px 15px -3px rgba(0,0,0,0.1)", }}
        />
        {/* <TogglethemeBtn darkTheme={darkTheme} toggleTheme={toggleTheme} /> */},
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 230, transition: 'margin-left 0.3s' }}>
        <Header style={{background: colorBgContainer, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px   20px" }}>

          <button style={{ border: "none", boxShadow: "unset", background: "transparent" }}>

            <span style={{ border: "none", color: "#b78953", boxShadow: "unset", fontWeight: "600", fontSize: "18px", }}>{activeTabTitle}</span>
            {/* <hr style={{width:"20px",height:"2px",color:"#000"}}/> */}
            <p style={{
              width: '70px'
            }} className="divider-aappBar" ></p>
          </button>
          <button style={{ border: "none", background: "transparent", display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "20px", width: "50px" }}>
              {/* <img src={"http://res.cloudinary.com/dmmnbv3ko/image/upload/v1708659382/ampbcuk5rmehzvbkxpmd.png"} style={{ width: "100%", borderRadius: "50%", }} /> */}
              <img src={UseerName?.profileImage} style={{ width: "100%", borderRadius: "50%", }} alt='user' />
            </div>
            <div>

              <p style={{ color: "rgb(89, 91, 103)", fontFamily: "Poppins", textTransform: "capitalize", fontSize: 14, fontWeight: "500" }}>
                👋
                {greet()}
              </p>
              {/* <img src={Hello} style={{ width: "40px" }} /> */}
              <p
                style={{
                  color: "rgb(89, 91, 103)",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                  fontSize: 18,
                  fontWeight: "600",
                  marginRight: 2,
                }}
              >

                {UseerName?.fullName}
              </p>
            </div>
          </button>
        </Header>
        <Routing />
      </Layout>
    </Layout>
  )
}

export default Sidebar;
