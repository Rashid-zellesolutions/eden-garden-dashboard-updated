import InputField from "../InputField"
import SelectField from "../SelectField"

function EventPlannerOptions({ label, value, onChange, PersonQtyLabel, qty, onChangePersonQty, Unit, setUnit, Total, selectOption, selectDisabled, descriptionValue, descriptionDisabled,
    qtyDisabled, setDescription, priceDisabled, remarkOnChange, remarkValue, statusOnChange, statusValue, remarkView }) {
    return (
        <div style={{
            width: "100%",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5
        }}>
            <div style={{ width: "36%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SelectField
                    label={label}
                    placeholder={label}
                    options={selectOption}
                    width={"45%"}
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
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div style={{ display: "flex", width: "62%", gap: 5 }}>
                <InputField
                    label={"Qty"}
                    placeholder={PersonQtyLabel}
                    width={"20%"}
                    type="number"
                    value={qty}
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
                    value={Unit}
                    disabled={priceDisabled}
                    onChange={(e) => {
                        const input = e.target.value;

                        // Check if the input is a positive number or an empty string
                        if (/^\d+$/.test(input) || input === "") {
                            setUnit(e.target.value)
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
                    width={"35%"}
                    type="text"
                    // disabled={descriptionDisabled}
                    value={remarkValue}
                    onChange={(e) => remarkOnChange(e.target.value)}
                />}

            </div>
        </div>
    )

}
export default EventPlannerOptions