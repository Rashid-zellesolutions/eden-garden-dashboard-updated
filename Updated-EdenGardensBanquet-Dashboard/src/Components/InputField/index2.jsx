import React, { useRef } from 'react';
import { Input } from 'antd';

const InputField2 = ({ placeholder, label, onChange, value, width, type, disabled, onClick, className, inputRefs, defaultValue }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    newValue = newValue.replace(/^0+/, ''); // Remove leading zeros

    // Add '+1' before the value
    newValue = newValue ? '+1' + newValue : '';

    // Insert space after every 3 digits
    newValue = newValue.replace(/(\d{3})(?=\d)/g, '$1 ');

    // Update the input field value
    e.target.value = newValue;

    // Call the original onChange prop
    onChange(e);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: width }}>
      {label && (
        <label
          style={{
            marginBottom: 5,
            fontFamily: 'poppins !important',
            color: '#73787c',
            fontWeight: '500',
            fontSize: "14px"
          }}
        >
          {label}
        </label>
      )}
      <Input
        className="custom-input"
        style={{
          width: "100%",
          height: 45,
          marginBottom: 15,
          background: "#fff"
        }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange} // Use the custom handleChange function
        type={type}
        disabled={disabled}
        onClick={onClick}
        ref={inputRef}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default InputField2;
