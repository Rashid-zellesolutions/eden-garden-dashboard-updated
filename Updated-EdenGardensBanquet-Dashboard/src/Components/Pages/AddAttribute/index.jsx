import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettingContext } from "../../../Context/SettingContext";
import { Url } from "../../../env";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import SelectField from "../../SelectField";
import SuccessPopup from "../../SuccessPopup";

function AddAttribute(params) {
    const { GetSettingService, settingService } = useSettingContext()
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    const [names, setNames] = useState("")
    const [services, setServices] = useState("")
    const [loading, setLoader] = useState(false);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const addedBy = JSON.parse(localStorage.getItem("data"))

    useEffect(() => {
        GetSettingService()
    }, [])
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const Add = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            name: services,
            // category: services,
            addedBy: addedBy.fullName,
            updatedBy: ""
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}SettingService/Add`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result, "heloo");
                if (result.status === 200) {
                    setSuccessPopupOpen(true)
                    setSuccessPopupMessage(result.message)
                    setNames("")
                    setServices("")
                } else {
                    setErrorPopupMessage(result.message)
                    setErrorPopupOpen(true)
                }
                setLoader(false)
            }).catch(error => {
                setLoader(false)
                console.log('error', error)
            })
    }
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : null}
            <div className='input-wrapper'>
                <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <SelectField width={"48%"} label={"Services"} placeholder={"Services"} options={settingService.map(ser => ({ label: ser.name, value: ser._id }))} value={services} onChange={(e) => setServices(e)} />
                    <InputField
                        label={"Name of Service"}
                        placeholder={"Name of Service"}
                        width={"48%"}
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                    />
                </div>
                <div style={{ width: "100%", marginTop: "15px" }}>

                    <Button type="dashed" className="custom-hover-btn" onClick={() => Add()}>Add Service</Button>
                </div>
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default AddAttribute