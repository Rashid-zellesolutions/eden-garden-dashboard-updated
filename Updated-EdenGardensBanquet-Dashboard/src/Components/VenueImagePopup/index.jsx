import { Button, Modal } from "antd"
import { useState } from "react"
import Upload from "../../assets/upload.png"
import InputField from "../InputField"

function VenueImagePopup({ isModalOpen, handleCancel, image, setImage, setLinkImage, linkImage }) {
    const [selection, setSelection] = useState("Link")
    const handleImageChange = (e) => {
        console.log("handleImageChange");
        const file = e.target.files[0];
        setImage(file)
        // uploadImages(file);
    };

    console.log(image);
    return (
        <Modal width={"40%"} title={"Image"} open={isModalOpen} onCancel={handleCancel} footer={[<></>]} style={{ padding: "20px", top: "18%" }} >
            <div style={{ marginTop: "20px" }}>
            <div style={{display: 'flex', gap: 15, width: '100%'}}>
                <Button type="primary" onClick={() => setSelection("Link")} className={selection === "Link" ? "custom-hover-btn" : "not-select-btn"} style={{ background: "#b78953", width: '50%', padding: '5px 10px' }}>Upload Image Link</Button>
                <Button type="primary" onClick={() => setSelection("Upload")} className={selection === "Upload" ? "custom-hover-btn" : "not-select-btn"} style={{ background: "#b78953", width: '50%', padding: '5px 10px' }} >Upload Image</Button>
            </div>
                <div style={{ marginTop: "20px" }}>
                    {selection === "Link" ? <InputField label={"Upload Image Link"} placeholder={"Upload Image Link"} value={linkImage} onChange={(e) => setLinkImage(e.target.value)} /> :
                        <div style={{ width: "100%", }}>
                            <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Upload Image</label>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: 5, cursor: "pointer" }}>
                                <label
                                    for="upload-image"
                                    style={{
                                        border: "1px solid #b78953",
                                        width: "100%",
                                        padding: 10,
                                        borderRadius: 6,
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#b78953",
                                        cursor: "pointer"
                                    }}
                                >
                                    {/* <img
                                        src={Upload}
                                        alt=""
                                        width="20"
                                        style={{ marginRight: 10 }}
                                    /> */}
                                    Upload Image
                                </label>
                                <input
                                    id="upload-image"
                                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                                    fullWidth
                                    type="file"
                                    onChange={handleImageChange}
                                />

                                {/* <InputField placeholder={"Profile Image"} label={"Profile Image"} type={"file"} onChange={handleImageChange} /> */}
                            </div>
                        </div>}
                    {image && <img src={URL.createObjectURL(image)} alt="" style={{ width: "100%", height: "250px", marginTop: "20px", borderRadius: "8px" }} />}
                </div>
            </div>
        </Modal>
    )
}
export default VenueImagePopup