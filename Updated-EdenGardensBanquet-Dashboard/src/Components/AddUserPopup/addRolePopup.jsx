import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import { Url } from "../../env"
import InputField from "../InputField"
import './index.css'








const options = [
    "Dashboard",
    "Booking",
    "Event-Planner",
    "Banquet Management",
    "Reports",
    "Purchase Supplies",
    "Order Supplies",
    "Repair & Services",
    "Payroll",
    "Settings"
  ];






function AddRolePopup({ isModalOpen,handleCancel, loading, setLoading, setErrorPopupMessage, setErrorPopupOpen, setSuccessPopupMessage, setSuccessPopupOpen, setUsers, users, editData,setEditData }) {
    const [role, setRole] = useState("")
    const [accessType, setAccessType] = useState("Partial")
    const [access, setAccess] = useState([])

    useEffect(() => {
        console.log(editData);
        if (accessType === "Full") {
          setAccess(options);
        }
      }, [accessType]);
    
      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
    
        setAccess((prevAccess) => {
          if (checked) {
            const updatedAccess = [...prevAccess, value];
            if (updatedAccess.length === options.length) {
              setAccessType("Full");
            }
            return updatedAccess;
          } else {
            const updatedAccess = prevAccess.filter((val) => val !== value);
            if (accessType === "Full") {
              setAccessType("Partial");
            }
            return updatedAccess;
          }
        });
      };
    

    useEffect(() => {
        if (editData) {
            setAccess(editData.access)
            setRole(editData.role)
            setAccessType(editData.accessType)
           
        }
    }, [editData])
    const CloseModal = () => {
        setRole("")
        setAccessType("")
     
        setAccess([])
        handleCancel();
    }

    const Add = () => {
        if (editData) {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
            var raw = JSON.stringify({
                role: role,
                accessType: accessType,
                access: access,
               
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Roles/Edit/${editData._id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        CloseModal()
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        setUsers((prevUser) =>
                            prevUser.map((user) =>
                                user._id === editData._id ? result.updatedUser : user
                            )
                        );
                        setEditData(null);
                        // setUsers(()=>[result.user, ...users])
                        return
                    } else {
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                        CloseModal();
                    }
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                    CloseModal()
                })
        } else {


            if (!role || !access  || !accessType) {

                setErrorPopupMessage("Fill Inputs")
                setErrorPopupOpen(true)
                //     return
                // }
                return
            } else {


                setLoading(true)
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
                var raw = JSON.stringify({
                    role: role,
                    accessType: accessType,
                    access: access,

                
                })
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${Url}Roles/Add`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoading(false)
                        console.log(result);
                        if (result.status == 200) {
                            CloseModal()
                            setSuccessPopupMessage(result.message)
                            setSuccessPopupOpen(true)
                            setUsers([result.user, ...users])
                            return
                        } else {
                            setErrorPopupMessage(result.message)
                            setErrorPopupOpen(true)
                            CloseModal()
                        }
                    }).catch((err) => {
                        setLoading(false)
                        console.log(err)
                        CloseModal()
                    })
            }
        }

    }


    

    return (
        <Modal title={editData ? "Edit User Information" : "Add User"}  open={isModalOpen} onCancel={CloseModal} footer={[<>
            <Button type='primary' style={{ background: "#73787c" }}
                onClick={() => {
                    Add()
                }}
                className="buttonHover">{editData ? "Save Change" : "Add"}</Button></>]}>
            <InputField placeholder={"Role Name"} label={"Role Name"} value={role} onChange={(e) => setRole(e.target.value)} />
            <Button type='primary' style={{ background: "#73787c" }}
                onClick={() => {
                    setAccessType("Full")
                }}
                className="buttonHover">Full Access</Button>
           
            <div className="containerTab">
      <h2 >Access To</h2>
      <div className="checkbox-group">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={option}
              checked={access.includes(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
        ))}
      </div>
     
    </div>
           

         
       
        </Modal>
    )
}
export default AddRolePopup