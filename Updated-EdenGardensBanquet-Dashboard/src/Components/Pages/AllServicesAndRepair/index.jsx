import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Dropdown, Menu, Table } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBookingContext } from "../../../Context/BookingContext"
import NoData from "../../../assets/noData.png"
import { Url } from "../../../env"
import Loader from "../../Loader"
function AllServicesAndRepair() {
    const { GetAllService, services, GetAllRepair, repair, setServices, setRepair, loading } = useBookingContext()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    const [selected, setSelected] = useState("Repairs")
    const navigate = useNavigate()
    useEffect(() => {
        if (selected === "Repairs") {
            GetAllRepair()
        } else {
            GetAllService()
        }
    }, [selected])
    const DeleteRepairServices = async (id, name) => {
        fetch(
            `${Url}${name === "Repairs" ? "Repair" : "Services"}/Delete/${id}`,
            {
                method: "DELETE",
            }
        )
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    if (name === "Repairs") {
                        setRepair((repairs) => repairs.filter(repair => repair._id !== id));
                    } else {
                        setServices((services) => services.filter(service => service._id !== id));
                    }

                } else {

                }
            })
            .catch(error => console.log('error', error));
    }
    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            DeleteRepairServices(record._id, selected)
        } else if (action === 'edit') {
            const routePath = selected === "Repairs" ? "/Repair&Services/repair" : "/Repair&Services/services";
            navigate(routePath, { state: record });
            return
        } else if (action === "View") {
            navigate("/Repair&Services/view", { state: record })
        }
    };
    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

            <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
                Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined style={{ fontSize: "18px" }} />}>
                Delete
            </Menu.Item>
            <Menu.Item key="View" icon={<EyeOutlined style={{ fontSize: "18px" }} />}>
                View
            </Menu.Item>
        </Menu>
    );
    const column = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>{dayjs(record.createdAt).format("MM-DD-YYYY")}</span>
            ),
        },
        {
            title: selected === "Repairs" ? 'Repair Number' : "Services Number",
            dataIndex: selected === "Repairs" ? 'repairId' : "servicesId",
        },
        {
            title: selected === "Repairs" ? 'Repair Id' : "Services Id",
            dataIndex: selected === "Repairs" ? 'rep' : 'ser',
        },
        {
            title: selected === "Repairs" ? 'No. of Repairs' : 'No. of Services',
            dataIndex: selected === "Repairs" ? 'repair' : 'services',
            render: (text, record) => (
                <span>{selected === "Repairs" ? record.repair?.length : record.services?.length}</span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
                    <div style={{
                        boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px"
                    }} >

                        <EllipsisOutlined style={{ cursor: "pointer" }} size={45} />
                    </div>
                </Dropdown>
            ),
        },
    ]
    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No {selected === "Repairs" ? "Repair" : "Service"}</p>
            </span>
        )
    };
    return (
        <div style={{ padding: "20px" }}>
            {loading ? <Loader /> : <></>
            }
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <p onClick={() => setSelected("Repairs")} style={{ color: selected === "Repairs" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", fontSize: selected === "Repairs" ? "18px" : "14px" }}>Repair</p>
                <p type="primary" onClick={() => setSelected("Services")} style={{ color: selected === "Services" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", marginLeft: "10px", fontSize: selected === "Services" ? "18px" : "14px" }}>Services</p>
            </div>
            {/* <Button type="dashed" onClick={() => setSelected("Repairs")} style={{ background: selected === "Repairs" ? "#b78953" : "#73787c", color: "#fff", marginBottom: "10px" }}>Repairs</Button> */}
            {/* <Button type="dashed" onClick={() => setSelected("Services")} style={{ background: selected === "Services" ? "#b78953" : "#73787c", color: "#fff", marginBottom: "10px", marginLeft: "10px" }}>Services</Button> */}
            <Table style={{ width: "100%", alignItems: "start" }} columns={column} dataSource={selected === "Repairs" ? repair : services} locale={locale} />

        </div >
    )
}
export default AllServicesAndRepair