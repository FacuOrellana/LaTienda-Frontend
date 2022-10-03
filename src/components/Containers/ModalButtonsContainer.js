const ModalButtonsContainer = (props) => {
    return (
        <div style={
            {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                margin: "0 0 20px 0",
            }
        }>
            {props.children}
        </div>
    )
}

export default ModalButtonsContainer