import { useEffect, useState } from "react";
import { Url } from "../../env";
import InputField from "../InputField";
import SelectField from "../SelectField";

function AddBookingServices({ selectedValues, setSelectedValues }) {
    const [services, setAllService] = useState([]);
    useEffect(() => {

        const getAllServices = async () => {
            try {
                const response = await fetch(`${Url}SettingService/Get`);
                const result = await response.json();
                // console.log(result);
                setAllService(result.Services);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAllServices();
    }, []);
    // console.log(services);
    // Group services based on parentCategory
    const groupedServices = services.reduce((acc, service) => {
        const category = service.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {});
    // console.log(groupedServices);
    // const updateSelectedValues = (category, service, field, value) => {
    //     // return new Promise(resolve => {
    //     const updatedValues = [...selectedValues];

    //     const existingIndex = updatedValues.findIndex(
    //         (entry) => entry.category === category && entry.service === service
    //     );

    //     if (existingIndex !== -1) {
    //         updatedValues[existingIndex][field] = value;
    //     } else {
    //         updatedValues.push({ category, service, [field]: value });
    //     }

    //     const description = updatedValues?.find((item) => item.category === category && item.service === service)?.description || "";
    //     const qty = updatedValues?.find((item) => item.category === category && item.service === service)?.qty || 0;
    //     const price = updatedValues?.find((item) => item.category === category && item.service === service)?.price || 0;
    //     const remark = updatedValues?.find((item) => item.category === category && item.service === service)?.remark || "";
    //     const status = updatedValues?.find((item) => item.category === category && item.service === service)?.status || "";

    //     updatedValues.forEach((item) => {
    //         if (item.category === category && item.service === service) {
    //             item.totalPrice = qty * price;
    //             item.remark = remark;
    //             item.status = status;
    //             item.description = description
    //         }
    //     });

    //     setSelectedValues(updatedValues);

    //     // resolve(); // Resolve the promise after updating the state
    //     // }
    //     // );
    // };
    const updateSelectedValues = (category, service, field, value) => {
        const updatedValues = [...selectedValues];

        const existingIndex = updatedValues.findIndex(
            (entry) => entry.category === category && entry.service === service
        );

        if (existingIndex !== -1) {
            updatedValues[existingIndex][field] = value;
        } else {
            updatedValues.push({ category, service, [field]: value });
        }

        // Find the index of the newly added entry
        const newIndex = updatedValues.findIndex(
            (entry) => entry.category === category && entry.service === service
        );

        // Check if the entry exists, and if so, update the additional fields
        const filterData = services
            ?.find((s) => s.category === category && s.name === service)
        const AttributeType = filterData?.attributes.filter((e) => e.type === value);
        console.log(filterData, "filter");
        if (newIndex !== -1 && field === "name" && AttributeType) {
            // console.log(AttributeType);
            const description = AttributeType[0]?.description;
            const price = AttributeType[0]?.unitPrice;

            updatedValues[newIndex].description = description;
            updatedValues[newIndex].price = price;
            updatedValues[newIndex].color = "";
        }
        updatedValues[newIndex].totalPrice = Number(updatedValues[newIndex].qty) * Number(updatedValues[newIndex].price);
        setSelectedValues(updatedValues);
    };
    return (
        <>
            {Object.entries(groupedServices).map(([category, categoryServices], index) => {
                {/* console.log(category, categoryServices) */}
                console.log("add booking page")
                return (
                    <fieldset
                        key={index}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: "start",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            // border: "2px solid #73787c",
                            padding: "10px 25px",
                            borderRadius: "4px",
                            marginBottom: "25px",
                            backgroundColor: '#fff',
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 20,
                                marginTop: 10,
                                fontFamily: 'poppins',
                                color: '#73787c',
                                fontWeight: '600',
                                fontSize: "28px",
                                marginLeft: -10
                            }}
                        >
                            <span style={{ opacity: 0 }}>{index + 1}</span>
                            {category}
                        </div>
                        <div
                            style={{
                                width: "100%",
                                marginBottom: 15,
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                gap: 5
                            }}
                        >
                            {categoryServices.map((service, serviceIndex) => {
                                return (
                                    <div key={serviceIndex} style={{ width: "100%" }}>
                                        <div style={{
                                            width: "100%",
                                            marginBottom: 15,
                                            display: "flex",
                                            alignItems: "center",
                                            // justifyContent: "space-between",
                                            gap: '15px'
                                        }}>
                                            <div style={{ width: "50%", display: "flex", alignItems: "center", gap: '15px' }}>
                                                <SelectField
                                                    label={service.name}
                                                    placeholder={`Select ${service.name}`}
                                                    options={service.attributes.map(attribute => ({
                                                        value: attribute.type,
                                                        label: attribute.type
                                                    }))}
                                                    width={"37.5%"}
                                                    value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.name || ""}
                                                    // defaultValue={selectedValues?.find((item) => item.category === category && item.service === service.name)?.name || ""}
                                                    onChange={(value) => {
                                                        let filterData = service?.attributes.filter(e => e.type === value);
                                                        const description = filterData[0].description;
                                                        const price = filterData[0].unitPrice;
                                                        console.log(description, price);
                                                        // Update name first
                                                        updateSelectedValues(category, service.name, 'name', value)
                                                        // if (description && price) {

                                                        //     updateSelectedValues(category, service.name, 'description', description);
                                                        //     updateSelectedValues(category, service.name, 'price', price);
                                                        // }

                                                    }}
                                                />


                                                <InputField
                                                    label="Description"
                                                    placeholder="Description"
                                                    width={"37.5%"}
                                                    type="text"
                                                    value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.description}
                                                    onChange={(value) =>
                                                        updateSelectedValues(category, service.name, 'description', value.target.value)
                                                    }
                                                />
                                                <SelectField
                                                    label="Color"
                                                    placeholder="Color"
                                                    value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.color || ""}
                                                    options={service?.attributes.find(attribute => selectedValues?.find((item) => item.category === category && attribute.type === item.name))?.color.map(option => ({
                                                        value: option,
                                                        label: option
                                                    }))}
                                                    width={"25%"}
                                                    onChange={(value) =>
                                                        updateSelectedValues(category, service.name, 'color', value)
                                                    }
                                                    disabled={service?.attributes.find(attribute => selectedValues?.find((item) => item.category === category && attribute.type === item.name))?.color.length ? false : true}
                                                />
                                            </div>
                                            <div style={{ display: "flex", width: "50%", gap: '15px' }}>
                                                <InputField
                                                    label="Qty"
                                                    placeholder="Qty"
                                                    width={"15%"}
                                                    // type="number"
                                                    value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.qty || ""}
                                                    onChange={(e) => {
                                                        const input = e.target.value;
                                                        if (/^\d+$/.test(input) || input === "") {
                                                            updateSelectedValues(category, service.name, 'qty', input)
                                                        }
                                                    }}
                                                />
                                                <InputField
                                                    label="Unit Price $"
                                                    placeholder="Unit Price"
                                                    width={"35%"}
                                                    // type="number"
                                                    value={selectedValues?.find((item) => item.category === category && item.service === service.name)?.price}
                                                    onChange={(e) => {
                                                        const input = e.target.value;
                                                        if (/^\d+$/.test(input) || input === "") {
                                                            updateSelectedValues(category, service.name, 'price', input);
                                                        }
                                                    }}
                                                />

                                                <InputField
                                                    label="Total Price $"
                                                    placeholder="Total Price"
                                                    width={"40%"}
                                                    disabled={true}
                                                    value={
                                                        selectedValues?.find((item) =>
                                                            item.category === category && item.service === service.name
                                                        )?.totalPrice
                                                    }
                                                />
                                                <div style={{ alignItems: "center", width: '10%', display: "flex", gap: 3, flexDirection: "column" }}>
                                                    <label style={{ fontFamily: 'poppins', fontWeight: '500', color: "#73787c", fontSize: "0.7rem" }}>Invoice</label>
                                                    <div className="checkbox-wrapper-19" style={{ marginTop: "10px" }}>
                                                        <input
                                                            type="checkbox"
                                                            id={service.name}
                                                            defaultChecked={selectedValues?.find((item) => item.category === category && item.service === service.name)?.Invoice || false}
                                                            onChange={(e) => updateSelectedValues(category, service.name, 'Invoice', e.target.checked)}
                                                        />
                                                        <label htmlFor={service.name} className="check-box" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </fieldset>
                )
            })}
        </>
    );
}

export default AddBookingServices;