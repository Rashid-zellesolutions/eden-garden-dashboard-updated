import React, { useRef } from 'react';
import { Input } from 'antd';
import '../Pages/Booking/module.addbooking.css';

const InputField = ({ placeholder, position, readOnly, zIndex, opacity, top, left, label, name, onChange, value, width, type, disabled, onClick, className, inputRefs, defaultValue, borderRight, borderBottomRightRadius, borderTopRightRadius }) => {
  const inputRef = useRef(value);

  // const handleChange = (e) => {
  //   const newValue = e.target.value;a
  //   inputRef.current = newValue; // Update the ref value
  //   onChange(e); // Call the original onChange prop
  // };
  // if (inputRef.current && inputRef.current.input) {
  //   inputRef.current.value = "This is a value";
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: width }}>
      {label && (
        <label
          style={{
            marginBottom: 5,
            fontFamily: 'poppins !important',
            color: '#73787c',
            fontWeight: '500',
          }}
          className="input-labels"
        >
          {label}
        </label>
      )}
      <Input
        className="custom-input"
        style={{
          width: "100%",
          height: 35,
          marginBottom: 15,
          background: "#fff",
          borderRight: borderRight,
          borderTopRightRadius: borderTopRightRadius,
          borderBottomRightRadius: borderBottomRightRadius,
          position: position,
          top: top,
          left: left,
          zIndex: zIndex,
          opacity: opacity
        }}
        placeholder={placeholder}
        value={value}
        borderRight={borderRight}
        onChange={onChange}
        type={type}
        disabled={disabled}
        onClick={onClick}
        ref={inputRefs}
        defaultValue={defaultValue}
        borderBottomRightRadius={borderBottomRightRadius}
        borderTopRightRadius={borderTopRightRadius}
        name={name}
        readOnly={readOnly}
      />
    </div>
  );
}
export default InputField;
