import { Button, Dropdown, Menu, Table } from "antd"
import { useEffect, useState } from "react"
import InputField from "../InputField"
import VenueImagePopup from "../VenueImagePopup"
import Loader from "../Loader"
import SuccessPopup from "../SuccessPopup"
import ErrorPopup from "../ErrorPopup"
import { Url } from "../../env"
import { EditOutlined, EllipsisOutlined, UploadOutlined } from "@ant-design/icons"
import DeletePopup from "../DeletePopup"
import { MdDeleteOutline } from "react-icons/md"
import '../Pages/Others/module.others.css'

function Venue() {
    const [selection, setSelection] = useState("Add Venue")
    const [allVenue, setAllVenue] = useState([])
    const [venue, setVenue] = useState("")
    const [capacity, setCapacity] = useState("")
    const [fixed, setFixed] = useState("")
    const [person, setPerson] = useState("")
    const [image, setImage] = useState("")
    const [imageModal, setImageModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [imageData, setImageData] = useState("")
    const addedBy = JSON.parse(localStorage.getItem("data"))
    const handleImageChange = (e) => {
        console.log("handleImageChange");
        const file = e.target.files[0];
        setImage(file)
        // uploadImages(file);
    };

    useEffect(() => {
        const fetchData = () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Venue/Get`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result);
                    if (result.status === 200) {

                        setAllVenue(result.Venue.reverse())
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

    const handleCloseModal = () => {
        setImageModal(false)
    }
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
    const Add = (images) => {
        if (!venue || !fixed || !person || !capacity) {
            setErrorPopupMessage("Fill All Input")
            setErrorPopupOpen(true)
            return
        }
        if (!editData) {

            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: venue,
                image: "images",
                capacity: capacity,
                fixedCharges: fixed,
                personCharges: person,
                addedBy: addedBy.username,
                updatedBy: ""
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Venue/add-venue`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        setVenue("")
                        setFixed("")
                        setPerson("")
                        setCapacity("")
                        setImage("")
                        setImageData("")
                        setAllVenue([result.Venue, ...allVenue])
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
                name: venue,
                image: images ? images : image,
                capacity: capacity,
                fixedCharges: fixed,
                personCharges: person,
                addedBy: editData.addedBy,
                updatedBy: addedBy.username
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Venue/Edit/${editData._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        setVenue("")
                        setFixed("")
                        setPerson("")
                        setCapacity("")
                        setImage("")
                        setImageData("")
                        setAllVenue((prevVenue) =>
                            prevVenue.map((venue) =>
                                venue._id === editData._id ? result.updatedVenue : venue
                            )
                        );
                        setSelection("View Venue")
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
            setSelection("Add Venue")
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
            title: 'Venue',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <img src={record.image} width={40} height={40} style={{ borderRadius: "8px" }} />
                    {/* <p style={{ fontWeight: "700" }}>{record.fullName}</p>
                    <p>{record.email}</p> */}
                </div>
            ),
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
        },
        {
            title: 'Charges by Fixed',
            dataIndex: 'fixedCharges',
        },
        {
            title: 'Charges by No. of Person',
            dataIndex: 'personCharges',
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
            `${Url}Venue/Delete/${deleteData._id}`,
            {
                method: "DELETE",
            }
        )
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    setSuccessPopupMessage("User Delete Successfully")
                    setSuccessPopupOpen(true)
                    setAllVenue((venue) => venue.filter(venues => venues._id !== deleteData._id));
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
            setVenue(editData.name)
            setCapacity(editData.capacity)
            setFixed(editData.fixedCharges)
            setPerson(editData.personCharges)
            setImage(editData.image)
        }
    }, [editData])
    const uploadImages = async () => {
        setLoading(true)
        const formData = new FormData();
        // console.log(e);
        formData.append("file", imageData);
        formData.append("upload_preset", "em1ccgrx");
        // formData.append("upload_preset", "htjxlrii");
        // console.log(formData);
        fetch("https://api.cloudinary.com/v1_1/dmmnbv3ko/image/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false)
                if (data.error) {
                    setErrorPopupMessage(data.error)
                    setErrorPopupOpen(true)
                    console.log("Error:", data);
                    return
                }
                console.log("Upload success:", data);
                // setSuccessPopupMessage("Image Upload Successfull")
                // setSuccessPopupOpen(true)
                setImage(data.url)
                Add(data.url)
            })
            .catch((error) => {
                // Handle error
                setLoading(false)
                setErrorPopupMessage("Image Not Upload")
                setErrorPopupOpen(true)
            });
    };
    return (
        <div style={{backgroundColor: '#fff', padding: 25}}>
            {loading ? <Loader /> : <></>}

            <div style={{ display: "flex", alignItems: "center" }}>

                <p onClick={() => setSelection("Add Venue")} style={{ color: selection === "Add Venue" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", fontSize: selection === "Add Venue" ? "18px" : "14px" }}>Add Venue</p>
                <p type="primary" onClick={() => setSelection("View Venue")} style={{ color: selection === "View Venue" ? "#b78953" : "#73787c", fontWeight: "600", cursor: "pointer", marginLeft: "10px", fontSize: selection === "View Venue" ? "18px" : "14px" }}>View Venue</p>
            </div>
            {selection === "Add Venue" ?
                <>
                    <div style={{ width: "100%", display: "flex", gap: 15, marginTop: "20px" }}>
                        <InputField placeholder={"Venue Name"} label={"Venue Name"} value={venue} onChange={(e) => setVenue(e.target.value)} width={"32%"} />
                        <InputField placeholder={"Capacity"} label={"Capacity"} value={capacity} onChange={(e) => setCapacity(e.target.value)} width={"32%"} type={"number"} />

                        <div style={{ width: "32%" }}>
                            <label
                                style={{
                                    marginBottom: 5,
                                    fontFamily: 'poppins !important',
                                    color: '#73787c',
                                    fontWeight: '500',
                                    fontSize: "10px",
                                    opacity: 0

                                }}
                            >
                                {"Image"}
                            </label>
                            <div style={{ width: "100%", }}>
                            <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Upload Image</label>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: 5, cursor: "pointer" }}>
                                <label
                                    for="upload-image"
                                    style={{
                                        border: "1px solid #b78953",
                                        width: "100%",
                                        padding: 10,
                                        borderRadius: 6,
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#b78953",
                                        cursor: "pointer"
                                    }}
                                >
                                    {/* <img
                                        src={Upload}
                                        alt=""
                                        width="20"
                                        style={{ marginRight: 10 }}
                                    /> */}
                                    Upload Image
                                </label>
                                <input
                                    id="upload-image"
                                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                                    fullWidth
                                    type="file"
                                    onChange={handleImageChange}
                                />

                                {/* <InputField placeholder={"Profile Image"} label={"Profile Image"} type={"file"} onChange={handleImageChange} /> */}
                            </div>
                        </div>

                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 15, width: "100%", fontSize: '10px'}}>
                        <InputField placeholder={"Charges by Fixed"} label={"Charges by Fixed"} value={fixed} onChange={(e) => setFixed(e.target.value)} width={"32%"} type={"number"} />
                        <InputField placeholder={"Charges by No. of Person"} label={"Charges by No. of Person"} value={person} onChange={(e) => setPerson(e.target.value)} width={"32%"} type={"number"} />
                        <div style={{ width: "32%", display: "flex", alignItems: "center", justifyContent: "end" }}>
                            {image || imageData ?
                                <img src={imageData ? URL.createObjectURL(imageData) : image} alt="" style={{ width: "150px", height: "100px", borderRadius: "8px", marginTop: "10px" }} />
                                : <></>}
                        </div>
                    </div>
                    <div style={{ width: "32%" }}>

                        <Button type="primary" onClick={() => {
                            if (imageData) {
                                uploadImages()
                            } else {
                                Add()
                            }
                        }} className="custom-hover-btn btn-text" style={{ height: "35px", marginTop: "10px", background: "#b78953" }}>{editData ? "Save Changes" : "Add Venue"}</Button>
                    </div>
                </>
                : <div style={{ marginTop: "20px" }}><Table dataSource={allVenue} columns={columns} /></div>}
            <VenueImagePopup isModalOpen={imageModal} handleCancel={handleCloseModal} image={imageData} setImage={setImageData} linkImage={image} setLinkImage={setImage} />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            <DeletePopup isModalOpen={deleteModal} Delete={DeleteService} handleCancel={handleCloseDeletePopup} name={deleteData?.name} setLoading={setLoading} />
        </div>
    )
}
export default Venue