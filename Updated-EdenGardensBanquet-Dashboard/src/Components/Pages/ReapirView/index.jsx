import { Form, Space } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './module.repairView.css';

function RepairView() {
    const location = useLocation()
    const navigate = useNavigate()
    const Data = location?.state?.repair ? location?.state?.repair : location?.state?.services
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    return (
        
        <div  className='add-booking-container'>
            <div style={{backgroundColor: '#fff', padding: 25}} className='input-wrapper'>{Data.map((e, index) => {
                return (

                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            // justifyContent: 'space-between',
                            width: '100%',
                            // alignItems: "flex-end", 
                            marginBottom: 10,
                            // flexWrap: "wrap",
                            gap: '15px'
                        }}
                        align="baseline"
                    >
                        <Form.Item
                            className="ant-form-item"
                            label={index === 0 ? 'Name' : ''}
                            style={{
                                with: '20% !important', flexDirection: "column !important", height: index === 0 ? 60 : 45,
                                marginBottom: index === 0 ? 30 : 10,
                            }}

                        >
                            <p style={{ fontSize: "14px", color: "#000000e0", background: "#fff", padding: "10px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{e.name}</p>
                        </Form.Item>
                        <Form.Item
                            label={index === 0 ? 'Description' : ''}

                            style={{
                                width: '30%', flexDirection: "column !important", height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                            }}

                        >
                            <p style={{ fontSize: "14px", color: "#000000e0", background: "#fff", padding: "10px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{e.description}</p>
                        </Form.Item>
                        <Form.Item
                            label={index === 0 ? 'Qty' : ''}
                            style={{
                                width: '15%', height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                            }}
                        >
                            <p style={{ fontSize: "14px", color: "#000000e0", background: "#fff", padding: "10px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{e.qty}</p>
                        </Form.Item>
                        <Form.Item
                            label={index === 0 ? 'Unit Price' : ""}
                            style={{
                                width: '15%',
                                height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                            }}
                        >
                            <p style={{ fontSize: "14px", color: "#000000e0", background: "#fff", padding: "10px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{e.price}</p>
                        </Form.Item>
                        <Form.Item
                            label={index === 0 ? 'Contractor Name' : ''}

                            style={{
                                width: '20%', flexDirection: "column !important", height: index === 0 ? 60 : 45, marginBottom: index === 0 ? 30 : 10
                            }}

                        >
                            <p style={{ fontSize: "14px", color: "#000000e0", background: "#fff", padding: "10px 11px", border: "1px solid #d9d9d9", borderRadius: "6px" }}>{e.contractorName}</p>
                        </Form.Item>

                    </div>
                )
            })}
            </div>
        </div>
    )

}
export default RepairView