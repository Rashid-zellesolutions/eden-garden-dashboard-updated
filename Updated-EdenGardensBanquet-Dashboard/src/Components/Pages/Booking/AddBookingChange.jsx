import { Button, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import { Url } from "../../../env";
import AddBookingServices from "../../AddBookingServices";
import AddCustomTable from "../../AddCustomTable";
import Btn from "../../Btn";
import CalendarModal from "../../CalendarModal";
import ErrorPopup from "../../ErrorPopup";
import InputField from "../../InputField";
import Loader from "../../Loader";
import LongDescriptionPopup from "../../LongDescriptionPopup";
import NotRemove from "../../NotRemove";
import "../../Pages/PageComponent.css";
import ProceedWarning from "../../ProceedWarning";
import SelectField from "../../SelectField";
import SelectWarningPopup from "../../SelectWarningPopup";
import SuccessPopup from "../../SuccessPopup";
import WarningPopup from "../../WarningPopup";
import TextAreaField from "../../TextAreaField";
import CheckBox1 from "../../CheckBox/checkBox";

function AddBooking() {
    const [form] = Form.useForm();
    const location = useLocation()
    const navigate = useNavigate()
    const username = JSON.parse(localStorage.getItem("data"))
    const { SinglePayment, balance, GetAllEventType, event, GetAllStage, stages, GetAllVenues, allVenues, } = useBookingContext()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    useEffect(() => {
        GetAllEventType()
        GetAllStage()
        GetAllVenues()
    }, [])
    useEffect(() => {
        if (location.state && location.state.custom) {
            // Set the form data when editing
            form.setFieldsValue({ fields: location.state.custom });
        } else {
            return
        }
    }, [location.state])
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const { booking, setBooking } = useBookingContext();

    const [warnigPopup, setWarningPopup] = useState(false)
    const [proceedWarnig, setProceedWarning] = useState(false)
    const [selectWarnig, setSelectWarning] = useState(false)
    const [longPopup, setLongPopup] = useState(false)
    const [infoDetail, setInfoDetail] = useState("")
    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState(location?.state ? location?.state?.firstName : "")
    const [lastName, setLastName] = useState(location?.state ? location?.state?.lastName : "")
    const [email, setEmail] = useState(location?.state ? location?.state?.email : "")
    const [phone, setPhone] = useState(location?.state ? location?.state?.phone : "")
    const [zip, setZip] = useState(location?.state ? location?.state?.zip : "")
    const [city, setCity] = useState(location?.state ? location?.state?.city : "")
    const [state, setState] = useState(location?.state ? location?.state?.state : "")
    const [status, setStatus] = useState(location?.state ? location?.state?.Status === "Opened" ? "Hold" : location?.state?.Status : "")
    const [note, setNote] = useState(location?.state ? location?.state?.note : "")
    const [venue, setVenue] = useState(() => {
        const initialVenue = location?.state ? location?.state?.venue : [];

        if (typeof initialVenue === 'string') {
            // Convert the string to an array
            return [initialVenue];
        }

        // Use the initial value as is (array or undefined)
        return initialVenue;
    });
    const [selectedDate, setSelectedDate] = useState(() => location?.state ? location?.state?.selectedDate : dayjs(Date.now()));

    const [selectedSlot, setSelectedSlot] = useState(location?.state ? location?.state?.selectedSlot ? location?.state?.selectedSlot : [] : []);
    const [maxPerson, setMaxPerson] = useState(location?.state ? location?.state?.maxPerson : "")
    const [eventType, setEventType] = useState(location?.state ? location?.state?.eventType : "")
    const [currentVenueIndex, setCurrentVenueIndex] = useState(0);
    // const [kitchenUse, setKitchenUse] = useState(location.state ? location.state?.Services ? location.state?.Services[0].kitchen : "" : "no");
    const [stage, setStage] = useState(location.state ? location.state.stage : "")
    const [disocuntType, setDiscountType] = useState(location.state ? location.state.summary ? location.state.summary.discountType : "" : "%")
    const [disocuntValue, setDiscountValue] = useState(location.state ? location.state.summary ? location.state.summary.discount : "" : "")
    const [tax, setTax] = useState("6.625")
    const [tip, setTip] = useState(location.state ? location.state.summary ? location.state.summary.tip : "" : "")
    const [tipType, setTipType] = useState(location.state ? location.state.summary ? location.state.summary.tipType : "" : "%")
    const discountNumber = Number(disocuntValue)
    const taxNumber = Number(tax)
    const tipNumber = Number(tip)

    const [paymentType, setPaymentType] = useState(location.state ? location.state?.venueUnitPrice ? "no of person" : "fixed amount" : "")
    const [venueCharges, setVenueCharges] = useState(location.state ? location.state.venueCharges : 0)
    const [venueUnitPrice, setVenueUnitPrice] = useState(location.state ? location.state.venueUnitPrice : 0)
    const venueTotalCharges = paymentType === "no of person" ? maxPerson * venueUnitPrice : paymentType === "fixed amount" ? venueCharges : null
    const chargesIntoNumber = Number(venueTotalCharges)
    const [formData, setFormData] = useState(location.state ? location.state.custom : {});
    const [selectedValues, setSelectedValues] = useState(location.state ? location.state?.Services ? location.state?.Services : [] : []);

    const calculateCustomDataTotal = (customData) => {
        return customData?.length ? customData?.reduce((total, item) => total + item?.totalPrice, 0) : 0;
    };
    const customDataTotal = calculateCustomDataTotal(formData?.customTable ? formData?.customTable?.fields : formData);
    const serviceTotal = calculateCustomDataTotal(selectedValues);
    // const KitchenPrice = kitchenUse === "yes" ? 1000 : 0
    const subTotal = (chargesIntoNumber) + (serviceTotal || 0) + (customDataTotal || 0)
    const finalDicountValue = disocuntType === "%" ? (discountNumber / 100) * subTotal : discountNumber
    const finalTipValue = tipType === "%" ? (tipNumber / 100) * subTotal : tipNumber
    const DiscountToTip = subTotal - finalDicountValue + finalTipValue
    const FinalTax = (taxNumber / 100) * DiscountToTip
    const subTotalToDsicount = DiscountToTip + FinalTax

    const [isInternal, setIsInternal] = useState(false);
    function settingInternal() {
        if (isInternal===true) {
            setIsInternal(false);
        }else{
            setIsInternal(true);
        }
        console.log(isInternal);
    }

    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
        if (successPopupMessage === "Booking Add Successfully") {
            // window.location.reload()
            return
        }
        navigate("/Booking/all-booking")
    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    useEffect(() => { SinglePayment(location.state?._id) }, [location.state])
    let summary = {
        subTotal: subTotal,
        tip: tip || 0,
        tax: tax || 0,
        discount: disocuntValue || 0,
        total: subTotalToDsicount,
        discountType: disocuntType,
        tipType: tipType
    }
    const save = (event) => {
        setLoader(true)
        if (!location.state) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const formatTime = location.state ? selectedDate : selectedDate.format('YYYY-MM-DD');
            // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
            var raw = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                zip: zip,
                city: city,
                state: state,
                venue: venue,
                selectedDate: formatTime,
                selectedSlot: selectedSlot,
                eventType: eventType,
                minPerson: maxPerson,
                maxPerson: maxPerson,
                createAt: username.username,
                Services: selectedValues,
                summary,
                venueCharges: venueTotalCharges,
                stage: stage,
                capacity: totalCapacity,
                venueUnitPrice: paymentType === "fixed amount" ? 0 : venueUnitPrice,
                custom: formData?.customTable?.fields,
                inventory: formData?.customTable?.fields ? [...formData?.customTable?.fields, ...selectedValues] : [...selectedValues],
                note: note,
                Status: status,
                isInternal: isInternal
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}New-Booking/Add`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status === 200) {
                        setSuccessPopupMessage("Booking Add Successfully")
                        setSuccessPopupOpen(true)
                        // Reset your state here
                        setEmail("")
                        setPhone("")
                        setZip("")
                        setCity("")
                        setState("")
                        setEventType("")
                        setSelectedDate("")
                        setSelectedSlot([])
                        setVenue([])
                        setMaxPerson("")
                        setFormData({})
                        setSelectedValues([])
                        form.resetFields()
                    } else {
                        setErrorPopupOpen(true)
                        setErrorPopupMessage(result.message);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    setLoader(false)
                    console.log('error', error)
                });
        } else {
            // console.log([...location?.state?.custom, ...selectedValues]);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const formatTime = location.state ? regex.test(selectedDate) ? selectedDate : selectedDate.format('YYYY-MM-DD') : selectedDate?.format('YYYY-MM-DD')
            var raw = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                zip: zip,
                city: city,
                state: state,
                venue: venue,
                selectedDate: formatTime,
                selectedSlot: selectedSlot,
                eventType: eventType,
                minPerson: maxPerson,
                maxPerson: maxPerson,
                Status: balance ? balance === 0 ? status : "Confirmed" : status,
                createAt: location?.state.createAt ? location?.state.createAt : username.username,
                updated: username.username,
                Services: selectedValues,
                summary,
                venueCharges: venueTotalCharges,
                stage: stage,
                capacity: totalCapacity,
                venueUnitPrice: venueUnitPrice,
                custom: formData?.customTable?.fields,
                inventory: formData?.customTable?.fields?.length ? [...formData?.customTable?.fields, ...selectedValues] : location?.state?.custom ? [...location?.state?.custom, ...selectedValues] : [...selectedValues],
                note: note,
                isInternal: isInternal
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
                        setBooking((prevBooking) =>
                            prevBooking.map((booking) =>
                                booking._id === location.state._id ? result.updatedBooking : booking
                            )
                        );
                    } else {
                        console.error("Invalid response format");
                        setErrorPopupOpen(true)
                        setErrorPopupMessage(result.message);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    setLoader(false)
                    console.log('error', error)
                });
        }
    }
    const [editIndex, setEditIndex] = useState(null)
    const handleCustomTableData = (customTableData) => {
        setFormData((prevData) => ({ ...prevData, customTable: customTableData }));
    };
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        // setIsModalOpen(false)
        const isAnyVenueMissingData = !selectedDate || !selectedSlot;

        if (isAnyVenueMissingData) {
            setSelectWarning(true)
        } else {
            // Close the modal if all venues have the required information
            setIsModalOpen(false);
            setEditIndex(null)
        }
    }
    const handleCloseSelectWarning = () => {
        setSelectWarning(false)
    }
    const handleCancelWarning = () => {
        setWarningPopup(false)
    }
    const [proceedState, setProceedState] = useState(false)
    const Proceed = () => {
        if (!maxPerson || !eventType || !venue || !selectedDate || !selectedSlot.length || !stage) {
            // toast.error("Please Fill All Event info")
            setProceedState(false)
            setProceedWarning(true)
        } else {
            setProceedState(true)
        }
    }
    const handleCloseProceedPopup = () => {
        setProceedWarning(false)
    }
    const handleCloseLongPopup = () => {
        setLongPopup(false)
        setInfoDetail("")
    }
    const [notRemoveModal, setRemoveModal] = useState(false)
    const handleNotRemoveModal = () => {
        setRemoveModal(false)
    }
    const [totalCapacity, setTotalCapacity] = useState(location.state ? location?.state?.capacity : 0);

    const onSelectVenue = (selectedVenues, index) => {
        setVenue([selectedVenues]);
        setSelectedDate([])
        setSelectedSlot([])

    };
    const [bookingEditIndex, setBookingEditIndex] = useState(null)
    const handleEditVenue = (index, v) => {
        const venueIndex = venue.findIndex((venues) => venues === v);
        const currentDate = new Date();
        const eventDate = new Date(selectedDate);
        const daysDifference = Math.ceil((eventDate - currentDate) / (24 * 60 * 60 * 1000));
        if (location?.state && daysDifference >= 4) {
            setBookingEditIndex(venueIndex)
            // setEditIndex(index)
            setCurrentVenueIndex(venueIndex);
            // Open the modal
            setIsModalOpen(true);
        }
        else if (location.state && daysDifference <= 4) {
            // setRemoveModal(true)
            setBookingEditIndex(venueIndex)
            // setEditIndex(index)
            setCurrentVenueIndex(venueIndex);
            // Open the modal
            setIsModalOpen(true);
        }
        else {
            setEditIndex(index)
            setCurrentVenueIndex(index);
            // Open the modal
            setIsModalOpen(true);

        }

    };
    const handleRemoveSlot = (index) => {
        // Create a copy of the selectedSlot array
        const updatedSlots = [...selectedSlot];

        // Remove the slot at the specified index
        updatedSlots.splice(index, 1);

        // Update the state with the modified array
        setSelectedSlot(updatedSlots);
    };
    useEffect(() => {
        if (venue.length) {
            let venueFilter = allVenues?.find(cat => cat.name === venue[0])
            console.log(venueFilter);
            // [selectedVenues].forEach((venue) => {
            //     calculatedTotalCapacity += venueCapacities[venue];
            // });
            // Update totalCapacity state
            setTotalCapacity(venueFilter?.capacity);
            setVenueCharges(venueFilter?.fixedCharges)
            setVenueUnitPrice(venueFilter?.personCharges)
        }
    }, [venue, allVenues])
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
            {loader ? <Loader /> : null}
            <div className='input-wrapper'>
                <fieldset style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", border: "2px solid #73787c",
                    padding: "10px 25px",
                    borderRadius: "4px",
                    marginBottom: "10px"
                }}>
                    <legend
                        style={{
                            marginBottom: 10,
                            fontFamily: 'poppins',
                            color: '#73787c',
                            fontWeight: '600',
                            fontSize: "20px",
                            marginLeft: 8,
                            width: "11%"
                        }}
                    >
                        <span style={{ opacity: 0 }}>{"1"}</span> {"Event Info"}
                    </legend>
                    <InputField placeholder={"No of Person*"} label={"No of Person*"} width={"30%"} value={maxPerson} type={"number"} onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {

                            setMaxPerson(e.target.value)
                        }
                    }} />

                    <SelectField
                        label="Type of Event*"
                        placeholder="Select Type of Event"
                        options={event?.map(cat => ({ label: cat.name, value: cat.name }))}
                        width={"30%"}
                        value={eventType}
                        onChange={(event) => setEventType(event)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', width: "30%" }}>
                        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 5, }}>
                            <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>{"Venue Selection"}</label>
                            <p style={{ background: "rgb(255 255 255 / 56%)", borderRadius: "12px", padding: "5px 10px", fontSize: "10px", fontWeight: "500" }}>Capacity {totalCapacity}</p>
                        </div>
                        <Select
                            style={{
                                width: "100%",
                                height: 45,
                                marginBottom: 15,
                                borderColor: "#b78953 !important",
                                backgroundColor: "#fff !important"
                            }}
                            placeholder="Select Venue"
                            options={allVenues?.map(cat => ({ label: cat.name, value: cat.name }))}
                            width={"30%"}
                            value={venue}
                            onChange={(event, index) => {
                                onSelectVenue(event, index);
                            }}

                        />
                    </div>
                    {venue.length ? <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 5 }}>
                        <SelectField label={"Venue Amount By"} placeholder={"Venue Amount By"} width={"24%"}
                            options={[{ value: "fixed amount", label: "Fixed Amount" }, { value: "no of person", label: "No. of Person" }]} value={paymentType} onChange={(e) => setPaymentType(e)} />
                        {paymentType === "fixed amount" ?
                            <InputField placeholder={"Venue Charges $"} label={"Venue Charges $"} width={"100%"} type={"number"} value={venueCharges} onChange={(e) => {
                                const input = e.target.value;
                                // Check if the input is a positive number or an empty string
                                if (/^\d+$/.test(input) || input === "") {
                                    setVenueCharges(e.target.value)
                                }
                            }} />
                            : paymentType === "no of person" ? <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: '75%' }}>
                                <InputField placeholder={"No of Person"} label={"No of Person"} width={"25%"} value={maxPerson} type={"number"} onChange={(e) => {
                                    const input = e.target.value;

                                    // Check if the input is a positive number or an empty string
                                    if (/^\d+$/.test(input) || input === "") {

                                        setMaxPerson(e.target.value)
                                    }
                                }} />
                                <InputField placeholder={"Unit Price $"} label={"Unit Price $"} width={"25%"} value={venueUnitPrice} type={"number"} onChange={(e) => {
                                    const input = e.target.value;

                                    // Check if the input is a positive number or an empty string
                                    if (/^\d+$/.test(input) || input === "") {

                                        setVenueUnitPrice(e.target.value)
                                    }
                                }} />
                                <InputField placeholder={"Venue Total Price $"} label={"Venue Total Price $"} width={"20%"} disabled={true} value={venueTotalCharges} type={"number"} />
                            </div> : null}
                    </div> : null }
                    <div style={{ width: "65%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                            {venue && venue?.length && selectedDate && selectedSlot.length ?
                                <div >

                                    <div>
                                        {selectedSlot?.map((e, index) => {
                                            return (
                                                <p style={{
                                                    fontSize: "14px", color: "#000000e0", padding: "0px 10px", cursor: "pointer,", display: "flex", alignItems: "center", justifyContent: "space-between",
                                                    boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", borderRadius: 8, backgroundColor: "#F0F0F0", marginBottom: 10
                                                }} >
                                                    <span onClick={() => handleEditVenue()} style={{ width: "95%", padding: "10px 0px " }}>

                                                        {/* {`${e}`} */}
                                                        {`${regex.test(selectedDate) ? selectedDate : selectedDate?.format('YYYY-MM-DD')} / ${e}`}
                                                    </span>
                                                    <RxCross1 onClick={() => handleRemoveSlot(index)} style={{ cursor: "pointer" }} />
                                                </p>)
                                        })}
                                    </div>
                                </div> : <div>
                                    <Button style={{
                                        width: "100%",
                                        height: 45,
                                        marginBottom: 15,
                                        background: "#fff",
                                        boxShadow: "none",
                                        border: "1px solid #d9d9d9",
                                        color: "#000000e0",
                                        textAlign: "start",
                                        fontWeight: "500",
                                        boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                                        borderRadius: 8,
                                        backgroundColor: "#F0F0F0"
                                    }} type="primary" onClick={() => {
                                        venue.length ? setIsModalOpen(true) : setWarningPopup(true)
                                        return
                                    }} >Select Date And Time Slot </Button>
                                </div >
                            }
                        </div>
                        <SelectField
                            label="Stage*"
                            placeholder="Stage"
                            options={stages?.map(cat => ({ label: cat.name, value: cat.name }))}
                            width={"45%"}
                            value={stage}
                            onChange={(e) => setStage(e)}
                        />
                    </div>
                    {proceedState ? null : <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "end" }}>
                        <Button type="primary" style={{ height: "40px", width: "20%", background: "#73787c" }} className="custom-hover-btn" onClick={Proceed}>Proceed</Button>
                    </div>}

                </fieldset>
                {proceedState && <>
                    <fieldset style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", border: "2px solid #73787c",
                        padding: "10px 25px",
                        borderRadius: "4px",
                        marginBottom: "10px"
                    }}>
                        <legend
                            style={{
                                marginBottom: 10,
                                fontFamily: 'poppins',
                                color: '#73787c',
                                fontWeight: '600',
                                fontSize: "20px",
                                marginLeft: 8,
                                width: "13"
                            }}
                        >
                            <span style={{ opacity: 0 }}>{"1"}</span>

                            {"Customer Info"}
                        </legend>
                        <InputField placeholder={"First Name*"} label={"First Name*"} width={"32.5%"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <InputField placeholder={"last Name*"} label={"Last Name*"} width={"32.5%"} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <InputField placeholder={"Email*"} label={"Email*"} width={"32.5%"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div style={{ display: 'flex', flexDirection: 'column', width: "30%" }}>

                            <label
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
                                    height: 45,
                                    marginBottom: 15,
                                }}
                                placeholder={"Phone Number*"}
                                value={phone}
                                onChange={(e) => {
                                    const input = e.target.value;

                                    // Check if the input is a positive number or an empty string
                                    if (/^\d+$/.test(input) || input === "") {
                                        // If it's a positive number or an empty string, update the state
                                        setPhone(input);
                                    }
                                }}
                                // onChange={(e) => setPhone(e.target.value)}
                                type={"number"}
                            />
                        </div>
                        <InputField placeholder={"Zip*"} label={"Zip*"} width={"22%"} value={zip} onChange={(e) => setZip(e.target.value)} />
                        <InputField placeholder={"City*"} label={"City*"} width={"22%"} value={city} onChange={(e) => setCity(e.target.value)} />
                        <InputField placeholder={"State*"} label={"State*"} width={"22%"} value={state} onChange={(e) => setState(e.target.value)} />

                    </fieldset>
                    <AddBookingServices selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
                    <AddCustomTable onDataChange={handleCustomTableData} data={formData} setFormData={setFormData} form={form} />
                    <CheckBox1 isChecked={isInternal} onChange={()=>{
                        console.log(isInternal);
                        settingInternal(isInternal)}} labelText={"This is Internal Booking."} />       
                    
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <SelectField options={[{ label: "In Process", value: "In Process" }, { label: "Hold", value: "Hold" }]} label={"Status"} width={"12%"} value={status} onChange={(e) => setStatus(e)} />
                        <TextAreaField
                            placeholder='Note'
                            // label="Hello"
                            autoSize={{ minRows: 2, maxRows: 7 }}
                            textAreas={textAreasConfig}
                            width={"86%"}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        // readOnly={!isEditMode}
                        // disabled={disabled}
                        />
                    </div>
                    <div style={{
                        width: "100%",
                        marginBottom: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                        marginTop: "10px"
                    }}>
                        <div style={{ display: "flex", width: "100%", gap: 5 }}>
                            <SelectField label={"Discount Type"} placeholder={"Discount Type"} width={"12%"}
                                options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={disocuntType} onChange={(e) => setDiscountType(e)} />
                            <InputField
                                label={"Discount"}
                                placeholder={disocuntType === "+" ? "$ Discount " : "Discount %"}
                                width={"12%"}
                                // type="number"
                                value={disocuntValue}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    // Check if the discount type is "%"
                                    if (disocuntType === "%") {
                                        const isValidInput = /^[+]?\d*\.?\d*$/.test(input) || input === '';
                                        const isWithinRange = isValidInput && (input === '' || parseFloat(input) <= 99);

                                        // If the input is valid and within the specified range, update the state
                                        if (isWithinRange) {
                                            setDiscountValue(input);
                                        }
                                    } else {
                                        // If the discount type is not "%", update the state without validation
                                        setDiscountValue(input);
                                    }
                                }}
                            />
                            <SelectField label={"Tip Type"} placeholder={"Tip Type"} width={"12%"}
                                options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={tipType} onChange={(e) => setTipType(e)} />
                            <InputField
                                label={"Tip"}
                                placeholder={disocuntType === "+" ? "$ Tip" : "Tip %"}
                                // placeholder={"$ Tip"}
                                width={"10%"}
                                // type="number"
                                value={tip}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (tipType === "%") {
                                        const isValidInput = /^[+]?\d*\.?\d*$/.test(input) || input === '';
                                        const isWithinRange = isValidInput && (input === '' || parseFloat(input) <= 99);

                                        // If the input is valid and within the specified range, update the state
                                        if (isWithinRange) {
                                            setTip(input);
                                        }
                                    } else {
                                        setTip(input)
                                    }
                                }}
                            />
                            <InputField
                                label={"Tax "}
                                placeholder={"Tax %"}
                                width={"10%"}
                                // type="number"
                                value={tax}
                                disabled={true}
                            // onChange={(e) => {
                            //     const input = e.target.value;
                            //     const isValidInput = /^[+]?\d*\.?\d*$/.test(input) || input === '';
                            //     const isWithinRange = isValidInput && (input === '' || parseFloat(input) <= 99);

                            //     // If the input is valid and within the specified range, update the state
                            //     if (isWithinRange) {
                            //         setTax(input);
                            //     }
                            // }}
                            />
                        </div>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "end", flexWrap: "wrap", justifyContent: "space-between" }}>

                        <div style={{
                            display: "flex", alignItems: "center", width: "19.5%", padding: 16, background: "#fff", borderRadius: "5px",
                            marginBottom: 10, justifyContent: "space-between"
                        }}>

                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "400"
                            }}>Sub Total </p>
                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}>{"$"}{subTotal ? subTotal : 0}</p>
                        </div>
                        <div style={{
                            display: "flex", alignItems: "center", width: "19.5%", padding: 16, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                        }}>

                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "400"
                            }}>Tip</p>
                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}>{tipType !== "%" && "$"}{tip ? tip : 0}{tipType === "%" && "%"}</p>
                        </div>
                        <div style={{
                            display: "flex", alignItems: "center", width: "19.5%", padding: 16, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                        }}>

                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "400"
                            }}>Tax </p>
                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}>  {tax || 0}%</p>
                        </div>
                        <div style={{
                            display: "flex", alignItems: "center", width: "19.5%", padding: 16, background: "#fff", marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                        }}>

                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "400"
                            }}>Discount </p>
                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}> {disocuntType !== "%" && "$"}{disocuntValue ? disocuntValue : 0}{disocuntType === "%" && "%"}</p>
                        </div>
                        <div style={{
                            display: "flex", alignItems: "center", width: "19.5%", padding: 16, background: "#fff", marginRight: 10, marginBottom: 10, borderRadius: "5px", justifyContent: "space-between"
                        }}>

                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "600"
                            }}>Total </p>
                            <p style={{
                                color: "rgba(0, 0, 0, 0.88)",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                fontWeight: "600"
                            }}> ${subTotalToDsicount}</p>
                        </div>
                    </div>
                    <div style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex", alignItems: "center",
                        justifyContent: "right"
                    }}>
                        <Btn htmlType="button" onClick={save} onDataChange={handleCustomTableData} className="custom-hover-btn" label={location?.state ? "Save Booking" : "Add Booking"} />
                    </div>
                </>}

                <CalendarModal editIndex={editIndex} location={location} isModalOpen={isModalOpen} handleCancel={handleCancel} venue={venue} setSelectedDate={setSelectedDate} selectedDate={selectedDate} setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot} currentVenueIndex={currentVenueIndex} setCurrentVenueIndex={setCurrentVenueIndex} bookingEditIndex={bookingEditIndex} setBookingEditIndex={setBookingEditIndex} />
                <WarningPopup isModalOpen={warnigPopup} handleCancel={handleCancelWarning} />
                <ProceedWarning isModalOpen={proceedWarnig} handleCancel={handleCloseProceedPopup} />
                <LongDescriptionPopup isModalOpen={longPopup} handleCancel={handleCloseLongPopup} heading={infoDetail} />
                <SelectWarningPopup isModalOpen={selectWarnig} handleCancel={handleCloseSelectWarning} />
                <NotRemove isModalOpen={notRemoveModal} handleCancel={handleNotRemoveModal} />
                <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
                <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            </div>
        </div >
    )
}
export default AddBooking