import { Button, Dropdown, Menu, Table } from "antd"
import { useEffect, useState } from "react"
import InputField from "../InputField"
import Loader from "../Loader"
import SuccessPopup from "../SuccessPopup"
import ErrorPopup from "../ErrorPopup"
import { Url } from "../../env"
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons"
import DeletePopup from "../DeletePopup"
import { MdDeleteOutline } from "react-icons/md"
import '../Pages/Others/module.others.css';

function Consultant() {
    const [selection, setSelection] = useState("Add Consultant")
    const [allConsultant, setAllConsultant] = useState([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)

    const addedBy = JSON.parse(localStorage.getItem("data"))

    useEffect(() => {
        const fetchData = () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Consultant/Get`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result);
                    if (result.status === 200) {

                        setAllConsultant(result.Consultant.reverse())
                        return
                    } else {
                        console.log("error");
                    }
                    // console.log(result)
                })
                .catch(error => console.log('error', error));
        }
        fetchData()
    }, [])
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleCloseDeletePopup = () => {
        setDeleteModal(false)
        setDeleteData(null)
    }
    const Add = () => {
        if (!name) {
            setErrorPopupMessage("Fill All Input")
            setErrorPopupOpen(true)
            return
        }
        if (!editData) {

            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: name,
                addedBy: addedBy.username,
                updatedBy: ""
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Consultant/Add`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        setName("")
                        setAllConsultant([result.Consultant, ...allConsultant])
                        return
                    } else {
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                        // handleCancel()
                    }
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                    // CloseModal()
                })
        } else {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: name,
                addedBy: editData.addedBy,
                updatedBy: addedBy.username
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Consultant/Edit/${editData._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        setName("")
                        setAllConsultant((prevConsultant) =>
                            prevConsultant.map((Consultant) =>
                                Consultant._id === editData._id ? result.updatedConsultant : Consultant
                            )
                        );
                        setSelection("View Consultant")
                        return
                    } else {
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                        // handleCancel()
                    }
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                    // CloseModal()
                })
        }
    }
    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            setDeleteModal(true)
            setDeleteData(record)
        } else if (action === 'edit') {
            setSelection("Add Consultant")
            // setModelOpen(true)
            setEditData(record)
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
            title: 'Consultant Name',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
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
    const DeleteService = (id) => {
        setLoading(true)
        fetch(
            `${Url}Consultant/Delete/${deleteData._id}`,
            {
                method: "DELETE",
            }
        )
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    setSuccessPopupMessage("Consultant Delete Successfully")
                    setSuccessPopupOpen(true)
                    setAllConsultant((Consultant) => Consultant.filter(Consultants => Consultants._id !== deleteData._id));
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
    useEffect(() => {
        if (editData) {
            setName(editData.name)
        }
    }, [editData])
    return (
        <div style={{backgroundColor: '#fff', padding: 25}}>
            {loading ? <Loader /> : <></>}
            <div style={{ display: "flex", alignItems: "center" }}>
                <p onClick={() => setSelection("Add Consultant")} style={{ color: selection === "Add Consultant" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", fontSize: selection === "Add Consultant" ? "18px" : "14px" }}>Add Consultant</p>
                <p type="primary" onClick={() => setSelection("View Consultant")} style={{ color: selection === "View Consultant" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", marginLeft: "10px", fontSize: selection === "View Consultant" ? "18px" : "14px" }}>View Consultant</p>
            </div>
            {selection === "Add Consultant" ?
                <>
                    <div style={{ width: "66%", display: "flex", alignItems: "center", gap: 15, marginTop: "20px" }}>
                        <InputField placeholder={"Consultant Name"} label={"Consultant Name"} value={name} onChange={(e) => setName(e.target.value)} width={"48%"} />
                        <div style={{ width: "48%" }}>

                            <Button type="primary" onClick={() => Add()} className="custom-hover-btn btn-text" style={{ height: "35px", marginTop: "10px", background: "#b78953" }}>{editData ? "Save Changes" : "Add Consultant"}</Button>
                        </div>
                    </div>
                </>
                : <div style={{ marginTop: "20px" }}> <Table dataSource={allConsultant} columns={columns} /></div>}
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            <DeletePopup isModalOpen={deleteModal} Delete={DeleteService} handleCancel={handleCloseDeletePopup} name={deleteData?.name} setLoading={setLoading} />
        </div>
    )
}
export default Consultant