import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const TextAreaField = ({ textAreas, value, onChange, readOnly, width, disabled, autoSize }) => (
  <>
    {textAreas.map((textArea, index) => (
      <div key={index} style={{ width: width }}>
        {textArea.label && (
          <label className='input-labels' style={{ display: 'block', marginBottom: 5, color: '#73787c', fontWeight: 500, }}>{textArea.label}</label>
        )}
        <TextArea
          autoSize={autoSize}
          value={value}
          showCount={textArea.showCount || false}
          onChange={onChange}
          placeholder={textArea.placeholder}
          readOnly={readOnly}
          disabled={disabled}
          style={{
            height: textArea.height || 35,
            resize: textArea.resize || 'none',
            maxHeight: textArea.maxHeight,
            color: "#000"
          }}
        />
        <br />
      </div>
    ))}
  </>
);

export default TextAreaField;

