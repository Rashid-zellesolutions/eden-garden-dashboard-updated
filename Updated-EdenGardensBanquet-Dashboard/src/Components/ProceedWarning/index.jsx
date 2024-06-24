import { Modal } from "antd"
import WarningImage from "../../assets/warning.png"
function ProceedWarning({ isModalOpen, handleCancel }) {
    return (
        <Modal width={"25%"} title={""} open={isModalOpen} className="custom-modal-color" onCancel={handleCancel} footer={[<></>]} style={{ padding: "20px", top: "38%" }} >
            <div className="warning-container">
                <div className="warning-heading-container">
                    <img src={WarningImage} alt="" />
                    <h2 className="warning-heading">Warning</h2>
                </div>
                <h3 className="warning-heading">Please Fill All Event Info</h3>
            </div>
        </Modal>
    )
}
export default ProceedWarning