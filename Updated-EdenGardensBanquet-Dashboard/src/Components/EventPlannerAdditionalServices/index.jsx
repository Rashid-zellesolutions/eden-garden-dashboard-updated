import InputField from "../InputField"
import SelectField from "../SelectField"

function EventPlannerAdditionalServices({ qty, setQty, unitPrice, setUnitPrice, totalPrice, remarkValue, remarkOnChange, statusOnChange, statusValue, label, remarkView }) {
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


            <SelectField
                label="Status"
                placeholder="Status"
                options={[
                    { value: 'Confimred', label: 'Confimred' },
                    { value: 'Not Available', label: 'Not Available' },
                    { value: 'Issue', label: 'Issue' },
                ]}
                width={"20%"}
                value={statusValue}
                onChange={(e) => statusOnChange(e)}
            // disabled={disabled}
            />
            {remarkView && <InputField
                label="Remark"
                placeholder="Remark"
                // width={"35%"}
                type="text"
                // disabled={descriptionDisabled}
                value={remarkValue}
                onChange={(e) => remarkOnChange(e.target.value)}
            />}
        </div>
    )
}
export default EventPlannerAdditionalServices