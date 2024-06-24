import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "../../../assets/EG-Logo-2.png"
import Hide from "../../../assets/hide.png"
import USerIcon from "../../../assets/user.png"
import View from "../../../assets/view.png"
import { Url } from "../../../env"
import ErrorPopup from "../../ErrorPopup"
import Loader from "../../Loader"
import SuccessPopup from "../../SuccessPopup"
import Zelle from "../../../assets/zelle.png"
import "./style.css"
import { useBookingContext } from "../../../Context/BookingContext"
function Login() {
    const { setLoginData, loginData } = useBookingContext()
    const naviagte = useNavigate()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState(false)
    const [laoding, setLoading] = useState(false)
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)

    }
    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false)
    }
    const login = (e) => {
        e.preventDefault();
        if (!user || !password) {
            setErrorPopupMessage("Please Fill Input Fields")
            setErrorPopupOpen(true)
            return
        }
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            userName: user,
            password: password,
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Url}Authentication/Login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                console.log(result);
                if (result.status == 200) {
                    // CloseModal()
                    setUser("")
                    setPassword("")
                    naviagte("/dashboard")
                    setLoginData(result.data)
                    localStorage.setItem("data", JSON.stringify(result.data))
                    // setSuccessPopupMessage(result.message)
                    // setSuccessPopupOpen(true)
                    return
                } else {
                    setErrorPopupMessage(result.message)
                    setErrorPopupOpen(true)
                }
            }).catch((err) => {
                setLoading(false)
                console.log(err)
                setUser("")
                setPassword("")

                // CloseModal()
            })
    }
    return (
        <div className="Login-conatiner">
            <div className="glassmorphism">
                <img src={Icon} width={"50%"} />
                <form style={{ width: "70%", height: "70%", marginTop: "10px" }} onSubmit={login}>
                    <h1 className="welcome-style">Welcome</h1>
                    <div style={{ marginTop: "20px" }}>
                        <p style={{ fontSize: "14px", fontWeight: "500", color: "#fff", textShadow: "2px 2px #73787c" }}>User Name</p>
                        <div className="login-input">
                            <input placeholder="User Name" value={user} onChange={(e) => setUser(e.target.value)} />
                            <img src={USerIcon} />
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <p style={{ fontSize: "14px", fontWeight: "500", color: "#fff", textShadow: "2px 2px #73787c" }}>Password</p>
                        <div className="login-input">
                            <input placeholder="Password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <img src={show ? View : Hide} onClick={() => setShow(!show)} />
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <button type="submit" className="login-btn">Login</button>
                    </div>
                </form>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={Zelle} width={30} />
                    <p style={{ fontSize: "14px", fontWeight: "500", color: "#fff", textShadow: "2px 2px #73787c", marginLeft: 5, padding: 0 }}><span style={{ fontSize: "10px", margin: "0px" }}> Powered By</span> <br /> ZelleSolutions</p>
                </div>
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <ErrorPopup isModalOpen={errorPopupOpen} handleCancel={handleCloseErrorPopup} label={errorPopupMessage} />
            {laoding ? <Loader /> : <></>}
        </div>
    )
}
export default Login