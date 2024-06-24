function CalendarLoader() {
    return (

        <div style={{
            position: "absolute", top: "50px", left: 0, height: "70%", width: "100%", backgroundColor: "rgba(250, 239, 213, 0.2)",
            backdropFilter: " blur(30px)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div className="slot-custom-loader" style={{ width: "45px", height: "45px", borderRadius: "50%", border: "4px solid transparent", borderTop: "4px solid #b78953 " }}></div>
                <h4 style={{ fontWeight: "600", fontSize: "12px",color:"#b78953" }}>Please Wait</h4>
            </div>
        </div>
    )
}
export default CalendarLoader