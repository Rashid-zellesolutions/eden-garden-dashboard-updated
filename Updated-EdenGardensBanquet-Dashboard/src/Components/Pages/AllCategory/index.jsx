import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSettingContext } from "../../../Context/SettingContext";
import NoData from "../../../assets/noData.png";
import { Url } from "../../../env";
import DeletePopup from "../../DeletePopup";
import ErrorPopup from "../../ErrorPopup";
import Loader from "../../Loader";
import SettingSerivcePopup from "../../SettingServicesPopup";
import SuccessPopup from "../../SuccessPopup";

function AllCategory() {
    const { GetCategory, category, setCategory, loading, setLoading } = useSettingContext()
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
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [editModal, setEditModal] = useState(null)
    const [editData, setEditData] = useState(null)
    // const [loading, setLoading] = useState(false)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [name, setName] = useState("")

    const UserData = JSON.parse(localStorage.getItem("data"))


    useEffect(() => {
        GetCategory()
    }, [])
    const generateSerialNumber = (index) => index + 1;

    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            setDeleteModal(true)
            setDeleteId(record)
            // DeletService(record._id)
        } else if (action === 'edit') {
            setEditData(record)
            setEditModal(true)
            setName(record.name)
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
            title: 'S. No',
            dataIndex: 'serielNo',
            render: (_, __, index) => generateSerialNumber(index),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'No. of Services',
            dataIndex: 'services',
        },
        {
            title: 'Added Date',
            dataIndex: 'createdAt',
            render: (text, record) => (<span>{dayjs(record.createdAt).format("MM-DD-YYYY")}</span>)
        },
        {
            title: 'Added by',
            dataIndex: 'addedBy',
        },
        {
            title: 'Updated by',
            dataIndex: 'updatedBy',
            render: (text, record) => (<span>{record.updatedBy || "-"}</span>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
                    <div style={{ boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px" }}>
                        <EllipsisOutlined size={45} />
                    </div>
                </Dropdown>
            ),
        },
    ]
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        // handleCancel()
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleCloseDeletePopup = () => {
        setDeleteModal(false)
        // setModalData(null)
    }
    const handleCloseEditPopup = () => {
        setEditModal(false)
        setEditData(null)
        setName("")
        // setModalData(null)
    }
    const DeleteService = (id) => {
        setLoading(true)
        fetch(
            `${Url}Category/Delete/${deleteId._id}`,
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
                    setCategory((categorys) => categorys.filter(category => category._id !== deleteId._id));
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
    const EditSave = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            name: name,
            updatedBy: UserData.fullName
        })
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}Category/Edit/${editData._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === 200) {

                    setSuccessPopupMessage("Service Delete Successfully")
                    setSuccessPopupOpen(true)
                    console.log(result);
                    GetCategory()
                    handleCloseEditPopup()
                } else {
                    setErrorPopupOpen(true)
                    setErrorPopupMessage(result.message);
                }
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Category </p>
            </span>
        )
    };
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : <></>}
            <Table style={{ width: "100%", alignItems: "start" }} columns={columns} dataSource={category} locale={locale} />
            <DeletePopup isModalOpen={deleteModal} Delete={DeleteService} handleCancel={handleCloseDeletePopup} name={deleteId?.name} setLoading={setLoading} />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            <SettingSerivcePopup isModalOpen={editModal} CloseModel={handleCloseEditPopup} name={name} setName={setName} Save={EditSave} />
        </div>
    )
}
export default AllCategory