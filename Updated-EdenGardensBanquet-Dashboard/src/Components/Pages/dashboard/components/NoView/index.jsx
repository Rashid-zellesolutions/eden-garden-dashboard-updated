function NoView() {
    return (
        <div style={{
            height: "600px", width: "100%", backdropFilter: `blur(10px)`, backgroundColor: " rgba(250, 239, 213, 0.2)", bottom: -530, left: 0, right: 0, position: "absolute", zIndex: 999
        }}>
            <h1 style={{ opacity: 0 }}>you Are not admin</h1>
        </div>
    )
}
export default NoView