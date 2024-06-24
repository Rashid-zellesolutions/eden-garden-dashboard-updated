import { Form, Input, Select, Space } from 'antd';
import React from 'react';
import './module.orderSupplyCostomTable.css';


const OrderSuppliesCustomTable = ({ onDataChange, form, vendors }) => {

    const onFinish = (values) => {
        const updatedFields = form.getFieldValue('fields').map((item) => ({
            ...item,
            totalPrice: item?.qty && item?.price ? item?.qty * item.price : 0,
            color: "null",
            total: item?.total || 0,
            status: item?.orderSupliesStatus,
        }));
        onDataChange({
            fields: updatedFields,
        });
        // toast.success("Add New Field");
    };
    return (
        <fieldset style={{
            width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap",
            padding: "10px 25px",
            borderRadius: "4px",
            marginBottom: "10px",
            backgroundColor: '#fff'
        }}>
            <div
                className='headings'
                style={{
                    marginBottom: 10,
                    fontFamily: 'poppins',
                    color: '#73787c',
                    fontWeight: '600',
                    marginLeft: -8,
                }}
            >
                <span style={{ opacity: 0 }}>{"1"}</span> {"Custom"}
            </div>
            <Form
                form={form}
                name="dynamic_form_nest_item"
                onValuesChange={onFinish}
                autoComplete="off"
                style={{
                    width: '100%',
                }}
            >
                <Form.List name="fields" width={'100%'} >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => {
                                const statusValue = form.getFieldValue(['fields', name, 'status']);
                                const orderSupliesStatusValue = form.getFieldValue(['fields', name, 'orderSupliesStatus']);
                                //  form.getFieldValue(['fields', name, 'status'])==="Not Available"
                                const isStatusNotAvailable = statusValue !== "Confirmed";
                                if (isStatusNotAvailable) {
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: "start", 
                                                marginBottom: 10,
                                                width: '100%',
                                                flexWrap: "wrap"
                                            }}
                                            align="baseline"
                                        >
                                        <div style={{display: 'flex', width: '100%', gap: 15}}>
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
                                                    width: '100%', flexDirection: "column !important", height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10,
                                                    
                                                }}

                                            >
                                                <Input placeholder="Name" style={{
                                                    width: "100%",
                                                    height: 45
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
                                                style={{
                                                    width: '50%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Input placeholder="Qty" style={{
                                                    width: "100%",
                                                    background: "#fff",
                                                    height: 45
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
                                                    width: '100%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Input placeholder="Unit Price" style={{
                                                    width: "100%",
                                                    background: "#fff",
                                                    height: 45
                                                }} type='number' disabled={true} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'totalPrice']}
                                                style={{
                                                    width: '100%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                                label={index === 0 ? 'Total Price' : ''}
                                            >
                                                <p style={{ fontSize: "14px", color: "#00000040", background: "#fff", padding: "11px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>
                                                    {form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) ? form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) : 0}
                                                </p>
                                            </Form.Item>
                                            </div>
                                            <div style={{display: 'flex', width: '100%', gap: 15}}>   
                                            <Form.  Item
                                                {...restField}
                                                name={[name, 'status']}
                                                label={index === 0 ? 'Status' : ""}
                                                style={{
                                                    width: '100%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Select options={[{ value: "Confirmed", label: "Confirmed" }, { value: "Not Available", label: "Not Available" }]} disabled={true} style={{ height: 45 }} />

                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'orderSupliesStatus']}
                                                label={index === 0 ? 'Order Supplies' : ""}
                                                style={{
                                                    width: '100%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Select options={[{ value: "Confirmed", label: "Confirmed" }, { value: "Not Available", label: "Not Available" }]}
                                                    disabled={statusValue === "Confirmed" ? true : false}
                                                    style={{ height: 45 }} />

                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'vendors']}
                                                label={index === 0 ? 'vendors' : ""}
                                                style={{
                                                    width: '100%', height: index === 0 ? 60 : 45,
                                                    marginBottom: index === 0 ? 30 : 10
                                                }}
                                            >
                                                <Select
                                                    label="Vendors"
                                                    placeholder="Vendors"
                                                    options={vendors.map((e) => ({
                                                        value: e.name, label: e.name
                                                    }))}
                                                    width={"20%"}
                                                    style={{height: 45}}
                                                // disabled={selectedValues.find((item) => item.category === category && item.service === service.name)?.status === "Confirmed"}
                                                // value={selectedValues.find((item) => item.category === category && item.service === service.name)?.vendors}
                                                // onChange={(e) => {
                                                //     updateSelectedValues(category, service.name, 'vendors', e);
                                                //     // updateSelectedValues(category, service.name, 'status', e);

                                                // }}
                                                // disabled={true}
                                                />

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
                                        </div>
                                    )
                                }
                                return null

                            })}

                        </>
                    )}
                </Form.List>

            </Form>
        </fieldset>
    );
}
export default OrderSuppliesCustomTable;

