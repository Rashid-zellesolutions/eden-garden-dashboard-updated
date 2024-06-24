import { Button, Modal } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
// import Upload from "../../assets/upload.png"
import { Url } from "../../env"
import InputField from "../InputField"
import SelectField from "../SelectField"
import { message, Upload } from 'antd';
function AddUserPopup({ isModalOpen, handleCancel, loading, setLoading, setErrorPopupMessage, setErrorPopupOpen, setSuccessPopupMessage, setSuccessPopupOpen, setUsers, users, editData, setEditData }) {
    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [role, setRole] = useState("")
    const [dateAdded, setDateAdded] = useState(dayjs(Date.now()))
    const [profileImage, setProfileImage] = useState("")
    const [imageData, setImageData] = useState("")
    const [lastLogin, setLastLogin] = useState("")
    const [permissions, setPermissions] = useState([]);
    // const ClosePopup = () => {
    //     handleCancel()
    //     setConfirmPassword("")
    //     setPassword("")
    //     setFullName("")
    //     setEmail("")
    //     setImageData("")
    //     setProfileImage("")
    //     setLastLogin("")
    //     setIdNumber("")
    //     setRole("")
    // }

    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${Url}Roles/Get`);
                // const response = await fetch('https://ballroom-backend.vercel.app/api/v1/Booking/Get');
                const result = await response.json();
                console.log(result);
                setPermissions([...result.Roles]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        FetchData()
    }, [])



    useEffect(() => {
        if (editData) {
            setEmail(editData.email)
            setIdNumber(editData.idNumber)
            setRole(editData.role)
            setFullName(editData.fullName)
            setUserName(editData.userName)
            setProfileImage(editData.profileImage)
            setLastLogin(editData.lastLogin)
            return
        }
    }, [editData])
    const CloseModal = () => {
        setConfirmPassword("")
        setPassword("")
        setFullName("")
        setUserName("")
        setProfileImage("")
        setIdNumber("")
        setEmail("")
        setRole("")
        setImageData("")
        setEditData(null)
        handleCancel()
    }

    const Add = (image) => {
        if (editData) {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
            var raw = JSON.stringify({
                fullName: fullName,
                userName: userName,
                email: email,
                idNumber: idNumber,
                profileImage: image ? image : profileImage,
                role: role,
                lastLogin: lastLogin
            })
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Url}Authentication/Edit/${editData._id}`, requestOptions)
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
                        // setUsers(()=>[result.user, ...users])
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
        } else {


            if (!fullName || !email || !password || !confirmPassword || !idNumber || !role || !image || !userName) {

                setErrorPopupMessage("Fill Inputs")
                setErrorPopupOpen(true)
                //     return
                // }
                return
            } else {

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    console.error('Invalid email format');
                    setErrorPopupMessage("Invalid email format")
                    setErrorPopupOpen(true)
                    // You can also provide feedback to the user if needed
                    return;
                } else if (!password.includes(confirmPassword)) {
                    // toast.error("Passowrd Not match")
                    setErrorPopupMessage("Passowrd Not Match")
                    setErrorPopupOpen(true)
                    return
                }
                setLoading(true)
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const formatTime = dateAdded.format('YYYY-MM-DD');
                // const formatTime = location.state ? selectedDate : selectedDate[currentVenueIndex]?.format('YYYY-MM-DD')
                var raw = JSON.stringify({
                    fullName: fullName,
                    userName: userName,
                    email: email,
                    password: password,
                    confirmpassword: confirmPassword,
                    idNumber: idNumber,
                    profileImage: image,
                    role: role,
                    dateAdded: formatTime,
                    lastLogin: ""
                })
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${Url}Authentication/Signup`, requestOptions)
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
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    // const handleImageChange = (e) => {
    //     // console.log("handleImageChange");
    //     // // setIsLoading(true);
    //     // const file = e.target.files[0];
    //     // // setImageData(URL.createObjectURL(file));
    //     // // setFile(file)
    //     // uploadImages(file);
    //     if (e.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (e.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(e.file.originFileObj, (url) => {
    //             setLoading(false)
    //             setProfileImage(url)
    //             // setLoading(false);
    //             // setImageUrl(url);
    //         });
    //     }
    // };
    const handleImageChange = (info) => {
        setLoading(false);
        setImageData(info.file.originFileObj);
    };
    const uploadImages = async (e) => {
        setLoading(true)
        const formData = new FormData();
        // console.log(e);
        formData.append("file", imageData);
        formData.append("upload_preset", "em1ccgrx");
        // formData.append("upload_preset", "htjxlrii");
        // console.log(formData);
        fetch("https://api.cloudinary.com/v1_1/dmmnbv3ko/image/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false)
                if (data.error) {
                    setErrorPopupMessage(data.error)
                    setErrorPopupOpen(true)
                    console.log("Error:", data);
                    return
                }
                // console.log("Upload success:", data);
                // setSuccessPopupMessage("Image Upload Successfull")
                // setSuccessPopupOpen(true)
                // toast.success("Image Upload successfully")
                setProfileImage(data?.url)
                Add(data.url)
                // setCloudImage((prevArray) => [...prevArray, data.url]);
            })
            .catch((error) => {
                // Handle error
                // console.error("Upload error:", error);
                // setIsLoading(false);
                setLoading(false)
                setErrorPopupMessage("Image Not Upload")
                setErrorPopupOpen(true)
            });
    };
    return (
        <Modal title={editData ? "Edit User Information" : "Add User"}  open={isModalOpen} onCancel={CloseModal} footer={[<>
            <Button type='primary' style={{ background: "#73787c" }}
                onClick={() => {
                    if (imageData) {
                        uploadImages()
                    } else {
                        Add()
                    }
                }}
                className="buttonHover">{editData ? "Save Change" : "Add"}</Button></>]}>
            <InputField placeholder={"Full Name"} label={"Full Name"} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <InputField placeholder={"User Name"} label={"User Name"} value={userName} onChange={(e) => setUserName(e.target.value)} />
            <InputField placeholder={"Email"} label={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
            {!editData ? <>
                <InputField placeholder={"Password"} label={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <InputField placeholder={"Confirm Password"} label={"Confirm Password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </> : <></>}

            <InputField placeholder={"Id Number"} label={"Id Number"} value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />


           {permissions && <SelectField label={"Role"} placeholder={"Role"}
                options={permissions.map(role => ({
                    value: role.role,
                    label: role.role
                }))}
                width={"100%"}

                value={role}
                onChange={(e) => setRole(e)}
            />}
            <div style={{ marginBottom: 15, display: "flex",  flexDirection: "column" }}>
                {/* <div style={{ width: "60%" }}> */}
                <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Profile Image</label>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    // beforeUpload={beforeUpload}
                    onChange={handleImageChange}
                >
                    {profileImage || imageData ? (
                        <img
                            src={imageData ? URL.createObjectURL(imageData) : profileImage}
                            // src={profileImage}
                            alt="avatar"
                            style={{
                                width: '100%',
                                borderRadius: "50%"
                            }}
                        />
                    ) : (
                        <span>Upload<br />Image</span>
                    )}
                </Upload>
                {/* <div style={{ display: "flex", flexDirection: "column", marginTop: 5, cursor: "pointer" }}>
                        <label
                            for="upload-image"
                            style={{
                                border: "1px solid #b78953",
                                width: "100%",
                                padding: 10,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                color: "#b78953",
                                cursor: "pointer"
                            }}
                        >
                            <img
                                src={Upload}
                                alt=""
                                width="20"
                                style={{ marginRight: 10 }}
                            />
                            Upload Image
                        </label>
                        <input
                            id="upload-image"
                            style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                            fullWidth
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div> */}
                {/* </div> */}
                {/* {profileImage ? (
                    <img
                        src={profileImage}
                        alt=""
                        style={{
                            width: "50px",
                            height: "45px",
                            borderRadius: "10px",
                            // marginTop: 5,
                            marginLeft: 20
                        }}
                    />
                ) : null} */}
            </div>
        </Modal>
    )
}
export default AddUserPopup