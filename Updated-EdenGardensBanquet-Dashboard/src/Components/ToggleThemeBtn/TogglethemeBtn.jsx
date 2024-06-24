import React from 'react';
import { Button } from 'antd';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import './Toggletheme.css'

const TogglethemeBtn = ({darkTheme, toggleTheme}) => {
  return (
    <div className='toggle-theme-btn'>
        <Button onClick={toggleTheme}>
        { darkTheme ? <HiOutlineSun /> :<HiOutlineMoon /> }
        </Button>
    </div>
  )
}

export default TogglethemeBtn