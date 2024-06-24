import axios from 'axios';
import React from 'react';
import { Button, Flex } from 'antd';
import '../Pages/PageComponent.css'

const Btn = ({ htmlType, onClick, className, label }) => (
    <Flex gap="small" wrap="wrap" style={{ width: "19.5%", }}>
        <Button type="primary" onClick={onClick} className={className} htmlType={htmlType} style={{ background: "#73787c", width:"100%",height: "35px" }} >{label}</Button>
    </Flex>

);
export default Btn;