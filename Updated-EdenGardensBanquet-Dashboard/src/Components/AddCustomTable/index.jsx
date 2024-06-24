import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import './module.addCosomTable.css';


const AddCustomTable = ({ onDataChange, data, setFormData, form }) => {

  const onFinish = (values) => {
    const updatedFields = form.getFieldValue('fields').map((item) => ({
      ...item,
      totalPrice: item?.qty && item?.price ? item?.qty * item.price : 0,
      color: "null",
      total: item?.total || 0,
      // remark: "",
      // status: "",
    }));
    onDataChange({
      fields: updatedFields,
    });
    // toast.success("Add New Field");
  };
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
  console.log("add costume")

  return (
    <fieldset className='costom-fieldsat' style={{
      width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap", backgroundColor: '#fff',
      padding: "10px 25px",
      borderRadius: "4px",
      marginBottom: "10px",
      paddingBottom: "30px",
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
    }}>
      <div
        style={{
          marginBottom: 10,
          fontFamily: 'poppins',
          color: '#73787c',
          fontWeight: '600',
          fontSize: "20px",
          marginLeft: -10,
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
        <Form.List name="fields">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => {
                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      width: '100%',
                      gap: 15,
                      // justifyContent: 'space-between',
                      alignItems: "center", 
                      marginBottom: 10,
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
                        flexDirection: "column !important", height: index === 0 ? 60 : 35,
                        marginBottom: index === 0 ? 30 : 10
                      }}

                    >
                      <Input placeholder="Name" style={{
                        width: "100%",
                        background: "#fff",
                        height: 35
                      }} name='name' />
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
                        height: index === 0 ? 60 : 35,
                        marginBottom: index === 0 ? 30 : 10
                      }}
                    >
                      <Input placeholder="Qty" style={{
                        width: "100%",
                        background: "#fff",
                        height: 35
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
                      label={index === 0 ? 'Unit Price $' : ""}
                      style={{
                        height: index === 0 ? 60 : 35,
                        marginBottom: index === 0 ? 30 : 10
                      }}
                    >
                      <Input placeholder="Unit Price" style={{
                        width: "100%",
                        background: "#fff",
                        height: 35
                      }} type='number' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'totalPrice']}
                      style={{
                        height: index === 0 ? 60 : 45,
                        marginBottom: index === 0 ? 30 : 10
                      }}
                      label={index === 0 ? 'Total Price $' : ''}
                    >
                      <p style={{ fontSize: "14px", height: 35, color: "#000000e0", background: "#fff", padding: "6px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) ? form.getFieldValue(['fields', name, 'qty']) * form.getFieldValue(['fields', name, 'price']) : 0}</p>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'Invoice']}
                      labelAlign='center'
                      label={index === 0 ? 'Invoice' : ''}
                      className='form-check-alignment'
                      style={{
                        height: index === 0 ? 60 : 35,
                        marginBottom: index === 0 ? 30 : 10,
                      }}
                      valuePropName="checked"
                    >
                      <div class="checkbox-wrapper-19" style={{ alignItems: "center", display: "flex", /*marginLeft: "15px",*/ marginTop: "0px",  }}>
                        <input type="checkbox" id={name} defaultChecked={form.getFieldValue(['fields', name, 'Invoice'])} />
                        <label for={name} class="check-box" />
                      </div>
                    </Form.Item>
                    <Form.Item
                      labelAlign='center'
                      label={index === 0 ? 'Action' : ''}
                      className='form-check-alignment'
                      style={{
                        width: "5%", height: index === 0 ? 60 : 35,
                        marginBottom: index === 0 ? 30 : 10, alignItems: 'start'
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <DeleteOutlined
                          onClick={() => {
                            remove(name);
                            const updatedFields = form.getFieldValue('fields').filter((field) => field?.name !== name);
                            console.log(updatedFields);
                            onDataChange({
                              fields: updatedFields,
                            });
                          }}
                          style={{ fontSize: 16, color: '#73787c', width: 35, alignItems: 'center', marginBottom: "1px", marginLeft: "15px", marginTop: "0px" }}
                        />
                      </div>
                    </Form.Item>
                    {/* <Form.Item>
                      <Button type="primary" htmlType="submit" style={{ background: "#b78953" }}>
                        Done
                      </Button>
                    </Form.Item> */}

                  </div>
                )
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: 180, marginBottom: "100px" }}
                  className='add-more'
                >
                  Add More Fields
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

      </Form>
    </fieldset>
  );
}
export default AddCustomTable;

