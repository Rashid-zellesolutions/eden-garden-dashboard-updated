import React, { useState } from "react";
import { Button, Modal } from "antd";
import TextAreaField from "../TextAreaField";

function LongDescriptionPopup({ isModalOpen, handleCancel, heading, disabled }) {
    const defaultText = "hello"; // Default value
    const [textValue, setTextValue] = useState(defaultText);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleOkClick = () => {
        setIsEditMode(false);
        handleCancelClick()
        // Handle any other actions you need on Ok click
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
        handleCancel();
    };

    const textAreasConfig = [
        {
            showCount: false,
            maxLength: 10,
            placeholder: `${heading} Detail`,
            height: 130,
            resize: 'none',
            width: "100%",
        },
    ];

    return (
        <Modal
            title={`${heading} Detail`}
            open={isModalOpen}
            onCancel={handleCancelClick}
            footer={[
                !isEditMode && (
                    <Button key="edit" onClick={handleEditClick} style={{ borderColor: "#73787c", color: "#000" }} disabled={disabled}>
                        Edit
                    </Button>
                ),
                <Button key="ok" type="primary" style={{ background: "#b78953" }} onClick={handleOkClick}>
                    Ok
                </Button>,
            ]}
        >
            <TextAreaField
                textAreas={textAreasConfig}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                readOnly={!isEditMode}
                disabled={disabled}
            />
        </Modal>
    );
}

export default LongDescriptionPopup;
