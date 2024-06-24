import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import InputField from "../InputField"
import SelectField from "../SelectField"

function EditSettingSerivcePopup({ isModalOpen, CloseModel, name, setName, Save, category, categorys, setCategorys }) {

    return (
        <Modal title={`Edit Service`} visible={isModalOpen} onCancel={CloseModel} footer={[<>
            {/* <Button type='primary' onClick={handleCancel} style={{ background: "#b78953" }}>Cancel</Button>  */}
            <Button type='primary' style={{ background: "#73787c" }} onClick={() => Save()} className="buttonHover">{"Save Changes"}</Button></>]}>
            <SelectField label={"Category"} placeholder={"Category"}
                options={category.map(cat => ({ label: cat.name, value: cat._id }))} value={categorys} onChange={(e) => setCategorys(e)} />
            <InputField
                label={"Name"}
                placeholder={"Name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
        </Modal>
    )
}
export default EditSettingSerivcePopup