import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../../../env";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import SuccessPopup from "../../SuccessPopup";

function AddCategory(params) {
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
    const [loading, setLoader] = useState(false);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const addedBy = JSON.parse(localStorage.getItem("data"))
    console.log(names);
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const Add = () => {
        if (!names) {
            setErrorPopupMessage("Fill Input")
            setErrorPopupOpen(true)
            return
        }
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            name: names,
            addedBy: addedBy.fullName,
            updatedBy: ""
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}Category/Add`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result, "heloo");
                if (result.status === 200) {
                    setSuccessPopupOpen(true)
                    setSuccessPopupMessage(result.message)
                    setNames("")
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
            {loading ? <Loader /> : <></>}
            <div className='input-wrapper' style={{backgroundColor: '#fff', padding: 25}}>
                <InputField
                    label={"Category Name"}
                    placeholder={"Category Name"}
                    width={"40%"}
                    // style={{width: '90% !important'}}
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                />
                <div style={{ width: "100%", marginTop: "15px" }}>

                    <Button type="dashed" className="custom-hover-btn" onClick={() => Add()}>Add Category</Button>
                </div>
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default AddCategory