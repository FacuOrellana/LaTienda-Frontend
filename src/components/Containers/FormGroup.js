const FormGroup = (props) => {
    return (
        <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                margin: "40px 0 40px 0",
                flexWrap: "wrap",
            }} >
            {props.children}
        </div>
    )
}

export default FormGroup
