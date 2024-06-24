import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useBookingContext } from '../../Context/BookingContext';
import { Url } from '../../env';
import InputField from '../InputField';
import Loader from '../Loader';
import SelectField from '../SelectField';
import TextAreaField from '../TextAreaField';
const ModalPopup = ({ isModalOpen, setIsModalOpen, handleCancel, showModal, addPaymentId, setAddPaymentId }) => {
  const { PaymentBookingStatus } = useBookingContext()
  const [payment, setPayment] = useState({})
  const [paymentType, setPaymentType] = useState("")
  const [accountType, setAccountType] = useState("")
  const [amountReceiver, setAmountReceiver] = useState("")
  const [custom, setCustom] = useState("")
  const [paymentNote, setPaymentNote] = useState("")
  const [received, setReceived] = useState()
  const [balance, setBalance] = useState()
  const [date, setDate] = useState(dayjs(Date.now()))
  const [singleBooking, setSingleBooking] = useState({})
  const calculateBalance = balance - received || balance
  const ReceviedNumber = Number(received)
  const [loading, setLoader] = useState(false)
  useEffect(() => {
    if (addPaymentId) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`${Url}Payment/SinglePayment/${addPaymentId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setPayment(result)
          // setReceived(result.recived)
          setBalance(result?.balance)
          console.log(result);
        })
        .catch(error => console.log('error', error));
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`${Url}New-Booking/GetSingle/${addPaymentId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setSingleBooking(result)
          console.log(result)
        })
        .catch(error => console.log('error', error));
    }

  }, [addPaymentId])
  const handleClose = () => {
    setAccountType(null)
    setAddPaymentId(null)
    setBalance(0)
    setReceived(0)
    setPaymentNote(null)
    handleCancel()
  }
  const Add = () => {
    if (!paymentType || !received || !paymentNote) {
      return
    }
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const totalReceived = ReceviedNumber + payment.recived
    var raw = JSON.stringify({
      recived: totalReceived,
      balance: calculateBalance,
      total: payment.total,
      paymentHistory: [
        ...payment.paymentHistory,
        {
          date: date.format("YYYY-MM-DD"),
          amount: ReceviedNumber,
          balance: calculateBalance,
          paymentType: paymentType,
          accountType: accountType,
          paymentNote: paymentNote,
          custom: custom,
          amountReceiver: amountReceiver,
        }
      ]
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${Url}Payment/AddPayment/${addPaymentId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.PaymentAdd) {
          setPaymentNote("")
          setPaymentType("")
          setAccountType("")
          setReceived("")
          setBalance("")
          setAddPaymentId("")
          setIsModalOpen(false)
          PaymentBookingStatus(singleBooking)
        }
        setLoader(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoader(false)
      });
  }
  // const [balance,setBalance]=useState("")
  const textAreasConfig = [
    {
      label: 'Payment Note',
      showCount: false,
      maxLength: 10,
      placeholder: 'Payment Note',
      height: 45,
      resize: 'vertical',
      width: 370,
    },
  ]
  const handleReceivedChange = (e) => {
    const receivedAmount = e.target.value;
    // const receivedAmount = Number(e.target.value);
    if (/^\d*\.?\d*$/.test(receivedAmount)) {
      // setReceived(receivedAmount);
      if (!isNaN(receivedAmount) && receivedAmount <= balance) {
        setReceived(receivedAmount);
      }
    }
  };
  return (
    <>
      {loading ? <Loader /> :
        <Modal title={"Add Payment"} open={isModalOpen} onCancel={handleClose} footer={[<>
          {/* <Button type='primary' onClick={handleCancel} style={{ background: "#b78953" }} >Cancel</Button>  */}
          <Button type='primary' style={{ background: "#73787c", "&:hover": { background: "#fff" } }} className='buttonHover' onClick={() => Add()}>Add</Button></>]}>
          <SelectField label={"Payment Type"} placeholder={"Payment Type"}
            options={[
              { value: 'Cash', label: 'Cash' },
              { value: 'Credit', label: 'Credit' },
              { value: 'Cheque', label: 'Cheque' },
              { value: 'Custom', label: 'Custom' },
            ]}
            width={"100%"} value={paymentType} onChange={(event) => setPaymentType(event)} />
          {paymentType === "Custom" ?
            <InputField placeholder={"Custom"} label={"Custom"} value={custom} onChange={(e) => setCustom(e.target.value)} />
            : <></>}
          {paymentType === "Cash" ?
            <InputField placeholder={"Amount Receiver"} label={"Amount Receiver"} value={amountReceiver} onChange={(e) => setAmountReceiver(e.target.value)} />
            : <></>}
          {paymentType !== "Cash" ? <SelectField label={"Account Type"} placeholder={"Account Type"}
            options={[
              { value: 'Bank of America', label: 'Bank of America' },
              { value: 'PNC Bank', label: 'PNC Bank' },
            ]}
            width={"100%"} value={accountType} onChange={(event) => setAccountType(event)} /> : null}
          <InputField placeholder={"Received Amount"} label={"Received Amount"} value={received} onChange={handleReceivedChange} />
          <InputField placeholder={"Balance Amount"} label={"Balance Amount"} disabled={true} value={calculateBalance && calculateBalance?.toFixed(2)} />
          <TextAreaField textAreas={textAreasConfig} value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} />
        </Modal>
      }
    </>
  );
};
export default ModalPopup;