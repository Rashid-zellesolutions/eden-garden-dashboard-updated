import { Modal } from "antd"
import Checked from "../../assets/checked.png"

function SuccessPopup({ isModalOpen, handleCancel, label }) {

    return (
        <Modal width={"25%"} title={""} open={isModalOpen} className="custom-modal-color" onCancel={handleCancel} footer={[<></>]} style={{ padding: "20px", top: "38%" }} >
            <div className="warning-container">
                <div className="warning-heading-container">
                    <img src={Checked} alt="" />
                    <h2 className="warning-heading">Success</h2>
                </div>
                <h3 className="warning-heading">{label}</h3>
            </div>
        </Modal>
    )
}
export default SuccessPopup