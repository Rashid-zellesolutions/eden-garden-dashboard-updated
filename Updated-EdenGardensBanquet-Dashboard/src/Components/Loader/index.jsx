import { Spin } from "antd"

function Loader() {
    return (
        // <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "end" }}>

        <div style={{
            position: "fixed", backdropFilter: "blur(5px)", width: "100%", cursor: "not-allowed",
            zIndex: 9999, bottom: 0, top: 0, left: 0, right: 0, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <Spin style={{ color: "#b78953", background: "#b78953" }} wrapperClassName="spin-color" size="large">
                <div className="content" style={{ color: "#b78953" }} />
            </Spin>
        </div>
        // </div>
    )
}
export default Loader