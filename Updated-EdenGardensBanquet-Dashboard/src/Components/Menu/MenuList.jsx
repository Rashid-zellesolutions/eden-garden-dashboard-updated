import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Booking from "../../assets/appointment.png";
import Booking2 from "../../assets/appointment2.png";
import Order from "../../assets/clipboard.png";
import Order2 from "../../assets/clipboard2.png";
import payroll from "../../assets/payroll.png";
import payroll2 from "../../assets/payroll2.png";
import purchase from "../../assets/purchase.png";
import purchase2 from "../../assets/purchase2.png";
import Dashboard from "../../assets/dashboard.png";
import Dashboard2 from "../../assets/dashboard2.png";
import Event from "../../assets/event.png";
import Event2 from "../../assets/event2.png";
import Report from "../../assets/report.png";
import Report2 from "../../assets/report2.png";
import Setting from "../../assets/settings.png";
import Setting2 from "../../assets/settings2.png";
import Calendar from "../../assets/calendar.png";
import Calendar2 from "../../assets/calendar2.png";
import './MenuList.css';

const MenuList = ({ darkTheme }) => {
    // const { loginData } = useBookingContext()
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const location = useLocation();
    let loginData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        const path = location.pathname.split('/')[2];
        // Add a short delay to update the state
        const delay = setTimeout(() => {
            setSelectedMenuItem(path);
        }, 100); // Adjust the delay time as needed
        return () => clearTimeout(delay); // Clear the timeout on component unmount
    }, [location.pathname]);

    const handleMenuSelect = (item) => {
        setSelectedMenuItem(item.key);
    };

    const handleSubMenuClick = (info) => {
        // Close other submenus when a submenu is opened
        if (info.keyPath.length === 4) {
            setSelectedMenuItem(info.key);
        }
    };
    
