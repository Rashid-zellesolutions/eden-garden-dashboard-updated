import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import LongDescriptionPopup from "../LongDescriptionPopup";
import SelectField from "../SelectField";
import TextAreaField from "../TextAreaField";   
import './module.viewAllBookingData.css'

function ViewAllBookingData() {

    // Media Query to make Labels Responsive

    // const StyledLabel = label`
    //     font-family: 'Poppins', sans-serif;
    //     font-weight: 500;
    //     color: black;
    //     font-size: 10px;

    //     @media (min-width: 1250px) {
    //         font-size: 14px;
    //     }
    // `;

    

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
    const [longPopup, setLongPopup] = useState(false)
    const [infoDetail, setInfoDetail] = useState("")
    const [status, setStatus] = useState(location?.state ? location?.state?.Status : "")
    const [note, setNote] = useState(location?.state ? location?.state?.note : "")
    const handleCloseLongPopup = () => {
        setLongPopup(false)
        setInfoDetail("")
    }
    const OpenLongPopup = (value) => {
        if (value) {
            setLongPopup(true)
            setInfoDetail(value)
        }
    }
    const [services, setServices] = useState(location.state && location.state?.Services)

    const groupedServices = services.reduce((acc, service) => {
        const category = service.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {});
    // const mergeConsecutiveSlots = (selectedSlot) => {
    //     const mergedSlots = [];
    //     let currentSlot = selectedSlot && selectedSlot[0];

    //     for (let i = 1; i < selectedSlot?.length; i++) {
    //         const currentTime = currentSlot.split(' - ')[1]; // Extract end time of current slot
    //         const nextTime = selectedSlot[i].split(' - ')[0]; // Extract start time of the next slot

    //         // Check if the next slot is consecutive to the current slot
    //         if (currentTime === nextTime) {
    //             currentSlot = `${currentSlot.split(' - ')[0]} - ${selectedSlot[i].split(' - ')[1]}`;
    //         } else {
    //             mergedSlots.push(currentSlot);
    //             currentSlot = selectedSlot[i];
    //         }
    //     }

    //     // Add the last slot
    //     mergedSlots.push(currentSlot);

    //     return mergedSlots;
    // };
    const mergeConsecutiveSlots = (selectedSlot) => {
        const mergedSlots = [];
        const sortedSlots = location.state?.selectedSlot?.sort((a, b) => {
            const timeMap = {
                "08:00 AM - 10:00 AM": 1,
                "10:00 AM - 12:00 PM": 2,
                "12:00 PM - 02:00 PM": 3,
                "02:00 PM - 04:00 PM": 4,
                "04:00 PM - 06:00 PM": 5,
                "06:00 PM - 08:00 PM": 6,
            };

            return timeMap[a] - timeMap[b];
        });
        let currentSlot = sortedSlots && sortedSlots[0];

        for (let i = 1; i < sortedSlots?.length; i++) {
            const currentTime = currentSlot.split(' - ')[1]; // Extract end time of current slot
            const nextStartTime = sortedSlots[i].split(' - ')[0]; // Extract start time of the next slot

            // Check if the next slot is consecutive to the current slot
            if (currentTime === nextStartTime || (i + 1 < sortedSlots.length && currentTime === sortedSlots[i + 1].split(' - ')[0])) {
                currentSlot = `${currentSlot.split(' - ')[0]} - ${sortedSlots[i].split(' - ')[1]}`;
            } else {
                // Format the slot and then check for consecutive slots
                mergedSlots.push(formatSlot(currentSlot));
                currentSlot = sortedSlots[i];
            }
        }

        // Add the last slot if it is consecutive
        if (currentSlot !== mergedSlots[mergedSlots.length - 1]) {
            mergedSlots.push(formatSlot(currentSlot));
        }

        return mergedSlots;
    };



    const formatSlot = (slot) => {
        // Add your formatting logic here
        // For example, you can check if the slot is in the format "12:00 PM - 02:00 PM" and modify it accordingly
        // You can customize this part based on your specific formatting requirements
        return slot;
    };


    const textAreasConfig = [
        {
            showCount: false,
            maxLength: 10,
            placeholder: `Note`,
            label: `Note`,
            height: 45,
            resize: true,
            width: "100%",
        },
    ];

    return (
        <div className='add-booking-container'>
            <div className='input-wrapper'>
                <fieldset style={{
                    width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap", backgroundColor: '#fff',
                    padding: "10px 25px",
                    borderRadius: "4px",
                    marginBottom: "10px"
                }}>
                    <div
                        className="headings"
                        style={{
                            marginBottom: 10,
                            fontFamily: 'poppins',
                            color: '#73787c',
                            fontWeight: '600',
                            fontSize: "20px",
                            marginLeft: -8,
                        }}
                    >
                        <span style={{ opacity: 0 }}>{"1"}</span> {"Event Info"}
                    </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <InputField placeholder={"No of Person*"} label={"No of Person*"} width={"24%"} value={location.state?.maxPerson} type={"number"} disabled={true} />

                    <InputField placeholder={"Event Type"} label={"Event Type"} width={"24%"} value={location.state?.eventType} disabled={true} />

                        <div style={{ display: 'flex', flexDirection: 'column', width: "24%" }}>
                            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                <label className="input-labels" style={{fontFamily: 'poppins', fontWeight: '500', color: "#73787c"}}>{"Venue Selection"}</label>
                                <p style={{ background: "rgb(255 255 255 / 56%)", borderRadius: "12px", padding: "10px", fontSize: "10px" }}>{location?.state?.capacity}</p>
                            </div>
                            <Select disabled={true}
                                style={{
                                    width: "100%",
                                    marginBottom: 24,
                                    borderColor: "#b78953 !important",
                                    backgroundColor: "#fff !important"
                                }}
                                placeholder="Select Venue"
                                options={[
                                    { value: 'Ruby + Emerald', label: 'Ruby + Emerald ' },
                                    { value: 'Emerald', label: 'Emerald ' },
                                    { value: 'Diamond', label: 'Diamond ' },
                                    { value: 'Ruby', label: 'Ruby ' },
                                    { value: 'Jade', label: 'Jade ' },
                                ]}
                                width={"30%"}
                                value={location.state?.venue}
                                mode="multiple"
                                className="checkColor"

                            />
                        </div>
                        <SelectField
                            label="Stage*"
                            placeholder="Stage"
                            options={[
                                { value: 'Small', label: 'Small' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Large', label: 'Large' },
                            ]}
                            width={"24%"}
                            value={location.state?.stage}
                            disabled={true}
                        />
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: '15px' }}>
                        <SelectField label={"Venue Amount By"} placeholder={"Venue Amount By"} width={"14%"}
                            options={[{ value: "fixed amount", label: "Fixed Amount" }, { value: "no of person", label: "No. of Person" }]} disabled={true} value={location.state.venueUnitPrice ? "No. of Person" : "Fixed Amount"} />
                        {location.state?.venueUnitPrice ? <div style={{ display: "flex", alignItems: "center", gap: '15px' }}>
                            <InputField placeholder={"No of Person"} label={"No of Person"} width={"25%"} value={location.state?.maxPerson} type={"number"} disabled={true} />
                            <InputField placeholder={"Unit Price"} label={"Unit Price"} width={"25%"} value={location.state.venueUnitPrice} type={"number"} disabled={true} />
                            <InputField placeholder={"Venue Total Price"} label={"Venue Total Price"} width={"25%"} disabled={true} value={location.state.venueCharges} type={"number"} />
                        </div> :
                            <InputField placeholder={"Venue Charges"} label={"Venue Charges"} width={"13%"} type={"number"} value={location.state.venueCharges} disabled={true} />
                        }
                    </div>
                    <div style={{ width: "65%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '10px' }}>
                        <div style={{ width: "45%" }}>
                            <label
                                style={{
                                    marginBottom: 5,
                                    fontFamily: 'poppins !important',
                                    color: '#73787c',
                                    fontWeight: '500',
                                    fontSize: "14px"
                                }}
                            >
                                {"Date and Time Slot"}
                            </label>
                            <div style={{ boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", borderRadius: 8, backgroundColor: "#fff" }}>

                                <div >
                                    <p style={{ fontSize: "14px", color: "#000000e0", padding: "10px", cursor: "pointer" }}>
                                        {/* {`${location.state?.selectedDate} / ${sortedSlots.join(", ")}`} */}
                                        {`${location.state?.selectedDate} / ${mergeConsecutiveSlots(location.state?.selectedSlot)}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </fieldset>

                <fieldset style={{
                    width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap",
                    padding: "10px 25px",
                    borderRadius: "4px",
                    marginBottom: "23px",
                    marginTop: '13px',
                    backgroundColor: '#fff'
                }}>
                    <div
                        className="headings"
                        style={{
                            marginBottom: 10,
                            fontFamily: 'poppins',
                            color: '#73787c',
                            fontWeight: '600',
                            fontSize: "20px",
                            marginLeft: -8,
                        }}
                    >
                        <span style={{ opacity: 0 }}>{"1"}</span>

                        {"Customer Info"}
                    </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 15}}>
                    <div style={{display: 'flex' , gap: 15}}>
                    <InputField placeholder={"First Name*"} label={"First Name*"} width={"32.5%"} value={location.state?.firstName} disabled={true} />
                    <InputField placeholder={"last Name*"} label={"Last Name*"} width={"32.5%"} value={location.state?.lastName} disabled={true} />
                    <InputField placeholder={"Email*"} label={"Email*"} width={"32.5%"} value={location.state?.email} disabled={true} />
                    </div>
                    <div style={{display: 'flex', width: '100%', gap: 15}}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "50%" }}>

                        <label
                            className="input-labels"
                            style={{
                                marginBottom: 5,
                                fontFamily: 'poppins !important',
                                color: '#73787c',
                                fontWeight: '500',
                                fontSize: "14px"
                            }}
                        >
                            {"Phone Number*"}
                        </label>

                        <Input
                            className="custom-input phone-number-input"
                            style={{
                                width: "100%",
                                height: 35,
                                marginBottom: 15,
                                background: "#fff"
                            }}
                            placeholder={"Phone Number*"}
                            value={location.state?.phone}
                            type={"number"} disabled={true}
                        />
                    </div>
                    <InputField placeholder={"Zip*"} label={"Zip*"} width={"15%"} value={location.state?.zip} disabled={true} />
                    <InputField placeholder={"City*"} label={"City*"} width={"22%"} value={location.state?.city} disabled={true} />
                    <InputField placeholder={"State*"} label={"State*"} width={"22%"} value={location.state?.state} disabled={true} />
                </div>
                </div>
                </fieldset>

                
                {
                    Object.entries(groupedServices).map(([category, categoryServices], index) => (
                        <fieldset
                            key={index}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "start",
                                flexDirection: 'column',
                                flexWrap: "wrap",
                                padding: "10px 25px",
                                borderRadius: "4px",
                                marginBottom: "23px",
                                backgroundColor: '#fff'
                            }}
                        >
                            <div
                                className="headings"
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
                            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                                {categoryServices.map((service, serviceIndex) => (
                                    <div key={serviceIndex} style={{ width: "100%", display: "flex", gap: 15 }}>
                                        {service.service && (
                                            <SelectField
                                                label={service.service}
                                                placeholder={service.service}
                                                width={"32.5%"}
                                                defaultValue={service.name}
                                                disabled={true}
                                            />
                                        )}
                                        {service.description && (
                                            <InputField
                                                label="Description"
                                                placeholder="Description"
                                                width={"32.5%"}
                                                type="text"
                                                disabled={true}
                                                defaultValue={service?.description}
                                            />
                                        )}
                                        {service.color && (
                                            <SelectField
                                                label="Color"
                                                placeholder="Color"
                                                disabled={true}
                                                defaultValue={service?.color}
                                                width={"32.5%"}
                                            />
                                        )}
                                        {service.qty && (
                                            <InputField
                                                label="Qty"
                                                placeholder="Qty"
                                                width={"22%"}
                                                type="number"
                                                disabled={true}
                                                defaultValue={service?.qty}
                                            />
                                        )}
                                        {service.price && (
                                            <InputField
                                                label="Unit Price"
                                                placeholder="Unit Price"
                                                width={"38%"}
                                                type="number"
                                                disabled={true}
                                                defaultValue={service?.price}
                                            />
                                        )}
                                        {service.totalPrice && (
                                            <InputField
                                                label="Total Price"
                                                placeholder="Total Price"
                                                width={"38%"}
                                                disabled={true}
                                                value={service?.totalPrice}
                                            />
                                        )}
                                        {service.Invoice && (
                                            <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                                                <label className="input-labels" style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>Invoice</label>
                                                <div className="checkbox-wrapper-19" style={{ marginTop: "10px" }}>
                                                    <input
                                                        type="checkbox"
                                                        id={service.service}
                                                        disabled={true}
                                                        defaultChecked={service?.Invoice}
                                                    />
                                                    <label htmlFor={service.service} className="check-box" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    ))
                }

                {
                    location.state.custom.length ? <fieldset

                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "start",
                            flexDirection: 'column',
                            justifyContent: "center",
                            // flexWrap: "wrap",
                            // border: "2px solid #73787c",
                            padding: "10px 25px",
                            // borderRadius: "4px",
                            marginBottom: "10px"
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 10,
                                fontFamily: 'poppins',
                                color: '#73787c',
                                fontWeight: '600',
                                fontSize: "20px",
                                // marginLeft: -8,
                            }}
                        >
                            <span style={{ opacity: 0 }}></span>
                            {"Custom"}
                        </div>
                        {/* <div> */}
                        <div
                            style={{
                                width: "100%",
                                marginBottom: 15,
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "space-between",
                                // flexWrap: 'wrap',
                                gap: 5
                            }}
                        >
                            {location.state?.custom?.map((service, serviceIndex) => (
                                <div key={serviceIndex} style={{ width: "100%" }}>
                                    <div style={{
                                        width: "100%",
                                        marginBottom: 15,
                                        display: "flex",
                                        alignItems: "center",
                                        // justifyContent: "space-between",
                                        gap: 15
                                    }}>
                                        {/* <div style={{ width: "55%", display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
                                        <SelectField
                                            label={service.name}
                                            placeholder={service.name}

                                            width={"35%"}
                                            defaultValue={service.name}
                                            disabled={true}
                                        />
                                        {/* </div>
                                        <div style={{ display: "flex", width: "40%", gap: 5 }}> */}
                                        <InputField
                                            label="Qty"
                                            placeholder="Qty"
                                            width={"15%"}
                                            type="number"
                                            disabled={true}
                                            defaultValue={service?.qty}

                                        />
                                        <InputField
                                            label="Unit Price"
                                            placeholder="Unit Price"
                                            width={"25%"}
                                            type="number"
                                            disabled={true}
                                            defaultValue={service?.price}
                                        />

                                        <InputField
                                            label="Total Price"
                                            placeholder="Total Price"
                                            width={"25%"}
                                            disabled={true}
                                            value={service?.totalPrice}
                                        />
                                        <div style={{ alignItems: "center", display: "flex", gap: 5, flexDirection: "column", }}>
                                            <label className="input-labels" style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Invoice</label>
                                            <div className="checkbox-wrapper-19" style={{ marginTop: "10px" }}>
                                                <input
                                                    type="checkbox"
                                                    id={service.name}
                                                    disabled={true}
                                                    defaultChecked={service?.Invoice}
                                                // onChange={(e) => updateSelectedValues(category, service.serviceName, 'Invoice', e.target.checked)}
                                                />
                                                <label htmlFor={service.name} className="check-box" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // </div>
                            ))}
                        </div>
                        {/* </div> */}
                    </fieldset> : <></>
                }
                <div style={{ width: "100%", display: "flex", gap: 15, backgroundColor: '#fff', padding: 25, marginBottom: '23px' }}>
                    <SelectField disabled={true} options={[{ label: "In Process", value: "In Process" }, { label: "Hold", value: "Hold" }]} label={"Status"} width={"20%"} value={status} onChange={(e) => setStatus(e)} />
                    <TextAreaField
                        className="input-labels"
                        placeholder='Note'
                        // label="Hello"
                        textAreas={textAreasConfig}
                        width={"80%"}
                        value={note}
                        // onChange={(e) => setNote(e.target.value)}
                        disabled={true}
                    // disabled={disabled}
                    />
                </div>
                <div style={{
                    width: "100%",
                    marginBottom: '23px',
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    backgroundColor: '#fff',
                    padding: 25
                }}>
                    <div style={{ display: "flex", width: "100%", gap: 15}}>
                        <SelectField label={"Discount Type"} placeholder={"Discount Type"} width={"20%"} disabled={true}
                            options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={location.state.summary?.discountType} />
                        <InputField
                            label={"Discount Value"}
                            // placeholder={disocuntType === "+" ? "$ Discount Value" : "Discount Value %"}
                            width={"20%"}
                            type="number"
                            value={location.state.summary?.discount}
                            disabled={true}
                        />

                        <SelectField label={"Tip Type"} placeholder={"Tip Type"} width={"20%"} disabled={true}
                            options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={location.state.summary?.tipType} />
                        <InputField
                            label={"Tip"}
                            placeholder={"$ Tip"}
                            width={"20%"}
                            type="number"
                            value={location.state.summary?.tip}
                            disabled={true}
                        />
                        <InputField
                            label={"Tax"}
                            placeholder={"Tax "}
                            width={"20%"}
                            type="number"
                            value={location.state.summary?.tax}
                            disabled={true}
                        />
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 15 }}>

                    <div style={{
                        display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", borderRadius: "5px",
                        marginBottom: 10, justifyContent: "space-between"
                    }}>

                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "400"
                        }}>Sub Total </p>
                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                        }}>{"$"}{location.state.summary?.subTotal}</p>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                    }}>

                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "400"
                        }}>Tip</p>
                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                        }}>{location.state.summary?.tipType !== "%" ? "$" : ""}{location.state.summary?.tip}{location.state.summary?.tipType === "%" ? "%" : ""}</p>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                    }}>

                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "400"
                        }}>Tax </p>
                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                        }}>  {location.state.summary?.tax}%</p>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                    }}>

                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "400"
                        }}>Discount </p>
                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                        }}> {location.state.summary?.discountType !== "%" ? "$" : ""}{location.state.summary?.discount}{location.state.summary?.discountType === "%" ? "%" : ""}</p>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", marginRight: 10, marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                    }}>

                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "600"
                        }}>Total </p>
                        <p 
                        className="input-labels"
                        style={{
                            color: "rgba(0, 0, 0, 0.88)",
                            fontFamily: "Poppins",
                            fontWeight: "600"
                        }}> ${location.state.summary?.total}</p>
                    </div>
                </div>
            </div >
            <LongDescriptionPopup isModalOpen={longPopup} handleCancel={handleCloseLongPopup} heading={infoDetail} disabled={true} />
        </div >
    )
}
export default ViewAllBookingData