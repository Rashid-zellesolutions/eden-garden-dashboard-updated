import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSettingContext } from "../../Context/SettingContext";
import { Url } from "../../env";
import ErrorPopup from "../ErrorPopup";
import InputField from "../InputField";
import Loader from "../Loader";
import SuccessPopup from "../SuccessPopup";

function AddNewServicePopup({ isModalOpen, handleCancel, data }) {
    const { setAllService, allService, GetAllServices } = useSettingContext()

    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [unitPrice, setUnitPrice] = useState(null);
    const [serviceOption, setServiceOption] = useState("");
    const [color, setColor] = useState(null);
    const [description, setDescription] = useState(null);
    const [service, setService] = useState(null);
    const [servicesOptions, setServicesOptions] = useState([""]);
    const [colorOption, setColorOption] = useState("");
    const [colorOptions, setColorOptions] = useState([""]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [colorError, setColorError] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)

    useEffect(() => {
        if (data) {

            setName(data ? data?.serviceName : "")
            setParentCategory(data ? data?.parentCategory : "")
            setUnitPrice(data ? data?.unitPrice : null)
            setColor(data ? data?.colorOptions : null)
            setServicesOptions(data ? data?.serviceOptions : [])
            setColorOptions(data ? data?.colorList : [])
            setService(data ? data?.service : [])
            setDescription(data ? data?.description : [])
        }
    }, [data])

    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        handleCancel()
    }
    const CloseModel = () => {
        handleCancel()
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const handleAddServiceOption = () => {
        // if (!serviceOption) {
        //     setError("Service Option are required");
        //     return;
        // }

        setServicesOptions((prevOptions) => [
            ...prevOptions,
            serviceOption,
        ]);
        setServiceOption("");
        setError(null);
    };
    const handleAddColorOption = () => {
        // if (!colorOption) {
        //     setColorError("Color Option are required");
        //     return;
        // }

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
        if (data) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                serviceName: name,
                serviceOptions: servicesOptions,
                colorOptions: color,
                colorList: colorOptions,
                parentCategory: parentCategory,
                unitPrice: unitPrice,
                service: service,
                description: description

            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}EventScap/Edit/${data._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === 200) {
                        handleCancel()
                        setSuccessPopupMessage("Service  Update Successfully")
                        setSuccessPopupOpen(true)
                        setColor(false)
                        setColorOptions([])
                        setServicesOptions([])
                        setName("")
                        setParentCategory("")
                        setUnitPrice(null)
                        GetAllServices()
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
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                serviceName: name,
                serviceOptions: servicesOptions,
                colorOptions: color,
                colorList: colorOptions,
                parentCategory: parentCategory,
                unitPrice: unitPrice,
                service: service,
                description: description
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
                    console.log(result);
                    if (result.status === 200) {
                        setSuccessPopupMessage("Service  Add Successfully")
                        setSuccessPopupOpen(true)
                        setColor(false)
                        setColorOptions([])
                        setServicesOptions([])
                        setName("")
                        setParentCategory("")
                        setUnitPrice(null)
                        setAllService([...allService, result.EventScap])
                        // setAllService((prevServices) =>
                        //     prevServices.map((services) => console.log([services, result.EventScap])
                        //     )
                        // )
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
    }
    console.log(servicesOptions);
    return (
        <>
            {/* <Loader /> */}
            {loading ? <Loader /> : <></>}
            <Modal title={`${data ? "Edit" : "Add"} New Service`} visible={isModalOpen} onCancel={CloseModel} footer={[<>
                {/* <Button type='primary' onClick={handleCancel} style={{ background: "#b78953" }}>Cancel</Button>  */}
                <Button type='primary' style={{ background: "#73787c" }} onClick={() => Save()} className="buttonHover">{data ? "Save Changes" : "Add"}</Button></>]}>
                <InputField
                    placeholder={"Parent Category"}
                    onChange={(e) => setParentCategory(e.target.value)}
                    value={parentCategory}
                />

                <InputField
                    placeholder={"Service Name"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <InputField
                    placeholder={"Unit Price"}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    value={unitPrice}
                    type={"number"}
                />
                <div style={{ marginTop: "10px", display: "flex", gap: 5, }}>
                    <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Option have?</label>
                    <div class="checkbox-wrapper-19" >
                        <input type="checkbox" id={"options"} checked={service} onChange={(value) => setService(value.target.checked)} />
                        <label for={"options"} class="check-box" />
                    </div>
                </div>
                {service ? <>{servicesOptions.map((option, index) => (
                    <div key={index}>
                        <InputField
                            placeholder={`Service Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}<Button className='add-more' onClick={handleAddServiceOption}>Add Service Option</Button> </> : null}

                <div style={{ marginTop: "10px", display: "flex", gap: 5, }}>
                    <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Color have?</label>
                    <div class="checkbox-wrapper-19" >
                        <input type="checkbox" id={"Servers"} checked={color} onChange={(value) => setColor(value.target.checked)} />
                        <label for={"Servers"} class="check-box" />
                    </div>
                </div>
                {color ? <>{colorOptions?.map((option, index) => (
                    <div key={index}>
                        <InputField
                            placeholder={`Color Option`}
                            value={option}
                            onChange={(e) => handleColorOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}

                    {/* <InputField
                        // label={"Color Option"}
                        placeholder={"Color Option"}
                        onChange={(e) => setColorOption(e.target.value)}
                        value={colorOption}
                    />
                    {colorError && <p style={{ color: "red" }}>{colorError}</p>} */}
                    <Button className='add-more' onClick={handleAddColorOption}>Add Color Option</Button></> : null}
                <div style={{ marginTop: "10px", display: "flex", gap: 5, }}>
                    <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Description have?</label>
                    <div class="checkbox-wrapper-19" >
                        <input type="checkbox" id={"description"} checked={description} onChange={(value) => setDescription(value.target.checked)} />
                        <label for={"description"} class="check-box" />
                    </div>
                </div>
            </Modal>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </>
    );
}

export default AddNewServicePopup;