console.log(location.pathname);
    return (
        <Menu
            theme={darkTheme ? 'dark' : 'light'}
            mode='inline'
            className='menu-bar'
            selectedKeys={[selectedMenuItem]}
            onSelect={handleMenuSelect}
            onClick={handleSubMenuClick}
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}
        >
            {/* <Menu.SubMenu key="" title=""> */}
            <Menu.Item key="dashboard" icon={<img src={selectedMenuItem === 'dashboard' ? Dashboard2 : Dashboard} alt='' width={"15px"} />} style={{ padding: "20px!important" }}>
                <Link to="/dashboard" className='menu-font-size' style={{ }}>Dashboard</Link>
                {/* <Link to="/dashboard" style={{ fontSize: "14px" }}>Dashboard</Link> */}
            </Menu.Item>
            {/* </Menu.SubMenu> */}

            <Menu.SubMenu
                key="Booking"
                className='menu-font-size'
                icon={<img src={selectedMenuItem === "all-booking" ? Booking2 : selectedMenuItem === "add-booking" ? Booking2 : selectedMenuItem === "all-inquire" ? Booking2 : selectedMenuItem === "all-appointment" ? Booking2 : Booking} alt='' width={"15px"} />}
                style={{ /*fontSize: "14px" */ }}
                title="Booking"
            >
                <Menu.Item key="all-inquire"><Link to="/Booking/all-inquire"  style={{}}>All Inquiries</Link></Menu.Item>
                <Menu.Item key="all-appointment"><Link to="/Booking/all-appointment"  style={{/* fontSize: "14px"*/ }}>All Appointment</Link></Menu.Item>
                <Menu.Item key="all-booking"><Link to="/Booking/all-booking" style={{/* fontSize: "14px"*/ }}>All Bookings</Link></Menu.Item>
                <Menu.Item key="add-booking"><Link to="/Booking/add-booking"  style={{ /*fontSize: "14px" */}}>Add Booking </Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                    key="Event Planner"
                    icon={<img src={selectedMenuItem === "event-planner" ? Event2 : selectedMenuItem === "calendar" ?
                    Event2 : Event} alt='' width={"15px"} />}
                    title="Event-Planner"
                    className='menu-font-size'
                    style={{ /*fontSize: "14px" */}}
                >

                    {/* <Menu.Item key="AllAppointment" icon={<img src={selectedMenuItem === 'AllAppointment' ? Calendar2 : Calendar} alt='' width={"15px"} />}>
                    <Link to="/Appointment/AllAppointment" style={{ fontSize: "14px" }}>All Appointment</Link>
                </Menu.Item> */}
                  <Menu.Item key="calendar">
                        <Link to="/Event/calendar" style={{/* fontSize: "14px" */}}>Calendar</Link>
                    </Menu.Item>
                    <Menu.Item key="event-planner">
                        <Link to="/Event/event-planner" style={{/* fontSize: "14px"*/ }}>Event</Link>
                    </Menu.Item>
                  
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Banquet Managment"
                    icon={<img src={selectedMenuItem === "allservicesandrepair" ? Report2 : selectedMenuItem === "repair" ? Report2 : selectedMenuItem === "services" ? Report2 : Report} alt='' width={"15px"} />}
                    title="Banquet Managment"
                    className='menu-font-size'
                    style={{ /*fontSize: "14px" */}}
                >
                    
                    <Menu.SubMenu 
                        key="Food / Menu"
                        // icon={<img src={selectedMenuItem === "foodcouses" ? Report2 : selectedMenuItem === "repair" ? Report2 : selectedMenuItem === "services" ? Report2 : Report} alt='' width={"15px"} />}
                        title="Food / Menu"
                        className='menu-font-size'
                    >
                        <Menu.Item key="food-packages"><Link to="/banquet-managment/food-packages" style={{ /*fontSize: "14px" */}}>Packages</Link></Menu.Item>
                        {/* <Menu.Item key="food"><Link to="/BanquetManagment/food-type" >Food Type</Link></Menu.Item> */}
                        {/* <Menu.Item key="food-data"><Link to="/BanquetManagment/show-food-data" >Show Foods</Link></Menu.Item> */}
                        <Menu.Item key="foodcouses"><Link to="/banquet-managment/meals" style={{ /*fontSize: "14px" */}}>Meals</Link></Menu.Item>
                        {/* <Menu.Item key="show-foods"><Link to="/BanquetManagment/show-food-couses" >Show Foods</Link></Menu.Item> */}
                    </Menu.SubMenu>
                
                        <Menu.Item key="decors-data"><Link to="/banquet-managment/decor" style={{ /*fontSize: "14px" */}}>Decor</Link></Menu.Item>
                        <Menu.Item key="dining-data"><Link to="/banquet-managment/dining" style={{ /*fontSize: "14px" */}}>Dining</Link></Menu.Item>
                  
                   
                    <Menu.Item key="others-data"><Link to="/banquet-managment/show-others" style={{/* fontSize: "14px"*/ }}>Others</Link></Menu.Item>
                    {/* <Menu.Item key="PaymentHistory"><Link to="/Reports/Payment-History" style={{ fontSize: "14px" }}>Payment History</Link></Menu.Item> */}
                </Menu.SubMenu>
            {loginData?.role === "Admin" || loginData?.role === "Supervisor" ? <>
                {loginData.role === "Supervisor" ? <></> : <Menu.SubMenu
                    key="Reports"
                    className='menu-font-size'
                    icon={<img src={selectedMenuItem === "sales-history" ? Report2 : selectedMenuItem === "refund-history" ?
                        Report2 : selectedMenuItem === "cancelled-history" ? Report2 : selectedMenuItem === "payment-history" ? Report2 : Report} alt='' width={"15px"} />}
                    title="Reports"
                    style={{ /*fontSize: "14px"*/ }}
                >
                    <Menu.Item key="sales-history"><Link to="/Reports/sales-history" style={{ /*fontSize: "14px"*/ }}>Sales Report</Link></Menu.Item>
                    <Menu.Item key="cancelled-history"><Link to="/Reports/cancelled-history" style={{/* fontSize: "14px"*/ }}>Cancellation Report</Link></Menu.Item>
                    <Menu.Item key="refund-history"><Link to="/Reports/refund-history" style={{ /*fontSize: "14px"*/ }}>Refund Report</Link></Menu.Item>
                    <Menu.Item key="payment-history"><Link to="/Reports/payment-history" style={{/* fontSize: "14px" */}}>Payment Report</Link></Menu.Item>
                </Menu.SubMenu>}
                <Menu.Item key="purchase-supplies" icon={<img src={selectedMenuItem === 'purchase-supplies' ? purchase2 : purchase} alt='' width={"15px"} />}>
                    <Link to="/purchase-supplies" className='menu-font-size' style={{/* fontSize: "14px"*/ }}>Purchase Supplies</Link>
                </Menu.Item>
                <Menu.Item key="order-supplies" icon={<img src={selectedMenuItem === 'order-supplies' ? Order2 : Order} alt='' width={"15px"} />}>
                    <Link to="/order-supplies" className='menu-font-size' style={{/* fontSize: "14px"*/ }}>Orders Supplies</Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="Repair & Services"
                    icon={<img src={selectedMenuItem === "allservicesandrepair" ? Report2 : selectedMenuItem === "repair" ? Report2 : selectedMenuItem === "services" ? Report2 : Report} alt='' width={"15px"} />}
                    title="Repair & Services"
                    className='menu-font-size'
                    style={{ /*fontSize: "14px" */}}
                >
                    <Menu.Item key="allservicesandrepair"><Link to="/Repair&Services/allservicesandrepair" style={{ /*fontSize: "14px" */}}>All Repairs & Services</Link></Menu.Item>
                    <Menu.Item key="repair"><Link to="/Repair&Services/repair" style={{/* fontSize: "14px" */}}>Add Repairs</Link></Menu.Item>
                    <Menu.Item key="services"><Link to="/Repair&Services/services" style={{/* fontSize: "14px"*/ }}>Add Services</Link></Menu.Item>
                    {/* <Menu.Item key="PaymentHistory"><Link to="/Reports/Payment-History" style={{ fontSize: "14px" }}>Payment History</Link></Menu.Item> */}
                </Menu.SubMenu>


                <Menu.Item key="pay-roll" icon={<img src={selectedMenuItem === 'pay-roll' ? payroll2 : payroll} alt='' width={"15px"} />}>
                    <Link to="/payroll" className='menu-font-size' style={{/* fontSize: "14px"*/ }}>Payroll</Link>
                </Menu.Item>

                {/* Banquet Managment  Tab*/}

                

                {/* Banquet Managment Tab End */}

                <Menu.SubMenu key="Settings" icon={<img src={selectedMenuItem === "all-services" ? Setting2
                    : selectedMenuItem === "users" ? Setting2 : selectedMenuItem === "add-category" ? Setting2 : selectedMenuItem === "all-category" ? Setting2 : selectedMenuItem === "add-service" ? Setting2
                        : selectedMenuItem === "all-service" ? Setting2 : selectedMenuItem === "add-attribute" ? Setting2 : selectedMenuItem === "all-attribute" ? Setting2 : selectedMenuItem === "other" ? Setting2 : Setting} alt='' width={"15px"} />} title="Settings"
                        className='menu-font-size' style={{/* fontSize: "14px"*/ }}>
                    {/* <Menu.SubMenu key="category" title="Category"
                        style={{ }}>
                        <Menu.Item key="add-category" > <Link style={{ }} to="/Settings/add-category">Add Category</Link></Menu.Item>
                        <Menu.Item key="all-category"> <Link style={{  }} to="/Settings/all-category">All Categories</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="aervice" title="Service"
                        style={{}}>
                        <Menu.Item key="add-service"> <Link style={{  }} to="/Settings/add-service">Add Service</Link></Menu.Item>
                        <Menu.Item key="all-service"> <Link style={{  }} to="/Settings/all-service">All Services</Link></Menu.Item>
                    </Menu.SubMenu> */}
                     <Menu.Item key="other" > <Link className='menu-font-size' style={{/* fontSize: "14px" */}} to="/Others/other">General</Link></Menu.Item>
                 

                    {loginData?.role === "Manager" ? <></> : <Menu.Item key="users" style={{ paddingLeft: "47px !important" }}> <Link className='menu-fnt-size' style={{/* fontSize: "14px"*/ }} to="/Settings/users">Users</Link></Menu.Item>}
                    <Menu.Item key="permissions" > <Link className='menu-font-size' style={{/* fontSize: "14px" */}} to="/Settings/permissions">Permissions</Link></Menu.Item>
                   

                </Menu.SubMenu> </> : <></>}

        </Menu>
    );
}

export default MenuList;
