import { EditOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Dropdown, Menu, Table } from "antd"
import { useEffect, useState } from "react"
import { FaExchangeAlt } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { Url } from "../../env"
// import AddUserPopup from "../../AddUserPopup"
// import ChangePassword from "../../ChangePasswordPopup"
import DeletePopup from "../DeletePopup"
import ErrorPopup from "../ErrorPopup"
import Loader from "../Loader"
import SuccessPopup from "../SuccessPopup";
import AddRolePopup from "../AddUserPopup/addRolePopup"

function PermissionsTab() {
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    const [isModalOpen, setModelOpen] = useState(false)
    // const [changePasswordPopup, setChangePasswordPopup] = useState(false)
    const [changeId, setChangeId] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)

    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleCancel = () => {
        setModelOpen(false)
    }
    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${Url}Roles/Get`);
                const result = await response.json();
                console.log(result);
                setUsers([...result.Roles.reverse()]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        FetchData()
    }, [])
    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            setDeleteData(record)
            setDeleteModal(true)
            
        } else if (action === 'edit') {

            setEditData(record)
            console.log(record);
            setModelOpen(true)
            
        } 
    }
    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

            <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
                Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<MdDeleteOutline style={{ fontSize: "18px" }} />}>
                Delete
            </Menu.Item>
        </Menu>
    );
    const columns = [
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Access Type',
            dataIndex: 'accessType',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} overlayClassName="menu-bg" trigger={["click"]} overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
                    <div style={{
                        boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px"
                    }}>

                        <EllipsisOutlined size={45} />
                    </div>
                </Dropdown>
            ),
        },
    ]
    const handleCloseDeletePopup = () => {
        setDeleteModal(false)
        setDeleteData(null)
    }
    const DeleteService = (id) => {
        setLoading(true)
        fetch(
            `${Url}Roles/Delete/${deleteData._id}`,
            {
                method: "DELETE",
            }
        )
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    setSuccessPopupMessage("Role Delete Successfully")
                    setSuccessPopupOpen(true)
                    setUsers((users) => users.filter(user => user._id !== deleteData._id));
                    handleCloseDeletePopup()
                } else {
                    setErrorPopupOpen(true)
                    setErrorPopupMessage(result.message);
                }
            })
            .catch(error => {
                setLoading(false)
                console.log('error', error)
            });

    }
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : <></>}
            <Button type="dashed" block
                icon={<PlusOutlined />}
                style={{ width: 150, }}
                onClick={() => setModelOpen(true)}
                className='add-more'>Add Permission</Button>
            <Table style={{ width: "100%", alignItems: "center", marginTop: "10px" }} columns={columns} dataSource={users} />
                <AddRolePopup isModalOpen={isModalOpen} handleCancel={handleCancel} loading={loading} setLoading={setLoading} editData={editData} setEditData={setEditData} setErrorPopupMessage={setErrorPopupMessage} setErrorPopupOpen={setErrorPopupOpen}
                setSuccessPopupMessage={setSuccessPopupMessage} setSuccessPopupOpen={setSuccessPopupOpen} />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            <DeletePopup isModalOpen={deleteModal} Delete={DeleteService} handleCancel={handleCloseDeletePopup} name={deleteData?.fullName} setLoading={setLoading} />
        </div>
    )
}
export default PermissionsTab