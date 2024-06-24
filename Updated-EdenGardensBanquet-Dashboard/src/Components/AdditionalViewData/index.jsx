import InputField from "../InputField"
import SelectField from "../SelectField"

function AdditionalViewData({ qty, setQty, unitPrice, setUnitPrice, totalPrice, remarkValue, remarkOnChange, statusOnChange, statusValue, label }) {
    return (
        <div style={{ display: "flex", width: "70%", gap: 5 }}>
            <InputField
                label={`No Of ${label}`}
                placeholder={`No Of ${label}`}
                width={"20%"}
                type="number"
                value={qty}
                disabled={true}
            />
            <InputField
                label="Unit Price"
                placeholder="Unit Price"
                width={"20%"}
                type="number"
                value={unitPrice}
                disabled={true}
            />
            <InputField
                label="Total Price"
                placeholder="Total Price"
                width={"20%"}
                disabled={true}
                value={totalPrice}
            />
        </div>
    )
}
export default AdditionalViewData