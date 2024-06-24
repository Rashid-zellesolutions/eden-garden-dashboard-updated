import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Url } from '../../../env';
import Btn from '../../Btn';
import ErrorPopup from '../../ErrorPopup';
import Loader from '../../Loader';
import SuccessPopup from '../../SuccessPopup';
import MenuItem from 'antd/es/menu/MenuItem';
import './module.repair.css';

function Repair() {
    const location = useLocation()
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
    const [form] = Form.useForm();
    const [formData, setFormData] = useState([]);
    const [loading, setLoader] = useState(false);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [vendors, setVendors] = useState([])
    useEffect(() => {
        if (location.state && location.state.repair) {
            // Set the form data when editing
            form.setFieldsValue({ fields: location.state.repair });
        } else {
            // Add one row when the component mounts
            form.setFieldsValue({ fields: [{ name: '', description: '', qty: '', price: '', contractorName: '' }] });
        }
    }, [form, location.state]);
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        if (location.state) {
            navigate("/Repair&Services/allservicesandrepair")
        } else {
            return
        }
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const onFinish = (values) => {
        const updatedFields = form.getFieldValue('fields').map((item) => ({
            ...item,
            totalPrice: item?.qty && item?.price ? item?.qty * item?.price : 0,

        }));
        // console.log(updatedFields);
        setFormData((prevData) => ({ ...prevData, updatedFields }));
    };
    console.log(formData);
    const AddRepair = () => {
        if (!location.state) {
            const hasEmptyRequiredFields = formData.updatedFields && formData.updatedFields.some(item => (
                !item.name || !item.description || !item.qty || !item.price || !item.contractorName
            ));

            if (hasEmptyRequiredFields || !formData.updatedFields) {
                setErrorPopupMessage("Fill all required fields");
                setErrorPopupOpen(true);
                return;
            }
            // if (!formData.updatedFields?.length) {
            //     setErrorPopupMessage("Fill Inputs")
            //     setErrorPopupOpen(true)
            //     return
            // }
            // else {
            setLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                repair: formData.updatedFields
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Repair/Add`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result, "heloo");
                    if (result.status === 200) {
                        setSuccessPopupOpen(true)
                        setSuccessPopupMessage(result.message)
                        form.resetFields();
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
        else {

            setLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                repair: formData.updatedFields
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Repair/Edit/${location.state._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result, "heloo");
                    if (result.status === 200) {
                        setSuccessPopupOpen(true)
                        setSuccessPopupMessage(result.message)
                        form.resetFields();
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
    const validateQty = (rule, value, callback, index) => {
        const sanitizedValue = Math.max(0, value); // Ensure the value is not negative
        const fieldsValue = form.getFieldValue('fields');

        if (index !== undefined && index >= 0 && index < fieldsValue.length) {
            const updatedFields = fieldsValue.map((item, i) => (i === index ? { ...item, qty: sanitizedValue } : item));
            form.setFieldsValue({ 'fields': updatedFields });
        }

        callback(); // Continue with the validation
    };
    const validateUnitprice = (rule, value, callback, index) => {
        // console.log(_);
        // if (value < 0) {
        //   form.setFieldsValue({ 'fields': form.getFieldValue('fields').map((item, index) => index === _ ? { ...item, qty: 0 } : {}) });
        //   return Promise.reject('Qty must be greater than or equal to 0');
        // }
        // return Promise.resolve();
        const sanitizedValue = Math.max(0, value); // Ensure the value is not negative
        const fieldsValue = form.getFieldValue('fields');

        if (index !== undefined && index >= 0 && index < fieldsValue.length) {
            const updatedFields = fieldsValue.map((item, i) => (i === index ? { ...item, price: sanitizedValue } : item));
            form.setFieldsValue({ 'fields': updatedFields });
        }

        callback(); // Continue with the validation
    };
    useEffect(() => {
        setLoader(true)
        const FetchVendors = () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Vendors/Get`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setVendors(result.Vendors)
                    // console.log(result);
                    setLoader(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoader(false)
                });
        }
        FetchVendors()
    }, [])
    console.log(formData);
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : null}
            <div className='input-wrapper'>
                <Form
                    form={form}
                    name="dynamic_form_nest_item"
                    // onFinish={onFinish}
                    onValuesChange={onFinish}
                    autoComplete="off"
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        padding: 25,
                        // width: '100%',
                        // display: 'flex',
                    }}
                >
                    <Form.List name="fields">
                        {(fields, { add, remove }) => (
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {fields.map(({ key, name, ...restField }, index) => {
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                // backgroundColor: 'black',
                                                alignItems: "center", 
                                                marginBottom: 10,
                                                gap: 15,
                                                // flexWrap: "wrap"
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                label={index === 0 ? 'Name' : ''}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Name',
                                                    },
                                                ]}
                                                style={{
                                                    width: '20%', flexDirection: "column !important", height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}

                                            >
                                                <Input placeholder="Name" style={{
                                                    width: "100%",
                                                    background: "#fff",
                                                    height: 35,
                                                }} name='name' />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                label={index === 0 ? 'Description' : ''}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Description',
                                                    },
                                                ]}
                                                style={{
                                                    width: '20%', flexDirection: "column !important", height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                                                }}

                                            >
                                                <Input placeholder="Description" style={{
                                                    width: "100%",
                                                    height: 35,
                                                    background: "#fff"
                                                }} name='description' />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'qty']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Qty',
                                                    },
                                                    {
                                                        validator: (rule, value, callback) => validateQty(rule, value, callback, index),
                                                    },
                                                ]}
                                                label={index === 0 ? 'Qty' : ''}
                                                style={{
                                                    width: '20%', height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Input placeholder="Qty" style={{
                                                    width: "100%",
                                                    height: 35,
                                                    background: "#fff"
                                                }} type='number' />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Unit Price',
                                                    },
                                                    {
                                                        validator: (rule, value, callback) => validateUnitprice(rule, value, callback, index),
                                                    },
                                                ]}
                                                label={index === 0 ? 'Unit Price' : ""}
                                                style={{
                                                    
                                                    width: '20%', height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Input placeholder="Unit Price" style={{
                                                    width: "100%",
                                                    height: 35,
                                                    background: "#fff"
                                                }} type='number' />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'contractorName']}
                                                label={index === 0 ? 'Vendor Name' : ''}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Vendor Name',
                                                    },
                                                ]}
                                                style={{
                                                    width: '20%', flexDirection: "column !important", height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                                                }}

                                            >
                                                <Select placeholder={"Vendor Name"}  style={{
                                                    width: "100%",
                                                    height: 35,
                                                    background: "#fff"
                                                }} >
                                                    {vendors.map((e) => {
                                                        return (
                                                            <MenuItem value={e.name}>{e.name}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                                {/* <Input placeholder="Contractor Name" style={{
                                                    width: "100%",
                                                    height: 45,
                                                    background: "#fff"
                                                }} name='contractorName' /> */}
                                            </Form.Item>
                                            <Form.Item
                                                labelAlign='center'
                                                label={index === 0 ? 'Action' : ''}
                                                className='form-check-alignment'
                                                style={{
                                                    width: "5%", display: 'flex', justifyContent:'center',  height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 30
                                                }}
                                            >
                                                <DeleteOutlined
                                                    onClick={() => {
                                                        remove(name);
                                                        const updatedFields = form.getFieldValue('fields').filter((field) => field?.name !== name);
                                                        console.log(updatedFields);
                                                        setFormData({
                                                            updatedFields,
                                                        });
                                                    }}
                                                    style={{ fontSize: 16, color: '#73787c', width: 50, marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
                                                />
                                            </Form.Item>

                                        </div>
                                    )
                                })}
                                <div>
                                <Form.Item >
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add()
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                        style={{ width: 180 }}
                                        className='add-more'
                                    >
                                        Add More Repair
                                    </Button>
                                </Form.Item>
                                </div>
                            </div>
                        )}
                    </Form.List>

                </Form>
                <div style={{
                    width: "100%",
                    marginTop: "10px",
                    display: "flex", alignItems: "center",
                    justifyContent: "right"
                }}>
                    <Btn htmlType="button" onClick={AddRepair} className="custom-hover-btn" label={location.state ? "Save Repair" : "Add Repair"} />
                </div>
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div >
    )
}
export default Repair