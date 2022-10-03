const FormButtonsContainer = (props) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                margin: "0 0 20px 0",
            }}
        >
            {props.children}
        </div>
    )
}

export default FormButtonsContainer