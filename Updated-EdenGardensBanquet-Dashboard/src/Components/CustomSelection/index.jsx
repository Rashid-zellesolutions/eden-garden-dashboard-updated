import InputField from "../InputField"
import SelectField from "../SelectField"

function CustomSelection({ value, onChange, colorValue, colorOnChange, qty, onChangeQty, Unit, onChangeUnit, Total, label, disabled, selectDisabled, descriptionValue, descriptionDisabled, qtyDisabled, onChangeDescription, priceDisabled, setInvoice, Invoice }) {
    return (
        <div style={{
            width: "100%",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5
        }}>
            <div style={{ width: "55%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SelectField
                    label={label}
                    placeholder={label}
                    options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                    ]}
                    width={"30%"}
                    value={value}
                    onChange={(e) => onChange(e)}
                    disabled={selectDisabled}
                />
                <InputField
                    label="Description"
                    placeholder="Description"
                    width={"35%"}
                    type="text"
                    disabled={descriptionDisabled}
                    value={descriptionValue}
                    onChange={(e) => onChangeDescription(e.target.value)}
                />
                <SelectField
                    label="Color"
                    placeholder="Color"
                    options={[
                        { value: 'Red', label: 'Red' },
                        { value: 'Yellow', label: 'Yellow' },
                        { value: 'Green', label: 'Green' },
                    ]}
                    width={"20%"}
                    value={colorValue}
                    onChange={(e) => colorOnChange(e)}
                    disabled={disabled}
                />
            </div>
            <div style={{ display: "flex", width: "40%", gap: 5 }}>
                <InputField
                    label="Qty"
                    placeholder="Qty"
                    width={"20%"}
                    type="number"
                    value={qty}
                    disabled={qtyDisabled}
                    onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {
                            onChangeQty(e.target.value)
                        }
                    }}
                />
                <InputField
                    label="Unit Price"
                    placeholder="Unit Price"
                    width={"20%"}
                    type="number"
                    value={Unit}
                    disabled={priceDisabled}
                    onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {
                            onChangeUnit(e.target.value)
                        }
                    }}
                />
                <InputField
                    label="Total Price"
                    placeholder="Total Price"
                    width={"20%"}
                    disabled={true}
                    value={Total}
                />
                <div style={{ alignItems: "center", display: "flex", gap: 5, flexDirection: "column" }}>
                    <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "14px" }}>Add To Invoice</label>
                    <div class="checkbox-wrapper-19" style={{ marginTop: "10px" }}>
                        <input type="checkbox" id={label} checked={Invoice} onChange={(e) => setInvoice(e.target.checked)} />
                        <label for={label} class="check-box" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomSelection