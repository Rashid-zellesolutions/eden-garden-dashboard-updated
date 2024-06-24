import { Button, Modal } from "antd"
import DeleteModal from "../../assets/removeModal.png"
function DeletePopup({ isModalOpen, Delete, handleCancel, name }) {
    return (
        <Modal width={"25%"} title={""} open={isModalOpen} onCancel={handleCancel} footer={[<><Button type='primary' style={{ background: "#73787c" }} onClick={() => Delete()} className="buttonHover">Delete</Button></>]}>
            <div style={{ margin: "20px 0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <img src={DeleteModal} width={"20%"} style={{ marginBottom: "10px" }} />
                <p style={{ textAlign: "center", fontWeight: "500", fontSize: "18px" }}>Are You Sure ?</p>
                <p style={{ textAlign: "center", fontWeight: "400", fontSize: "14px" }}>Do you really want to delete {name}?</p>
            </div>
        </Modal>
    )
}
export default DeletePopup