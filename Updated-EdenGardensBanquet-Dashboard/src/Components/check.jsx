import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Url } from "../../../env";
import Btn from "../../Btn";
import ErrorPopup from "../../ErrorPopup";
import EventPlannerAdditionalServices from "../../EventPlannerAdditionalServices";
import EventPlannerCustomSelection from "../../EventPlannerCustomeSelection";
import EventPlannerFoodOptions from "../../EventPlannerFoodOptions";
import EventPlannerOptions from "../../EventPlannerOptions";
import Loader from "../../Loader";
import LongDescriptionPopup from "../../LongDescriptionPopup";
import Radionbtn from "../../Radiobtn";
import SuccessPopup from "../../SuccessPopup";


const EventPlannerData = React.memo(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const [longPopup, setLongPopup] = useState(false)
    const [infoDetail, setInfoDetail] = useState("")
    const [services, setServices] = useState(location.state && location.state?.Services.map(e => e))
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [loader, setLoader] = useState(false)
    const [forceRerender, setForceRerender] = useState(false);
    const [itemState, setItemState] = useState({
        tableTop: {
            name: services[0]?.tableTop?.name || "",
            color: services[0]?.tableTop?.color || "",
            description: services[0]?.tableTop?.description || "",
            qty: services[0]?.tableTop?.qty || 0,
            unitPrice: services[0]?.tableTop?.unitPrice || 0,
            totalPrice: services[0]?.tableTop?.totalPrice || 0,
            remark: services[0]?.tableTop?.remark || "",
            status: services[0]?.tableTop?.status || "",
            addInvoice: services[0]?.tableTop?.addInvoice || false,
        },
        backdrops: {
            name: services[0]?.backdrops?.name || "",
            color: services[0]?.backdrops?.color || "",
            description: services[0]?.backdrops?.description || "",
            qty: services[0]?.backdrops?.qty || 0,
            unitPrice: services[0]?.backdrops?.unitPrice || 0,
            totalPrice: services[0]?.backdrops?.totalPrice || 0,
            remark: services[0]?.backdropss?.remark || "",
            status: services[0]?.backdrops?.status || "",
            addInvoice: services[0]?.backdrops?.addInvoice || false,
        },
    });
    const handleItemChange = useCallback((itemName, values) => {
        setForceRerender((prev) => !prev);
        setItemState((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                ...values,
            },
        }));
    }, [setForceRerender, setItemState]);
    const sections = [
        {
            title: "Event Decor and Furniture",
            items: [
                {
                    type: "customSelection",
                    value: itemState.tableTop.name,
                    colorValue: itemState.tableTop.color,
                    disabled: false,
                    qty: itemState.tableTop.qty,
                    Unit: itemState.tableTop.unitPrice,
                    Total: itemState.tableTop.totalPrice,
                    label: "Table Top",
                    selectDisabled: false,
                    descriptionDisabled: false,
                    descriptionValue: itemState.tableTop.description,
                    qtyDisabled: true,
                    priceDisabled: true,
                    remarkValue: itemState.tableTop.remark,
                    statusValue: itemState.tableTop.status,
                    onChange: (value) => handleItemChange("tableTop", { name: value }),
                    setDescription: (value) => handleItemChange("tableTop", { description: value }),
                    colorOnChange: (e) => handleItemChange("tableTop", { color: e }),
                    statusOnChange: (e) => handleItemChange("tableTop", { status: e }),
                    remarkOnChange: (e) => handleItemChange("tableTop", { remark: e }),
                },
                {
                    type: "customSelection",
                    value: itemState.backdrops.name,
                    colorValue: itemState.backdrops.color,
                    disabled: false,
                    qty: itemState.backdrops.qty,
                    Unit: itemState.backdrops.unitPrice,
                    Total: itemState.backdrops.totalPrice,
                    label: "Backdrops",
                    selectDisabled: false,
                    descriptionDisabled: false,
                    descriptionValue: itemState.backdrops.description,
                    qtyDisabled: true,
                    priceDisabled: true,
                    remarkValue: itemState.backdrops.remark,
                    statusValue: itemState.backdrops.status,
                    onChange: (value) => handleItemChange("backdrops", { name: value }),
                    setDescription: (value) => handleItemChange("backdrops", { description: value }),
                    colorOnChange: (e) => handleItemChange("backdrops", { color: e }),
                    statusOnChange: (e) => handleItemChange("backdrops", { status: e }),
                    remarkOnChange: (e) => handleItemChange("backdrops", { remark: e }),
                },

            ],
        },

    ];
    const Selection = React.memo(({ type, ...props }) => {
        switch (type) {
            case "customSelection":
                return <EventPlannerCustomSelection {...props} />;
            case "foodOptions":
                return <EventPlannerFoodOptions {...props} />;
            case "options":
                return <EventPlannerOptions {...props} />;
            case "additionalService":
                return <EventPlannerAdditionalServices {...props} />;
            case "radio":
                return <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <label
                        style={{
                            marginBottom: 5,
                            fontFamily: 'poppins !important',
                            color: '#73787c',
                            fontWeight: '500',
                            fontSize: "14px",
                            marginRight: "5px"
                        }}
                    >
                        {"Do you want to use Kitchen?"}
                    </label>
                    <Radionbtn {...props} />
                </div>;
            // Add more cases for other types of selections
            default:
                return null;
        }
    }, () => true)
    const handleCloseLongPopup = () => {
        setLongPopup(false)
        setInfoDetail("")
    }
    const save = () => {
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
            Services: itemState,
            summary: location.state.summary,
            venueCharges: location.state.venueCharges,
            stage: location.state.stage
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
                    setSuccessPopupMessage("Booking Update Successfully")
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
        navigate("/Event/event-planner")
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    
    const memoizedChild = useMemo(() => {
        return (
            sections.map((section, index) => {
                console.log(section);
                return (
                    <fieldset
                        key={index}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            border: "2px solid #73787c",
                            padding: "10px 25px",
                            borderRadius: "4px",
                            marginBottom: "10px",
                        }}
                    >
                        <legend
                            style={{
                                marginBottom: 10,
                                fontFamily: "poppins",
                                color: "#73787c",
                                fontWeight: "600",
                                fontSize: "20px",
                                marginLeft: 8,
                                width: section.title.length > 10 ? "23%" : `${section.title.length}%`,
                            }}
                        >
                            <span style={{ opacity: 0 }}>{index + 1}</span>
                            {section.title}
                        </legend>
                        {section.items.map((item, itemIndex) => (
                            <Selection key={itemIndex} {...item} />
                        ))}
                    </fieldset>
                )
            }))
    }, [sections]);
    return (
        <div className='add-booking-container'>
            {loader ? <Loader /> : null}
            <div className='input-wrapper'>
                {memoizedChild}
                    <div style={{
                        width: "100%",
                        marginTop: "10px"
                    }}>
                        <Btn htmlType="button" onClick={save} className="custom-hover-btn" label={"Save Booking"} />
                    </div>
            </div>
            <LongDescriptionPopup isModalOpen={longPopup} handleCancel={handleCloseLongPopup} heading={infoDetail} disabled={true} />
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div >
    )
})
export default React.memo(EventPlannerData)