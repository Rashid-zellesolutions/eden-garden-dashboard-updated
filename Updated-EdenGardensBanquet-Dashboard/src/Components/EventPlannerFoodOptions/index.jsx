import InputField from "../InputField"
import SelectField from "../SelectField"
import InFoBlack from "../../assets/info-black.png"
function EventPlannerFoodOptions({ label, value, onChange, PersonQtyLabel, personQtValue, onChangePersonQty, unitPrice, setUnitPrice, Total, selectOption,
    onClick, selectDisabled, descriptionValue, descriptionDisabled, qtyDisabled, priceDisabled, remarkOnChange, remarkValue, statusOnChange, statusValue, setDescription,remarkView }) {
    return (
        <div style={{
            width: "100%",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5
        }}>
            <div style={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SelectField
                    label={label}
                    placeholder={label}
                    options={selectOption}
                    width={"40%"}
                    value={value}
                    onChange={(event) => onChange(event)}
                    disabled={selectDisabled}
                />
                <img src={InFoBlack} alt="" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={onClick} />
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
            <div style={{ display: "flex", width: "65%", gap: 5 }}>
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
                {/* <InputField
                    label="Remark"
                    placeholder="Remark"
                    width={"20%"}
                    type="text"
                    // disabled={descriptionDisabled}
                    value={remarkValue}
                    onChange={(e) => remarkOnChange(e.target.value)}
                /> */}
                {/* <SelectField
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
                /> */}
            </div>
        </div>
    )

}
export default EventPlannerFoodOptions