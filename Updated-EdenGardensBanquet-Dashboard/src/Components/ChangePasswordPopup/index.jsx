import { Button, Modal } from "antd"
import { useState } from "react"
import { Url } from "../../env"
import InputField from "../InputField"

function ChangePassword({ isModalOpen, handleCancel, loading, setLoading, setErrorPopupMessage, setErrorPopupOpen, setSuccessPopupMessage, setSuccessPopupOpen, changeId }) {

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const CloseModal = () => {
        setConfirmPassword("")
        setPassword("")
        setOldPassword("")
        handleCancel()
    }

    const Add = () => {

        if (!oldPassword || !password || !confirmPassword) {
            console.error("Fill All Input")
            return
        } else {

            if (!password.includes(confirmPassword)) {
                // toast.error("Passowrd Not match")
                setErrorPopupMessage("Passowrd Not Match")
                setErrorPopupOpen(true)
                return
            }
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                oldPassword: oldPassword,
                newPassword: password,
                confirmNewPassword: confirmPassword,
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Authentication/ChangePassword/${changeId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result);
                    if (result.status == 200) {
                        CloseModal()
                        setSuccessPopupMessage(result.message)
                        setSuccessPopupOpen(true)
                        return
                    } else {
                        CloseModal()
                        setErrorPopupMessage(result.message)
                        setErrorPopupOpen(true)
                    }
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                    CloseModal()
                })
        }

    }
    return (
        <Modal title={"Change Password"} open={isModalOpen} onCancel={handleCancel} footer={[<>
            <Button type='primary' style={{ background: "#73787c" }}
                onClick={() => Add()}
                className="buttonHover">{"Save"}</Button></>]}>
            <InputField placeholder={"Old Password"} label={"Old Password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <InputField placeholder={"New Password"} label={"New Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputField placeholder={"Confirm New Password"} label={"Confirm New Password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        </Modal>
    )
}
export default ChangePassword