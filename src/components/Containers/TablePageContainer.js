const TablePageContainer = (props) => {
    return (
        <div style={{ height: 400, width: '100%', display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <div style={{ maxWidth: "1000px" }}>
                {props.children}
            </div>
        </div>
    )
}

export default TablePageContainer
