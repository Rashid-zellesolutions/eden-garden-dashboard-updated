import { useEffect, useState } from "react"
import InputField from "../../InputField"
import SelectField from "../../SelectField"
import { Button, Dropdown, Menu, Table } from "antd"
import Loader from "../../Loader";
import { Url } from "../../../env";
import SuccessPopup from "../../SuccessPopup";
import ErrorPopup from "../../ErrorPopup";
import { useSettingContext } from "../../../Context/SettingContext";
import { EditOutlined, EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import './module.addSettingService.css';
import '../Inquire/module.inquire.css';

function AddSettingService(params) {
    const { GetCategory, category } = useSettingContext()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    const location = useLocation()
    const navigate = useNavigate()
    const [names, setNames] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [availableQty, setAvailableQty] = useState("")
    const [categorys, setCategorys] = useState("")
    const [loading, setLoader] = useState(false);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [colorArray, setColorArray] = useState([])
    const [attributes, setAtributes] = useState([])
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingAttribute, setEditingAttribute] = useState(null);

    const addedBy = JSON.parse(localStorage.getItem("data"))

    useEffect(() => {
        GetCategory()
    }, [])
    useEffect(() => {
        if (location.state) {
            setNames(location.state.name)
            setAtributes(location.state.attributes)
            category?.map((e) => location.state.category === e.name ? setCategorys(e._id) : "")
        }
    }, [location.state])
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        if (!location.state) {
            return
        }
        navigate("/Settings/all-service")

    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const Add = () => {
        if (location.state) {
            setLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: names,
                category: categorys,
                addedBy: location.state.addedBy,
                updatedBy: addedBy.fullName,
                attributes: attributes
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}SettingService/Edit/${location.state._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result, "heloo");
                    if (result.status === 200) {
                        setSuccessPopupOpen(true)
                        setSuccessPopupMessage(result.message)
                        setNames("")
                        setCategorys("")
                        setAtributes([])
                    } else {
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                    }
                    setLoader(false)
                }).catch(error => {
                    setLoader(false)
                    console.log('error', error)
                })

        } else {
            if (!categorys || !names || !attributes.length) {
                setErrorPopupMessage("Fill Input")
                setErrorPopupOpen(true)
                return
            }
            setLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: names,
                category: categorys,
                addedBy: addedBy.fullName,
                updatedBy: "",
                attributes: attributes
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}SettingService/Add`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result, "heloo");
                    if (result.status === 200) {
                        setSuccessPopupOpen(true)
                        setSuccessPopupMessage(result.message)
                        setNames("")
                        setCategorys("")
                        setAtributes([])
                    } else {
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                    }
                    setLoader(false)
                }).catch(error => {
                    setLoader(false)
                    console.log('error', error)
                })
        }
    }

    const AddColors = () => {
        if (!color) {
            return
        }
        setColorArray((prevOptions) => [
            ...prevOptions,
            color,
        ]);
        setColor("")
    }

    const removeColor = (index) => {
        const newArray = [...colorArray];
        // let index = newArray.indexOf(value)
        newArray.splice(index, 1);
        setColorArray(newArray)
        console.log(newArray)

    }
    // const AddAttributes = () => {
    //     if (!type) {
    //         return
    //     }
    //     setAtributes((prevOptions) => [
    //         ...prevOptions,
    //         { color: colorArray, type: type, unitPrice: unitPrice, description: description },
    //     ]);
    //     setColorArray([])
    //     setType("")
    //     setUnitPrice("")
    //     setDescription("")
    // }
    const AddAttributes = () => {
        if (!type) {
            return;
        }
        if (editingIndex === -1) {
            // Adding a new attribute
            setAtributes((prevOptions) => [
                ...prevOptions,
                { color: colorArray, type: type, unitPrice: unitPrice, description: description, availableQty: availableQty },
            ]);
        } else {
            // Updating an existing attribute
            const updatedAttributes = [...attributes];
            updatedAttributes[editingIndex] = {
                color: colorArray,
                type: type,
                unitPrice: unitPrice,
                description: description,
                availableQty: availableQty
            };
            setAtributes(updatedAttributes);
            // Reset editing state
            setEditingIndex(-1);
            setEditingAttribute(null);
        }

        setColorArray([]);
        setType("");
        setUnitPrice("");
        setDescription("");
        setAvailableQty("")
    };

    const editAttribute = (index) => {
        setEditingIndex(index);
        setEditingAttribute(attributes[index]);
        // set the corresponding values in input fields for editing
        setType(attributes[index].type);
        setUnitPrice(attributes[index].unitPrice);
        setDescription(attributes[index].description);
        setColorArray(attributes[index].color);
        setAvailableQty(attributes[index]?.availableQty);
    };

    const deleteAttribute = (index) => {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAtributes(updatedAttributes);
    };
    const handleMenuClick = (record, action) => {

        if (action === 'delete') {
            deleteAttribute(record)
        } else if (action === 'edit') {
            editAttribute(record)
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
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            render: (text, record) => (
                <span>{record.color.join(", ")}</span>
            ),
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
        },
        {
            title: 'Available Qty',
            dataIndex: 'availableQty',
        },
        {
            title: 'Actions',
            render: (text, record, index) => (
                <Dropdown overlay={() => menu(index)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
                    <div style={{ boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px" }}>

                        <EllipsisOutlined size={45} />
                    </div>
                </Dropdown>
            ),
        },
    ]
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : null}
            <div className='input-wrapper'>
                <div style={{ width: "100%", display: "flex", backgroundColor: '#fff', alignItems: "center", padding: 25, gap: 15 }}>
                    <SelectField width={"24%"} label={"Category"} placeholder={"Category"} options={category.map(cat => ({ label: cat.name, value: cat._id }))} value={categorys} onChange={(e) => setCategorys(e)} />
                    <InputField
                        label={"Name of Service"}
                        placeholder={"Name of Service"}
                        width={"24%"}
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                    />
                </div>
                {categorys && names ?
                    <>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#fff', marginTop: 23, padding: 25,}}>
                        <div style={{ width: "100%", display: "flex", gap: '15px' }}>
                            <InputField placeholder={"Type Name"} label={"Type Name"} value={type} width={"18%"} onChange={(e) => setType(e.target.value)} />
                            <InputField placeholder={"Description"} label={"Description"} value={description} width={"18%"} onChange={(e) => setDescription(e.target.value)} />
                            <div style={{ width: "20%", display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: "flex", alignItems: "center", alignContent: 'center', justifyContent: 'center', width: '100%'}}>
                                    <InputField placeholder={"Color"} label={"Color"} value={color} onChange={(e) => setColor(e.target.value)} width={"75%"}  borderTopRightRadius={0} borderBottomRightRadius={0} />
                                    <Button type="default" className="custom-hover-btn add-color-btn" style={{ width: "25%", height: "35px",  borderLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onClick={() => AddColors()}>Add</Button>
                                </div>
                                
                            </div>
                            <InputField placeholder={"Unit Price"} styl={{backgroundColor: 'red'}} label={"Unit Price"} value={unitPrice} width={"13%"} onChange={(e) => {
                                const input = e.target.value;
                                if (/^\d+$/.test(input) || input === "") {
                                    // If it's a positive number or an empty string, update the state
                                    setUnitPrice(input);
                                }
                            }} type={"number"} />
                            <InputField placeholder={"Available Qty"} label={"Available"} value={availableQty} width={"13%"} onChange={(e) => {
                                const input = e.target.value;
                                if (/^\d+$/.test(input) || input === "") {
                                    // If it's a positive number or an empty string, update the state
                                    setAvailableQty(input);
                                }
                            }} type={"number"} />
                                <div style={{ width: "18%", display: 'flex', alignItems: 'center' }}>
                                {/* // ... existing code */}

                                {editingIndex === -1 ? (
                                    <Button type="default" style={{width: '100%', height: '35px', marginTop: '8px', backgroundColor: '#b78953', color: '#fff'}} className="custom-hover-btn" onClick={() => AddAttributes()}>Save</Button>
                                ) : (
                                    <Button type="default" style={{width: '100%', height: '35px', marginTop: '8px', backgroundColor: '#b78953', color: '#fff'}} className="custom-hover-btn" onClick={() => AddAttributes()}>Update</Button>
                                )}

                                {/* // ... existing code */}

                                {/* <Button type="dashed" className="custom-hover-btn" onClick={() => AddAttributes()}>Save</Button> */}
                                </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px",  flexWrap: "wrap", width: '100%', }}>
                                    { colorArray && colorArray.length ? colorArray.map((e, index) => { return <p style={{ padding: "8px 10px", background: "#F5F5F5", color: "#36454F", borderRadius: "10px",  height: 'auto' }}>{e} <span style={{cursor: 'pointer'}} onClick={() => removeColor(index)}> <CloseOutlined /> </span></p>}) : null}
                                    
                                </div>
                    </div>
                        
                        
                    </>
                    :
                    <></>}
                {attributes.length > 0 ? <div style={{ width: "100%", marginTop: "10px" }}>

                    <Table columns={columns} dataSource={attributes} />
                </div> : <></>}

                <div style={{ width: "100%", marginTop: "15px", display: "flex", alignItems: "center", justifyContent: "end" }}>

                    <Button type="dashed" className="custom-hover-btn" onClick={() => Add()}>{location.state ? "Save Changes" : "Add Service"}</Button>
                </div>

            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default AddSettingService