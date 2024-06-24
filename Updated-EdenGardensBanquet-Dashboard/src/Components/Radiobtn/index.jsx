import { Radio } from "antd"

function Radionbtn({ onChange, disabled,value }) {
    return (
        <Radio.Group name="radiogroup" defaultValue={value} style={{ display: "flex", flexDirection: "column" }}>
            <Radio value={"yes"} onChange={onChange} disabled={disabled}>Yes</Radio>
            <Radio value={"no"} onChange={onChange} disabled={disabled}>No</Radio>
        </Radio.Group>
    )
}
export default Radionbtn