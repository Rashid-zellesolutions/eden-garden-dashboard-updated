import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import InputField from "../InputField"

function SettingSerivcePopup({ isModalOpen, CloseModel, name, setName, Save }) {
    return (
        <Modal title={`Edit Category`} visible={isModalOpen} onCancel={CloseModel} footer={[<>
            <Button type='primary' style={{ background: "#73787c" }} onClick={() => Save()} className="buttonHover">{"Save Changes"}</Button></>]}>
            <InputField
                label={"Name"}
                placeholder={"Name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
        </Modal>
    )
}
export default SettingSerivcePopup