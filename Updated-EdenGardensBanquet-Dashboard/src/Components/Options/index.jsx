import InputField from "../InputField"
import SelectField from "../SelectField"

function Options({ label, value, onChange, PersonQtyLabel, personQtValue, onChangePersonQty, unitPrice, setUnitPrice, Total, selectOption, selectDisabled, descriptionValue, descriptionDisabled, qtyDisabled,
     priceDisabled, setInvoice, Invoice,onChangeDescription }) {
    return (
        <div style={{
            width: "100%",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5
        }}>
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SelectField
                    label={label}
                    placeholder={label}
                    options={selectOption}
                    width={"40%"}
                    value={value}
                    onChange={(event) => onChange(event)}
                    disabled={selectDisabled}
                />
                <InputField
                    label="Description"
                    placeholder="Description"
                    width={"50%"}
                    type="text"
                    value={descriptionValue}
                    disabled={descriptionDisabled}
                onChange={(e) => onChangeDescription(e.target.value)}
                />
            </div>
            <div style={{ display: "flex", width: "45%", gap: 5 }}>
                <InputField
                    label={PersonQtyLabel}
                    placeholder={PersonQtyLabel}
                    width={"20%"}
                    type="number"
                    value={personQtValue}
                    disabled={qtyDisabled}
                    onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {
                            onChangePersonQty(e.target.value)
                        }
                    }}
                />
                <InputField
                    label="Unit Price"
                    placeholder="Unit Price"
                    width={"20%"}
                    type="number"
                    value={unitPrice}
                    disabled={priceDisabled}
                    onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {
                            setUnitPrice(e.target.value)
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
                    <div class="checkbox-wrapper-19" style={{ marginTop: "10px" }} >
                        <input type="checkbox" id={label} checked={Invoice} onChange={(e) => setInvoice(e.target.checked)} />
                        <label for={label} class="check-box" />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Options