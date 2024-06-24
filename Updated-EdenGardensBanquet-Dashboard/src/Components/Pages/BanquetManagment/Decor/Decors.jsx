import React, { useState } from 'react'
import InputField from '../../../InputField'
import { Button } from 'antd'
import '../FoodType/module.FoodType.css';

const Decors = ({heading, width, label, name, placeholder, type, isTrue, data, handleChange, imageName, onSubmit }) => {
    
  return (
    <div style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
        flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
        padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
    }}>
    <div style={{
            marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
            fontWeight: '600'
        }}>
        <span>{heading}</span>
    </div>
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{width: '100%', display: 'flex', gap: '15px'}}>
            <InputField 
                width={width}
                label={"Name"}
                value={data.name}
                onChange={(e) => handleChange(e, heading)}
                name={'name'}
                placeholder={"Seat Name"}
            />
            <InputField 
                width={width}
                label={'Cost'}
                name={'cost'}
                value={data.cost}
                placeholder={"Seat Cost"}
                onChange={(e) => handleChange(e, heading)}
            />
            {isTrue && (
                <InputField 
                type={type}
                width={width}
                label={'Image'}
                name={imageName}
                onChange={(e) => handleChange(e, heading)}
            />
            )} 
        </div>
        <div style={{display: 'flex', gap: '15px', justifyContent: 'end', width: '100%'}}>
        <Button type="primary" htmlType="button" onClick={onSubmit}
            style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }} 
            className="custom-hover-btn">Add</Button>
    </div>
    </div>
  </div>
  )
}

export default Decors