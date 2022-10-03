import { Button, CircularProgress, FormControl, Input,InputAdornment,InputLabel,MenuItem,Select,/* , InputLabel, MenuItem, Select  */
TextField} from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { deleteProductoApiCall, getProductoApiCall, saveProductoApiCall } from "../../api/ProductosApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import FlexContainer from "../../components/Containers/FlexContainer";
import { getAllMarcasApiCall } from "../../api/MarcasApiCalls";
import { getAllRubrosApiCall } from "../../api/RubrosApiCalls";
import { Box } from "@mui/system";
import { checkOnlyNumbers } from "../../utils/Utils";

export const ProductoDetail = (props) => {
    const navigateTo = useNavigate();

    const { productoId } = useParams();

    const [producto, setProducto] = useState({
        CodigoDeBarra: 0,
        MarcaId: 0,
        RubroId: 0,
    });
    const [netoGravado, setNetoGravado] = useState();
    const [precioVenta, setPrecioVenta] = useState();
    const [IVATotal, setIVATotal] = useState();
    const [marcas, setMarcas] = useState();
    const [rubros, setRubros] = useState([]);

    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
        afterCloseModal: ()=>{}
    })

    useState(()=>{
        getAllMarcasApiCall()
        .then((data)=>{
            console.log(data);
            setMarcas(data);
        });
        getAllRubrosApiCall()
        .then((data)=>{
            console.log(data);
            setRubros(data);
        });
        if(props.isNew) {
            // setProducto({
            //     CodigoDeBarra: 0,
            //     MarcaId: 0,
            //     RubroId: 0,
            // });
            console.log(producto.RubroId)
            console.log(producto.MarcaId)
        } else {
            getProductoApiCall(productoId)
            .then((data)=>{
                console.log(data);
                setProducto(data);
            });
        }
    }, [])

    useEffect(()=>{
        console.log(producto);
        var costo = parseFloat(producto.Costo);
        var piva = parseFloat(producto.PorcentajeIVA);
        var mg = parseFloat(producto.MargenDeGanancia);
        var ng = parseFloat(costo + (costo * mg / 100));
        var iva = parseFloat(ng * piva / 100);
        var pfv = parseFloat(ng + iva);
        setNetoGravado(ng);
        setIVATotal(iva);
        setPrecioVenta(pfv);
    },[producto])
    
    const onCloseModal = ()=>{
        setModalProps(
            {...modalProps,
                show: false,
            }
        )
    }

    const onError = e => {
        console.log(e);
        setModalProps({
            ...modalProps,
            title: "¡ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    const onConfirmDelete = () => {
        deleteProductoApiCall(producto.CodigoDeBarra)
        .then(data=>{
            console.log(data);
            goBack();
        })
        .catch(onError);
    }

    const onChangeCodigoDeBarra = (e) => {
        setProducto({...producto,
            CodigoDeBarra: e.target.value,
        })
    }
    
    const onChangeDescripcion = (e) => {
        setProducto({...producto,
            Descripcion: e.target.value,
        })
    }

    const onChangeIVA = (e) => {
        setProducto({...producto,
            PorcentajeIVA: e.target.value,
        })
    }
    const onChangeCosto = (e) => {
        setProducto({...producto, Costo: e.target.value})
    }
    const onChangeMargenDeGanancia = (e) => {
        setProducto({...producto, MargenDeGanancia: e.target.value})
    }
    
    const goBack = () => {
        navigateTo("/productos");
    }

    const handleChangeMarca = event => {
        var marc = marcas.find(marca => marca.Id === event.target.value);
        console.log(marc);
        setProducto({...producto,
            MarcaId: event.target.value,
            Marca: marc,
        });
    }

    const handleChangeRubro = event => {
        var rubr = rubros.find(marca => marca.Id === event.target.value);
        console.log(rubr);
        setProducto({...producto,
            RubroId: event.target.value,
            Rubro: rubr,
        });
    }

    const onSave = () => {
        saveProductoApiCall(producto)
        .then(response => {
            console.log(response);
        })
    }

    return (
        <>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de Producto</h1>
                <FormPageContainer>
                    {
                        !props.isNew?
                        <FormGroup>
                            <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                                Eliminar
                                <DeleteIcon fontSize="inherit" />
                            </Button>
                        </FormGroup>
                        : <></>
                    }
                    <FormControl sx={{ minWidth: "30%" }}>
                        <small> Id </small>
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={producto.Id ?? ""} />
                    </FormControl>
                    <FormGroup>
                        <FormControl sx={{ minWidth: "30%" }}>
                            <small> Código De Barra </small>
                            <Input onChange={onChangeCodigoDeBarra} id="my-input" aria-describedby="my-helper-text" disabled={!props.isNew} value={producto.CodigoDeBarra ?? ""} />
                        </FormControl>
                        <FormControl sx={{ minWidth: "60%" }}>
                            <small> Descripción </small>
                            <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={producto.Descripcion ?? ""} />
                        </FormControl>
                    </FormGroup>
                    <FlexContainer alignX='space-between'>
                        <TextField
                            label="Costo"
                            onChange={onChangeCosto}
                            onKeyPress={checkOnlyNumbers}
                            id="costo-input"
                            value={producto.Costo ?? ""} 
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                        />
                        <TextField
                            label="Margen de Ganancia"
                            onChange={onChangeMargenDeGanancia}
                            onKeyPress={checkOnlyNumbers}
                            id="margen-de-ganancia-input"
                            value={producto.MargenDeGanancia ?? ""} 
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                inputProps: {
                                    // style: { textAlign: "right" },
                                }
                            }}
                        />
                        <TextField
                            label="IVA"
                            onChange={onChangeIVA}
                            onKeyPress={checkOnlyNumbers}
                            id="porcentaje-iva-input"
                            value={producto.PorcentajeIVA ?? ""}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                inputProps: {
                                    // style: { textAlign: "right" },
                                }
                            }}
                        />
                    </FlexContainer>
                    <FlexContainer alignX='space-between'>
                        <TextField
                            label="IVA Total"
                            disabled
                            id="iva-input"
                            value={!isNaN(IVATotal) ? IVATotal : ""}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Neto Gravado"
                            disabled
                            id="neto-gravado-input"
                            value={!isNaN(netoGravado) ? netoGravado : ""}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Precio Final Venta"
                            id="precio-venta-input"
                            value={!isNaN(precioVenta) ? precioVenta : ""}
                            sx={{ m: 1, width: '25ch' }}
                            color="secondary"
                            focused
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <FormGroup>
                        {
                            producto.MarcaId !== undefined && marcas ?
                            <>
                                <Box sx={{ minWidth: "40%" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                                        <Select
                                            disabled={props.isAssociate}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={producto.MarcaId}
                                            value={producto.MarcaId}
                                            onChange={handleChangeMarca}
                                        >
                                            {
                                                marcas.map((marca, index) => {
                                                    return <MenuItem key={index} value={marca.Id}>{marca.Descripcion}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </> : 
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        }
                        {
                            producto.RubroId !== undefined && rubros ?
                            <>
                                <Box sx={{ minWidth: "40%" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Rubro</InputLabel>
                                        <Select
                                            disabled={props.isAssociate}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={producto.RubroId}
                                            value={producto.RubroId}
                                            onChange={handleChangeRubro}
                                        >
                                            {
                                                rubros.map((rubro, index) => {
                                                    return <MenuItem key={index} value={rubro.Id}>{rubro.Descripcion}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </> : 
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        }
                        </FormGroup>
                    </FlexContainer>
                    <FormButtonsContainer>
                        <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                        <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                    </FormButtonsContainer>
                </FormPageContainer>
            {/* </LocalizationProvider> */}
        </>
    )
}