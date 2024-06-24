import { Button, Modal } from "antd"
import InputField from "../InputField"
import SelectField from "../SelectField"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Url } from "../../env"
import { useBookingContext } from "../../Context/BookingContext"
import Loader from "../Loader"
import ErrorPopup from "../ErrorPopup"

function CancelModal({ isModalOpen, handleCancel, addPaymentId, setAddPaymentId }) {
    const { Canceled } = useBookingContext()
    const [date, setDate] = useState(dayjs(Date.now()))
    const [refundType, setRefundType] = useState("")
    const [account, setAccount] = useState("")
    const [approvedBy, setApprovedBy] = useState("")
    const [fee, setFee] = useState(0)
    const [reason, setReason] = useState("")
    const [total, setTotal] = useState()
    const [payment, setPayment] = useState({})
    const [singleBooking, setSingleBooking] = useState({})
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const CalculationRefundAmount = total - fee || 0
    const [loading, setLoader] = useState(false)
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    useEffect(() => {
        if (addPaymentId) {
            setLoader(true)
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Payment/SinglePayment/${addPaymentId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPayment(result)
                    // setReceived(result.recived)
                    setTotal(result?.recived || 0)
                    console.log(result);
                    setLoader(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoader(false)
                });
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}New-Booking/GetSingle/${addPaymentId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false)
                    setSingleBooking(result)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoader(false)
                });
        }

    }, [addPaymentId])
    const handleClose = () => {
        setRefundType(null)
        setAccount(null)
        setTotal(0)
        setFee(0)
        setReason(null)
        setApprovedBy(null)
        handleCancel()
    }
    const Delete = () => {
        if (!refundType || !total || !fee || !reason || !approvedBy) {
            setErrorPopupMessage("Fill Input")
            setErrorPopupOpen(true)
            return
        }
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            date: date?.format("YYYY-MM-DD"),
            approvedby: approvedBy,
            accountType: refundType,
            account: account,
            total: total,
            cancelledFee: fee,
            refundAmount: CalculationRefundAmount,
            reason: reason
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${Url}Refund/Add/${addPaymentId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.Refund) {
                    Canceled(singleBooking)
                    setAccount("")
                    setApprovedBy("")
                    // setDate("")
                    setFee(0)
                    setPayment("")
                    setReason("")
                    setAddPaymentId("")
                    handleCancel()
                }
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(true)
            });
    }
    const handleCancellationChange = (e) => {
        const feeAmount = e.target.value;
        // const feeAmount = Number(e.target.value);
        if (/^\d*\.?\d*$/.test(feeAmount)) {
            // setfee(feeAmount);
            if (!isNaN(feeAmount) && feeAmount <= total) {
                setFee(feeAmount);
            }
        }
    };
    return (
        <div>
            {loading ? <Loader /> :
                <Modal title={"Cancel Event"} className="scroll-bar-hide" open={isModalOpen} onCancel={handleClose} footer={[<>
                    {/* <Button type='primary' onClick={handleCancel} style={{ background: "#b78953" }}>Cancel</Button>  */}
                    <Button type='primary' style={{ background: "#73787c" }} onClick={() => Delete()} className="buttonHover">Cancel Event</Button></>]}>
                    <InputField placeholder={"Date of Cancellation"} label={"Date of Cancellation"} type={"date"} value={date.format("YYYY-MM-DD")} />

                    <SelectField label={"Payment Type"} placeholder={"Payment Type"}
                        options={[
                            { value: 'Cash', label: 'Cash' },
                            { value: 'Credit', label: 'Credit' },
                            { value: 'Cheque', label: 'Cheque' },
                            { value: 'Custom', label: 'Custom' },
                        ]}
                        width={"100%"} value={refundType} onChange={(e) => setRefundType(e)} />
                    {refundType !== "Cash" ? <SelectField label={"Account"} placeholder={"Account"}
                        options={[
                            { value: 'Bank of America', label: 'Bank of America' },
                            { value: 'PNC Bank', label: 'PNC Bank' },
                        ]}
                        width={"100%"} value={account} onChange={(e) => setAccount(e)} /> : null}


                    <SelectField label={"Approved by"} placeholder={"Approved by"}
                        options={[
                            { value: 'Aqeel', label: 'Aqeel' },
                            { value: 'Tahir', label: 'Tahir' },
                            { value: 'Bilal', label: 'Bilal' },
                        ]}
                        width={"100%"} value={approvedBy} onChange={(e) => setApprovedBy(e)} />
                    <InputField placeholder={"Total Amount"} label={"Total Amount"} type={"number"} value={total} disabled={true} />
                    <InputField placeholder={"Cancellation Fee"} label={"Cancellation Fee"} value={fee} onChange={handleCancellationChange} />
                    <InputField placeholder={"Refund Amount"} label={"Refund Amount"} type={"number"} value={CalculationRefundAmount && CalculationRefundAmount.toFixed(2)} disabled={true} />
                    <InputField placeholder={"Reason"} label={"Reason"} value={reason} onChange={(e) => setReason(e.target.value)} />
                </Modal>
            }
            {/* <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} /> */}
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
        </div>
    )
}
export default CancelModal