
import React from 'react';
import { Select } from 'antd';
import "../Pages/PageComponent.css"; // Make sure to import your CSS file

const SelectField = ({ options, placeholder, label, onChange, value, width, showSearch, disabled, defaultValue,name }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: width }}>
    {label && <label className="input-labels" style={{ marginBottom: 5, fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>{label}</label>}
    <Select className='ant-select-selector'
      showSearch={showSearch}
      style={{
        width: "100%",
        height: 35,
        marginBottom: 15,
        borderColor: "#b78953 !important",
        backgroundColor: "#fff !important"
      }}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
      value={value}
      onChange={onChange}
      // mode='multiple'
      disabled={disabled}
      defaultValue={defaultValue}
      name={name}
    />
  </div>
);

export default SelectField;
