import { Form } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Url } from "../../../env";
import Btn from "../../Btn";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import OrderSuppliesCustomTable from "../../OrderSuppliesCustomTable";
import SelectField from "../../SelectField";
import SuccessPopup from "../../SuccessPopup";
function OrderSuppliesData() {

    const [form] = Form.useForm();
    const location = useLocation()
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
    const [loader, setLoader] = useState(false)
    const [selectedValues, setSelectedValues] = useState(location.state && location.state?.Services)
    const [values, setValues] = useState(location.state && location.state?.Services)
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [formData, setFormData] = useState(location.state ? location.state?.custom : {});
    const [services, setAllService] = useState([]);
    const [vendors, setVendors] = useState([])

    useEffect(() => {

        const getAllServices = async () => {
            setLoader(true)
            try {
                const response = await fetch(`${Url}SettingService/Get`);
                const result = await response.json();
                console.log(result);
                setAllService(result.Services);
                setLoader(false)
            } catch (error) {
                setLoader(false)
                console.error('Error fetching data:', error);
            }
        };
        getAllServices();
    }, []);

    // Group services based on parentCategory
    const groupedServices = services?.reduce((acc, service) => {
        const category = service.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {});
    const save = () => {
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            firstName: location.state.firstName,
            lastName: location.state.lastName,
            email: location.state.email,
            phone: location.state.phone,
            zip: location.state.zip,
            city: location.state.city,
            state: location.state.state,
            venue: location.state.venue,
            selectedDate: location.state.selectedDate,
            selectedSlot: location.state.selectedSlot,
            eventType: location.state.eventType,
            minPerson: location.state.maxPerson,
            maxPerson: location.state.maxPerson,
            Status: location.state.Status,
            createAt: location.state.createAt,
            updated: location.state.updated,
            Services: selectedValues,
            summary: location.state.summary,
            venueCharges: location.state.venueCharges,
            stage: location.state.stage,
            custom: formData?.customTable ? formData?.customTable?.fields : formData,
            inventory: formData?.customTable?.fields?.length ? [...formData?.customTable?.fields, ...selectedValues] : [...location?.state?.custom, ...selectedValues]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}New-Booking/Edit/${location?.state?._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.updatedBooking) {
                    setSuccessPopupMessage("Order Supplies Update Successfully")
                    setSuccessPopupOpen(true)
                } else {
                    console.error("Invalid response format");
                    setErrorPopupOpen(true)
                    setErrorPopupMessage("Error in response format");
                }
                setLoader(false)
            })
            .catch(error => {
                setLoader(false)
                console.log('error', error)
            });
    }
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        navigate("/Order/order-supplies")
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    useEffect(() => {
        if (location.state && location.state.custom) {
            // Set the form data when editing
            form.setFieldsValue({ fields: location.state.custom });
        } else {
            return
        }
    }, [location.state])
    const handleCustomTableData = (customTableData) => {
        setFormData((prevData) => ({ ...prevData, customTable: customTableData }));
    };
    const updateSelectedValues = (category, service, field, value) => {
        // Create a new array with updated values
        const updatedServices = selectedValues.map(entry => {
            if (entry.category === category && entry.service === service && field === "orderSupliesStatus") {
                // Return a new object with the updated field and status
                return {
                    ...entry,
                    [field]: value,
                    status: value,
                };
            } else {
                return {
                    ...entry,
                    [field]: value,
                    // status: value,
                };
            }
            return entry; // Return the unchanged object for other entries
        });

        // Update the state with the new array reference
        setSelectedValues(updatedServices);
    };

    useEffect(() => {
        setLoader(true)
        const FetchVendors = () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Vendors/Get`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setVendors(result.Vendors)
                    // console.log(result);
                    setLoader(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoader(false)
                });
        }
        FetchVendors()
    }, [])
    console.log(selectedValues,formData, "selectedValues");

    return (
        <div className='add-booking-container'>
            {loader ? <Loader /> : null}
            <div className='input-wrapper'>
                {Object.entries(groupedServices).map(([category, categoryServices], index) => location.state.Services?.find((item) => item.category === category && item.status !== "Confirmed") && (
                    <fieldset
                        key={index}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: "start",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            // border: "2px solid #73787c",
                            padding: "10px 25px",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            backgroundColor: '#fff'
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 10,
                                fontFamily: 'poppins',
                                color: '#73787c',
                                fontWeight: '600',
                                fontSize: "20px",
                                marginLeft: -8,
                            }}
                        >
                            <span style={{ opacity: 0 }}>{index + 1}</span>
                            {category}
                        </div>
                        <div
                            style={{
                                width: "100%",
                                marginBottom: 15,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                // gap: 5
                            }}
                        >
                            {categoryServices.map((service, serviceIndex) => {
                                const selectedItem = location.state.Services?.find((item) => item.category === category && item.service === service.name);
                                if (selectedItem && selectedItem.status !== "Confirmed") {
                                    return (
                                        <div key={serviceIndex} style={{ width: "100%" }}>
                                            <div style={{
                                                width: "100%",
                                                marginBottom: 15,
                                                display: "flex",
                                                flexDirection: 'column',
                                                // alignItems: "center",
                                                // justifyContent: "space-between",
                                                // gap: 15
                                            }}>
                                                <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 15 }}>
                                                    <SelectField
                                                        label={service.name}
                                                        placeholder={service.name}
                                                        options={service.attributes.map(attribute => ({
                                                            value: attribute.type,
                                                            label: attribute.type
                                                        }))}
                                                        width={"35%"}
                                                        value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.name || ""}
                                                        onChange={(value) => {
                                                            let filterData = service.attributes.filter(e => e.type === value);
                                                            const description = filterData[0].description;
                                                            const price = filterData[0].unitPrice;
                                                            updateSelectedValues(category, service.name, 'name', value)

                                                        }}
                                                        disabled={true}
                                                    />
                                                    <InputField
                                                        label="Description"
                                                        placeholder="Description"
                                                        width={"35%"}
                                                        type="text"
                                                        value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.description}
                                                        onChange={(value) =>
                                                            updateSelectedValues(category, service.name, 'description', value.target.value)
                                                        }
                                                        disabled={true}
                                                    />
                                                    <SelectField
                                                        label="Color"
                                                        placeholder="Color"
                                                        value={selectedValues.find((item) => item.category === category && item.service === service.name)?.color || ""}
                                                        options={service.attributes.find(attribute => selectedValues.find((item) => item.category === category && attribute.type === item.name))?.color.map(option => ({
                                                            value: option,
                                                            label: option
                                                        }))}
                                                        width={"15%"}
                                                        onChange={(value) =>
                                                            updateSelectedValues(category, service.name, 'color', value)
                                                        }
                                                        disabled={true}
                                                    />
                                                    <InputField
                                                        label="Qty"
                                                        placeholder="Qty"
                                                        width={"15%"}
                                                        type="number"
                                                        value={selectedValues.find((item) => item.category === category && item.service === service.name)?.qty || ""}
                                                        onChange={(e) => {
                                                            const input = e.target.value;
                                                            if (/^\d+$/.test(input) || input === "") {
                                                                updateSelectedValues(category, service.serviceName, 'qty', input)
                                                            }
                                                        }}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div style={{ display: "flex", width: "100%", gap: 15 }}>
                                                    
                                                    <InputField
                                                        label="Unit Price"
                                                        placeholder="Unit Price"
                                                        width={"20%"}
                                                        type="number"
                                                        disabled={true}
                                                        value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.price}
                                                        onChange={(e) => {
                                                            const input = e.target.value;
                                                            if (/^\d+$/.test(input) || input === "") {
                                                                updateSelectedValues(category, service.name, 'price', input);
                                                            }
                                                        }}
                                                    />

                                                    <InputField
                                                        label="Total Price"
                                                        placeholder="Total Price"
                                                        width={"20%"}
                                                        disabled={true}
                                                        value={
                                                            selectedValues?.find((item) =>
                                                                item.category === category && item.service === service.name
                                                            )?.totalPrice
                                                        }
                                                    />
                                                    <SelectField
                                                        label="Status"
                                                        placeholder="Status"
                                                        options={[
                                                            { value: 'Confirmed', label: 'Confirmed' },
                                                            { value: 'Not Available', label: 'Not Available' },
                                                            // { value: 'Issue', label: 'Issue' },
                                                        ]}
                                                        width={"20%"}
                                                        value={selectedValues.find((item) => item.category === category && item.service === service.name)?.status}
                                                        onChange={(e) => {
                                                            updateSelectedValues(category, service.name, 'status', e);

                                                        }}
                                                        disabled={true}
                                                    />
                                                    <SelectField
                                                        label="Order Supplies"
                                                        placeholder="Order Supplies"
                                                        options={[
                                                            { value: 'Confirmed', label: 'Confirmed' },
                                                            { value: 'Not Available', label: 'Not Available' },
                                                            // { value: 'Issue', label: 'Issue' },
                                                        ]}
                                                        width={"20%"}
                                                        // disabled={selectedValues.find((item) => item.category === category && item.service === service.name)?.status === "Confirmed"}
                                                        value={selectedValues.find((item) => item.category === category && item.service === service.name)?.orderSupliesStatus}
                                                        onChange={(e) => {
                                                            updateSelectedValues(category, service.name, 'orderSupliesStatus', e);
                                                            // updateSelectedValues(category, service.name, 'status', e);

                                                        }}
                                                    // disabled={true}
                                                    />
                                                    <SelectField
                                                        label="Vendors"
                                                        placeholder="Vendors"
                                                        options={vendors.map((e) => ({
                                                            value: e.name, label: e.name
                                                        }))}
                                                        width={"20%"}
                                                        // disabled={selectedValues.find((item) => item.category === category && item.service === service.name)?.status === "Confirmed"}
                                                        value={selectedValues.find((item) => item.category === category && item.service === service.name)?.vendors}
                                                        onChange={(e) => {
                                                            updateSelectedValues(category, service.name, 'vendors', e);
                                                            // updateSelectedValues(category, service.name, 'status', e);

                                                        }}
                                                    // disabled={true}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Render nothing for items with status "Confirmed"
                            })}

                        </div>
                    </fieldset>
                ))}
                {location.state.custom.length && location.state.custom.find(item => item.status !== "Confirmed") ? (<OrderSuppliesCustomTable vendors={vendors} onDataChange={handleCustomTableData} form={form} />) : <></>}
                <div style={{
                    width: "100%",
                    marginTop: "10px"
                }}>
                    <Btn htmlType="button" onClick={save} className="custom-hover-btn" label={"Save"} />
                </div>
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default OrderSuppliesData