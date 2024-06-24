import { Form, Input, Select, Space } from 'antd';
import React from 'react';
import './module.eventPlannerCostomTable.css';


const EventPlannerCustomTable = ({ onDataChange, form, formData }) => {
    console.log(formData);
    const onFinish = (values) => {
        const updatedFields = form.getFieldValue('fields').map((item) => ({
            ...item,
            totalPrice: item?.qty && item?.price ? item?.qty * item.price : 0,
            color: "null",
            total: item?.total || 0,
            // status: item?.orderSupliesStatus ,
        }));
        onDataChange({
            fields: updatedFields,
        });
        // toast.success("Add New Field");
    };
    return (
        <fieldset className='main-fieldset' style={{
            display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap",
            padding: "10px 25px",
            borderRadius: "4px",
            marginBottom: "10px",
            backgroundColor: '#fff',
            marginTop: 13
        }}>
            <div
                className='headings'
                style={{
                    // marginBottom: 10,
                    fontFamily: 'poppins',
                    color: '#73787c',
                    fontWeight: '600',
                    fontSize: "28px",
                    marginLeft: -14,
                    // width: "8%"
                    marginTop: 10
                }}
            >
                <span style={{ opacity: 0 }}>{"1"}</span> {"Custom"}
            </div>
            {/* <div style={{width: '100%'}}> */}
            <Form
                form={form}
                name="dynamic_form_nest_item"
                onValuesChange={onFinish}
                autoComplete="off"
                style={{
                    width: '100%',
                }}
            >
                <Form.List name="fields">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => {
                                const statusValue = form.getFieldValue(['fields', name, 'status']);
                                const orderSupliesStatusValue = form.getFieldValue(['fields', name, 'orderSupliesStatus']);
                                //  form.getFieldValue(['fields', name, 'status'])==="Not Available"
                                return (
                                    <div
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            // width: '100%',
                                            // justifyContent: 'space-between',
                                            // alignItems: "flex-end", 
                                            // marginBottom: 10,
                                            // width: '100%',
                                            // flexWrap: "wrap",
                                            gap: 15
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
                                            className='input-labels'
                                            style={{
                                              flexDirection: "column !important", height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}

                                        >
                                            <Input placeholder="Name" style={{
                                                width: "100%",
                                                background: "#fff",
                                                height: 35
                                            }} name='name' disabled={true} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'qty']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Qty',
                                                },
                                            ]}
                                            label={index === 0 ? 'Qty' : ''}
                                            className='input-labels'
                                            style={{
                                                height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}
                                        >
                                            <Input placeholder="Qty" style={{
                                                width: "100%",
                                                background: "#fff",
                                                height: 35
                                            }} type='number' disabled={true} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Unit Price',
                                                },
                                            ]}
                                            label={index === 0 ? 'Unit Price' : ""}
                                            style={{
                                                height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}
                                        >
                                            <Input placeholder="Unit Price" style={{
                                                width: "100%",
                                                background: "#fff",
                                                height: 35
                                            }} type='number' disabled={true} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'totalPrice']}
                                            style={{
                                                height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}
                                            label={index === 0 ? 'Total Price' : ''}
                                        >
                                            <p style={{ fontSize: "14px", color: "#000", background: "#fff", padding: "6px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>
                                                {form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) ? form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) : 0}
                                            </p>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'status']}
                                            label={index === 0 ? 'Status' : ""}
                                            style={{
                                                height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}
                                        >
                                            <Select options={[{ value: "Confirmed", label: "Confirmed" }, { value: "Not Available", label: "Not Available" }]}
                                                disabled={formData?.find(service => service.status) === "Confirmed" ? true : false} style={{ height: 35 }} />

                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'orderSupliesStatus']}
                                            label={index === 0 ? 'Order' : ""}
                                            style={{
                                                height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10,
                                            }}
                                        >
                                            <p className='order-status-text-' style={{ fontSize: "14px", color: "#000", background: "#fff", border: "1px solid #d9d9d9", padding: '6px', cursor: 'pointer',  borderRadius: "6px", height: 35 }}>
                                                {orderSupliesStatusValue}
                                            </p>
                                            {/* <p className='order-status-text-s' style={{  color: "#000", background: "#fff", border: "1px solid #d9d9d9", cursor: 'pointer',  borderRadius: "6px", height: 45 }}>
                                                {orderSupliesStatusValue}
                                            </p> */}

                                        </Form.Item>

                                        {/* <Form.Item
                                            {...restField}
                                            name={[name, 'remark']}
                                            label={index === 0 ? statusValue === "Issue" ? 'Remark' : "" : ""}
                                            style={{
                                                width: 150, height: index === 0 ? 60 : 45,
                                                marginBottom: index === 0 ? 30 : 10
                                            }}
                                        >
                                            {statusValue === "Issue" ? <Input placeholder="Remark" style={{
                                                width: "100%",
                                                background: "#fff",
                                                height: 45
                                            }} /> : null} */}
                                        {/* </Form.Item> */}
                                    </div>
                                )
                            })}

                        </>
                    )}
                </Form.List>

            </Form>
            {/* </div> */}
        </fieldset>
    );
}
export default EventPlannerCustomTable;

