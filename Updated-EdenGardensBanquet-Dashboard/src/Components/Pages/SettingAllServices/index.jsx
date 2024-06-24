import { EditOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Dropdown, Menu, Table } from "antd"
import AddNewServicePopup from "../../AddNewServicePopup"
import { useEffect, useState } from "react"
import { useSettingContext } from "../../../Context/SettingContext"
import { useNavigate } from "react-router-dom"
import { IoIosRemoveCircle } from "react-icons/io"
import DeletePopup from "../../DeletePopup"
import { Url } from "../../../env"
import SuccessPopup from "../../SuccessPopup"
import ErrorPopup from "../../ErrorPopup"
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../../Loader"
import '../Inquire/module.inquire.css';

function SettingAllServices() {
    const navigate = useNavigate()

    const { GetAllServices, allService, setAllService } = useSettingContext()
    const [addServiceModal, setAddServiceModal] = useState(false)
    const [ModalData, setModalData] = useState(null)
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        GetAllServices()
    }, [])

    const CloseAddServiceModal = () => {
        setAddServiceModal(false)
        setModalData(null)
    }
    const handleCloseDeletMPopup = () => {
        setDeleteModal(false)
        setModalData(null)
    }
    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            setDeleteModal(true)
            setDeleteId(record)
            // DeletService(record._id)
        } else if (action === 'edit') {
            setModalData(record)
            setAddServiceModal(true)
        }
    }
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        // handleCancel()
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
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
            title: 'Service Name',
            dataIndex: 'serviceName',
        },
        {
            title: 'Service Options Count',
            dataIndex: 'serviceOptions',
            render: (text, record) => (record.serviceOptions?.length),
        },
        {
            title: 'Service Colors Count',
            dataIndex: 'serviceOptions',
            render: (text, record) => (record.colorList?.length),
        },
        {
            title: 'Parent Category',
            dataIndex: 'parentCategory',
            // render: (text, record) => (record.colorList?.length),
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            render: (text, record) => (record.unitPrice || 0),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} overlayClassName="menu-bg" trigger={['click']} overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
                    <EllipsisOutlined style={{ cursor: "pointer" }} size={45} />
                </Dropdown>
            ),
        },
    ]
    const DeletService = (id) => {
        setLoading(true)
        fetch(
            `${Url}EventScap/Delete/${deleteId._id}`,
            {
                method: "DELETE",
            }
        )
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    setSuccessPopupMessage("Service Delete Successfully")
                    setSuccessPopupOpen(true)
                    setAllService((services) => services.filter(service => service._id !== deleteId._id));
                    handleCloseDeletMPopup()
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
            {/* <h1>Event Decor & Furniture</h1> */}
            <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                style={{ width: 180, marginBottom: "10px" }}
                className='add-more'
                onClick={() => setAddServiceModal(true)}
            // onClick={() => navigate("/Settings/add-services")}
            >
                Add New Service
            </Button>
            <Table style={{ width: "100%", alignItems: "start" }} columns={columns} dataSource={allService} />
            <AddNewServicePopup isModalOpen={addServiceModal} handleCancel={CloseAddServiceModal} data={ModalData} />
            <DeletePopup isModalOpen={deleteModal} Delete={DeletService} handleCancel={handleCloseDeletMPopup} name={deleteId?.serviceName} setLoading={setLoading} />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default SettingAllServices