import { Button, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingContext } from "../../../Context/BookingContext";
import { Url, zipUrl } from "../../../env";
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
import './module.addbooking.css';


const AddBooking = () => {

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
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    // const [zip, setZip] = useState(location?.state ? location?.state?.zip : "")
    // const [city, setCity] = useState(location?.state ? location?.state?.city : "")
    // const [state, setState] = useState(location?.state ? location?.state?.state : "")
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
            const formatTime = location.state ? selectedDate : selectedDate.format('MM-DD-YYYY');
            // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
            var raw = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
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
            const formatTime = location.state ? regex.test(selectedDate) ? selectedDate : selectedDate.format('MM-DD-YYYY') : selectedDate?.format('MM-DD-YYYY')
            var raw = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
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
    // const handleRemoveSlot = (index) => {
    //     // Create a copy of the selectedSlot array
    //     const updatedSlots = [...selectedSlot];

    //     // Remove the slot at the specified index
    //     updatedSlots.splice(index, 1);

    //     // Update the state with the modified array
    //     setSelectedSlot(updatedSlots);
    // };
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

    const groupSlots = (slots) => {
        // Ensure all slots are in the correct format before proceeding
        const validSlots = slots.filter(slot => slot.includes('-'));

        if (validSlots.length === 0) return [];

        const sortedSlots = validSlots.sort((a, b) => {
            const [aStart] = a.split('-').map(time => parseInt(time.replace(/:/g, ''), 10));
            const [bStart] = b.split('-').map(time => parseInt(time.replace(/:/g, ''), 10));
            return aStart - bStart;
        });

        const groupedSlots = [];
        let currentGroup = [sortedSlots[0]];

        for (let i = 1; i < sortedSlots.length; i++) {
            const [, prevEnd] = currentGroup[currentGroup.length - 1].split('-').map(time => parseInt(time.replace(/:/g, ''), 10));
            const [currentStart] = sortedSlots[i].split('-').map(time => parseInt(time.replace(/:/g, ''), 10));

            if (prevEnd === currentStart) {
                currentGroup.push(sortedSlots[i]);
            } else {
                groupedSlots.push(currentGroup);
                currentGroup = [sortedSlots[i]];
            }
        }

        groupedSlots.push(currentGroup);
        return groupedSlots;
    };

    const groupedSlots = groupSlots(selectedSlot);

    const handleRemoveSlot = (groupIndex) => {
        // Get the slots to remove
        const slotsToRemove = groupedSlots[groupIndex];

        // Filter out the slots to remove from selectedSlots
        const updatedSlots = selectedSlot.filter(slot => !slotsToRemove.includes(slot));

        // Update the state with the new slots
        setSelectedSlot(updatedSlots);
    };
    console.log(" Selected Slots ", selectedSlot)

const handleZipChange = async (e) => {
    const zipCode = e.target.value;

    // Fetch city and state data from an API
    try {
        const response = await fetch(`${zipUrl}${zipCode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCity(data.city); 
        setState(data.state); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    // Update zip state
    setZip(zipCode);
};

    const [phoneFormate, setPhoneFormate] = useState("");
    const formatPhoneNumber = (value) => {
        if(!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        // const phoneNumberLength = phoneNumber.length;
        let formattedNumber = "";
        if (phoneNumber.length <= 3) {
            formattedNumber = phoneNumber;
        } else if (phoneNumber.length <= 6) {
            formattedNumber = `${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 4)}${phoneNumber.length > 4 ? '-' : ''}${phoneNumber.slice(4)}`;
        } else {
            formattedNumber = `${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}`;
        }

        return formattedNumber;

        // if (phoneNumber.length > 0) {
        //     return `0-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}`;
        // }
        // return value;
        // if(phoneNumberLength < 4) return phoneNumber;
        // if(phoneNumberLength < 7) {
        //     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        // }
        // return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }

    const handleChange = (e) => {
        const input = e.target.value;
        if (/^[\d-]*$/.test(input)) {
            setPhone(formatPhoneNumber(input));
        }
    }

    console.log("Formated Phone ", phone)
    return (
        <div className='add-booking-container'>
            {loader ? <Loader /> : null}
            <div className='input-wrapper'>
                <fieldset style={{
                    width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap", backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    padding: "10px 25px",
                    borderRadius: "4px",
                    marginBottom: "25px"
                }}>
                    <div 
                        className="headings"
                        style={{
                        marginBottom: 20,
                        marginTop: 10,
                        fontFamily: 'poppins',
                        color: '#73787c',
                        fontWeight: '600',
                        marginLeft: -15,
                        // width: "11%"
                    }}>
                        <span style={{ opacity: 0 }}>{"1"}</span> {"Event Info"}
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: '15px',  flexWrap: "wrap",}}>
                        <InputField placeholder={"No of Person*"} label={"No of Person*"} width={'23%'} value={maxPerson} type={"number"} onChange={(e) => {
                            const input = e.target.value;

                            // Check if the input is a positive number or an empty string
                            if (/^\d+$/.test(input) || input === "") {

                                setMaxPerson(e.target.value)
                            }
                        }} />

                        <SelectField
                            label="Type of Event*"
                            placeholder="Select Type of Event"
                            // options={event?.map(cat => ({ label: cat.name, value: cat.name }))}
                            width={"23%"}
                            value={eventType}
                            options={[
                                {
                                  value: 'jack',
                                  label: 'Jack',
                                },
                                {
                                  value: 'lucy',
                                  label: 'Lucy',
                                },
                                {
                                  value: 'tom',
                                  label: 'Tom',
                                },
                              ]}
                            onChange={(event) => setEventType(event)}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', width: '23%' }}>
                            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 5, }}>
                                <label className="input-labels" style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c" }}>{"Venue"}</label>
                                <p style={{ background: "rgb(255 255 255 / 56%)", borderRadius: "12px", padding: "2px 10px", fontSize: "0.5rem", fontWeight: "500" }}>Capacity {totalCapacity}</p>
                            </div>
                            <Select
                                style={{
                                    width: "100%",
                                    height: 35,
                                    marginBottom: 15,
                                    borderColor: "#b78953 !important",
                                    backgroundColor: "#fff !important"
                                }}
                                placeholder="Select Venue"
                                // options={allVenues?.map(cat => ({ label: cat.name, value: cat.name }))}
                                options={[
                                    {
                                      value: 'jack',
                                      label: 'Jack',
                                    },
                                    {
                                      value: 'lucy',
                                      label: 'Lucy',
                                    },
                                    {
                                      value: 'tom',
                                      label: 'Tom',
                                    },
                                  ]}
                                width={"24%"}
                                value={venue}
                                onChange={(event, index) => {
                                    onSelectVenue(event, index);
                                }}

                            />
                        </div>

                        <SelectField
                            label="Stage*"
                            placeholder="Stage"
                            // options={stages?.map(cat => ({ label: cat.name, value: cat.name }))}
                            options={[
                                {
                                  value: 'jack',
                                  label: 'Jack',
                                },
                                {
                                  value: 'lucy',
                                  label: 'Lucy',
                                },
                                {
                                  value: 'tom',
                                  label: 'Tom',
                                },
                              ]}
                            width={"24%"}
                            value={stage}
                            onChange={(e) => setStage(e)}
                        />

                        {venue.length ? <div style={{ width: "100%", display: "flex", alignItems: "center", gap: '15px' }}>
                        <SelectField label={"Venue Amount By ($)"} placeholder={"Venue Amount By"} width={"25%"}
                            options={[{ value: "fixed amount", label: "Fixed Amount" }, { value: "no of person", label: "No. of Person" }]} value={paymentType} onChange={(e) => setPaymentType(e)} />
                        {paymentType === "fixed amount" ?
                            <InputField placeholder={"Venue Charges $"} label={"Venue Charges $"}  type={"number"} value={venueCharges} onChange={(e) => {
                                const input = e.target.value;
                                // Check if the input is a positive number or an empty string
                                if (/^\d+$/.test(input) || input === "") {
                                    setVenueCharges(e.target.value)
                                }
                            }} />
                            : paymentType === "no of person" ? <div style={{ display: "flex", alignItems: "center", width: '100%', gap: '15px' }}>
                                <InputField placeholder={"No of Person"} label={"No of Person"} width={"14%"} value={maxPerson} type={"number"} onChange={(e) => {
                                    const input = e.target.value;

                                    // Check if the input is a positive number or an empty string
                                    if (/^\d+$/.test(input) || input === "") {

                                        setMaxPerson(e.target.value)
                                    }
                                }} />
                                <InputField placeholder={"Unit Price $"} label={"Unit Price $"} width={"14%"} value={venueUnitPrice} type={"number"} onChange={(e) => {
                                    const input = e.target.value;

                                    // Check if the input is a positive number or an empty string
                                    if (/^\d+$/.test(input) || input === "") {

                                        setVenueUnitPrice(e.target.value)
                                    }
                                }} />
                                <InputField placeholder={"Venue Total Price $"} label={"Venue Total Price $"}  disabled={true} value={venueTotalCharges} type={"number"} />
                            </div> : null}
                    </div> : null}
                    <div style={{ width: "65%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ width: "46%" }}>
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
                                        {groupedSlots.map((group, groupIndex) => {
                                            const [firstStartTime] = group[0].split('-');
                                            const [, lastEndTime] = group[group.length - 1].split('-');
                                                return (
                                                    <p 
                                                        key={groupIndex}
                                                        className="input-labels"
                                                        style={{
                                                            fontSize: "14px", color: "#000000e0", padding: "0px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                                                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', borderRadius: '5px', backgroundColor: "#fff", marginBottom: 10
                                                        }}
                                                    >
                                                        <span onClick={() => handleEditVenue()} style={{ width: "95%", padding: "10px 0px" }}>
                                                            {`${firstStartTime} - ${lastEndTime}`}
                                                        </span>
                                                        <RxCross1 onClick={() => handleRemoveSlot(groupIndex)} style={{ cursor: "pointer" }} />
                                                    </p>
                                                );
                                            })}
                                    </div>    
                                </div>
                                : 
                                <div>
                                    <Button 
                                        className="input-labels"
                                        style={{
                                        width: "100%",
                                        height: 35,
                                        marginBottom: 15,
                                        marginTop: 5,
                                        background: "#fff",
                                        // boxShadow: "none",
                                        border: "1px solid #d9d9d9",
                                        color: "#000000e0",
                                        textAlign: "start",
                                        fontWeight: "500",
                                        // boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                        borderRadius: '0px',
                                        backgroundColor: "#fff"
                                    }} type="primary" onClick={() => {
                                        venue.length ? setIsModalOpen(true) : setWarningPopup(true)
                                        return
                                    }} >Select Date And Time Slot </Button>
                                </div >
                            }
                        </div>
                    </div>
                    {proceedState ? null : <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "end" }}>
                        <Button type="primary" style={{ height: "35px", width: "20%", background: "black" }} className="custom-hover-btn" onClick={Proceed}>Proceed</Button>
                    </div>}
                </div>
                </fieldset>
                {proceedState && <>
                    <fieldset style={{
                        width: "100%", display: "flex", flexDirection: 'column', alignItems: "start", justifyContent: "center", flexWrap: "wrap", backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        padding: "10px 25px",
                        borderRadius: "4px",
                        marginBottom: "25px"
                    }}>
                    <div 
                        className="headings"
                        style={{
                            marginBottom: 20,
                            marginTop: 10,
                            fontFamily: 'poppins',
                            color: '#73787c',
                            fontWeight: '600',
                            marginLeft: -2   
                        }}>
                        {"Customer Info"}
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: 'column', alignItems: "center", flexWrap: "wrap",}}>
                        <div style={{display: 'flex', width: '100%', gap: 15}}>
                        <InputField placeholder={"First Name*"} label={"First Name*"} width={"20%"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <InputField placeholder={"last Name*"} label={"Last Name*"} width={"20%"} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <InputField placeholder={"Email*"} label={"Email*"} width={"30%"} value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                    height: 35,
                                    marginBottom: 15,
                                }}
                                placeholder={"Phone Number*"}
                                value={phone}
                                // onChange={(e) => {
                                //     const input = e.target.value;
                                //     if (/^\d+$/.test(input) || input === "") {
                                //         setPhone(input);
                                //     }
                                // }}
                                onChange={handleChange}
                                type={"text"}
                            />
                        </div>
                        </div> 
                        <div style={{width: '100%', display: 'flex', gap: 15}}>
                        <InputField placeholder={"Zip*"} label={"Zip*"} width={"20%"} value={zip} onChange={handleZipChange} /* onChange={(e) => setZip(e.target.value)} */ />
                        <InputField placeholder={"Address*"} label={"Address*"} width={"20%"} value={address} onChange={(e) => setAddress(e.target.value)} />
                        <InputField placeholder={"City*"} label={"City*"} width={"30%"} value={city} onChange={(e) => setCity(e.target.value)} /* onChange={(e) => setCity(e.target.value)} */ />
                        <InputField placeholder={"State*"} label={"State*"} width={"30%"} value={state} onChange={(e) => setState(e.target.value)} /* onChange={(e) => setState(e.target.value)} */ />
                        </div>
                    </div>
                    </fieldset>
                    <AddBookingServices selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
                    <AddCustomTable onDataChange={handleCustomTableData} data={formData} setFormData={setFormData} form={form} />
                          
                    
                    <div style={{ width: "100%", display: "flex", flexDirection: 'column', justifyContent: "space-between", backgroundColor: '#fff', marginTop: '15px', padding: 25, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                        <div style={{marginTop: 10, marginBottom: 15}}>
                        <CheckBox1 isChecked={isInternal} onChange={()=>{
                        console.log(isInternal);
                        settingInternal(isInternal)}} labelText={"This is Internal Booking."} /> 
                        </div>
                        <div style={{width: "100%", display: "flex", gap: 15,}}>
                        <SelectField options={[{ label: "In Process", value: "In Process" }, { label: "Hold", value: "Hold" }]} label={"Status"} width={"15%"} value={status} onChange={(e) => setStatus(e)} />
                        <TextAreaField
                            placeholder='Note'
                            style={{padding: '6px'}}
                            // label="Hello"
                            autoSize={{ minRows: 1, maxRows: 7 }}
                            textAreas={textAreasConfig}
                            width={"85%"}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        // readOnly={!isEditMode}
                        // disabled={disabled}
                        />
                        </div>
                    </div>
                    <div style={{
                        width: "100%",
                        marginBottom: '15px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                        marginTop: '25px',
                        backgroundColor: '#fff',
                        padding: 25,
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                    }}>
                        <div style={{ display: "flex", width: "100%", gap: 15 }}>
                            <SelectField label={"Discount Type"} placeholder={"Discount Type"} width={"20%"}
                                options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={disocuntType} onChange={(e) => setDiscountType(e)} />
                            <InputField
                                label={"Discount"}
                                placeholder={disocuntType === "+" ? "$ Discount " : "Discount %"}
                                width={"20%"}
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
                            <SelectField label={"Tip Type"} placeholder={"Tip Type"} width={"20%"}
                                options={[{ value: "%", label: "By %" }, { value: "+", label: "By $" }]} value={tipType} onChange={(e) => setTipType(e)} />
                            <InputField
                                label={"Tip"}
                                placeholder={disocuntType === "+" ? "$ Tip" : "Tip %"}
                                // placeholder={"$ Tip"}
                                width={"20%"}
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
                                width={"20%"}
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
                    <div style={{ width: "100%", display: "flex", alignItems: "center",  gap: '15px', marginTop: '10px' }}>

                        <div style={{
                            display: "flex", alignItems: "center", width: "20%", padding: 10, background: "#fff", borderRadius: "5px",
                            marginBottom: 10, gap: '15px'
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
                            }}>{"$"}{subTotal ? subTotal : 0}</p>
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
                            }}>{tipType !== "%" && "$"}{tip ? tip : 0}{tipType === "%" && "%"}</p>
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
                            }}>  {tax || 0}%</p>
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
                            }}> {disocuntType !== "%" && "$"}{disocuntValue ? disocuntValue : 0}{disocuntType === "%" && "%"}</p>
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