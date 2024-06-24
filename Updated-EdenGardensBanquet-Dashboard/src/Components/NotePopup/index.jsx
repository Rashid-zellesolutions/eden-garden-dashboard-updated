import { Modal } from "antd";
import TextAreaField from "../TextAreaField";

function NotePopup({ isModalOpen, handleCancel, textValue }) {
    const calculateTextAreaHeight = () => {
        // Adjust the multiplier as needed based on your requirements
        const multiplier = 1.5;
        const minHeight = 130;
        const contentLength = textValue.length;
        const calculatedHeight = Math.max(minHeight, contentLength * multiplier);
        return calculatedHeight;
    };

    const textAreasConfig = [
        {
            showCount: false,
            maxLength: 10,
            // placeholder: `View Note`,
            // height: calculateTextAreaHeight(),
            resize: 'none',
            width: "100%",
        },
    ];
    // const handleCancelClick = () => {
    //     setTextValue("");
    //     handleCancel();
    // };
    return (
        <Modal
            title={`View Note`}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <></>
            ]}
        >
            <TextAreaField
            autoSize={{ minRows: 3, maxRows: 15 }}
                textAreas={textAreasConfig}
                value={textValue}
                // onChange={(e) => setTextValue(e.target.value)}
                // readOnly={!isEditMode}
                disabled={true}

            />
        </Modal>
    )
}
export default NotePopup