import React, { useEffect, useRef } from "react";
import InputField from "../InputField"
import SelectField from "../SelectField"
import { Input } from "antd";

const EventPlannerCustomSelection = React.memo(({ value, onChange, colorValue, colorOnChange, qty, onChangeQty, Unit, onChangeUnit, Total, label, disabled, selectDisabled,
    descriptionValue, descriptionDisabled, qtyDisabled, priceDisabled, remarkOnChange, remarkValue, statusOnChange, statusValue, setDescription, remarkView }) => {

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
                    options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                    ]}
                    width={"35%"}
                    value={value}
                    onChange={(e) => onChange(e)}
                    disabled={selectDisabled}
                />
                <InputField
                    label="Description"
                    placeholder="Description"
                    width={"29%"}
                    type="text"
                    disabled={descriptionDisabled}
                    value={descriptionValue}
                    onChange={(e) => setDescription(e.target.value)}

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
            <div style={{ display: "flex", width: "62%", gap: 5 }}>
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
                        onChangeUnit(e.target.value)

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
                    type="text"
                    // disabled={descriptionDisabled}
                    value={remarkValue}
                    onChange={(e) => {
                        remarkOnChange(e.target.value)
                    }}
                />}
            </div>
        </div>
    )
})
export default EventPlannerCustomSelection