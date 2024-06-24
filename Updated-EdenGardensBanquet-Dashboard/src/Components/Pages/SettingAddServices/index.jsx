import { Button } from "antd";
import { useState } from "react";
import { Url } from "../../../env";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import SuccessPopup from "../../SuccessPopup";
import './module.others.css'

function SettingAddServices() {
    const [parentCategory, setParentCategory] = useState("");
    const [unitPrice, setUnitPrice] = useState(null);
    const [name, setName] = useState("");
    const [serviceOption, setServiceOption] = useState("");
    const [color, setColor] = useState(null);
    const [servicesOptions, setServicesOptions] = useState([]);
    const [colorOption, setColorOption] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [colorError, setColorError] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleAddServiceOption = () => {
        if (!serviceOption) {
            setError("Service Option are required");
            return;
        }

        setServicesOptions((prevOptions) => [
            ...prevOptions,
            serviceOption,
        ]);
        setServiceOption("");
        setError(null);
    };
    const handleAddColorOption = () => {
        if (!colorOption) {
            setColorError("Color Option are required");
            return;
        }

        setColorOptions((prevOptions) => [
            ...prevOptions,
            colorOption,
        ]);
        setColorOption("");
        setError(null);
    };

    const handleOptionChange = (index, newValue) => {
        setServicesOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = newValue;
            return updatedOptions;
        });
    };
    const handleColorOptionChange = (index, newValue) => {
        setColorOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = newValue;
            return updatedOptions;
        });
    };
    const Save = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            serviceName: name,
            serviceOptions: servicesOptions,
            colorOptions: color,
            colorList: colorOptions,
            parentCategory: parentCategory,
            unitPrice: unitPrice

        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}EventScap/Add`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setSuccessPopupMessage("Service  Add Successfully")
                    setSuccessPopupOpen(true)
                    setColor(false)
                    setColorOptions([])
                    setServicesOptions([])
                    setName("")
                    setParentCategory("")
                    setUnitPrice(null)
                } else {
                    setErrorPopupOpen(true)
                    setErrorPopupMessage(result.message);
                }
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div className='add-booking-container'>
            {loading ? <Loader /> : <></>}
            <InputField
                placeholder={"Parent Category"}
                onChange={(e) => setParentCategory(e.target.value)}
                value={parentCategory}
            />
            <h3>Rashid Ali</h3>
            <InputField
                placeholder={"Service Name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            {servicesOptions.map((option, index) => (
                <div key={index}>
                    <InputField
                        placeholder={`Service Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                </div>
            ))}
            <InputField
                placeholder={"Service Option"}
                onChange={(e) => setServiceOption(e.target.value)}
                value={serviceOption}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button className='add-more' onClick={handleAddServiceOption}>Add Service Option</Button>
            <div style={{ marginTop: "10px", display: "flex", gap: 5, }}>
                <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Color have?</label>
                <div class="checkbox-wrapper-19" >
                    <input type="checkbox" id={"Servers"} checked={color} onChange={(value) => setColor(value.target.checked)} />
                    <label for={"Servers"} class="check-box" />
                </div>
            </div>
            {color ? <>{colorOptions.map((option, index) => (
                <div key={index}>
                    <InputField
                        placeholder={`Color Option`}
                        value={option}
                        onChange={(e) => handleColorOptionChange(index, e.target.value)}
                    />
                </div>
            ))}
                <InputField
                    // label={"Color Option"}
                    placeholder={"Color Option"}
                    onChange={(e) => setColorOption(e.target.value)}
                    value={colorOption}
                />
                {colorError && <p style={{ color: "red" }}>{colorError}</p>}
                <Button className='add-more' style={{ marginBottom: "10px !important" }} onClick={handleAddColorOption}>Add Color Option</Button></> : null}
            <InputField
                placeholder={"Unit Price"}
                onChange={(e) => setUnitPrice(e.target.value)}
                value={unitPrice}
                type={"number"}
            />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default SettingAddServices