import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewClienteApiCall, deleteClienteApiCall, getClienteApiCall, updateClienteApiCall } from '../../api/ClientesApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const ClienteDetail = props => {
    const navigateTo = useNavigate();

    const { clienteId } = useParams();

    const [cliente, setCliente] = useState({Condicion: 0});
    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
        afterCloseModal: ()=>{}
    })
    
    const onCloseModal = ()=>{
        console.log("cerrar");
        setModalProps(
            {...modalProps,
                show: false,
            }
        )
    }

    useEffect(()=>{
        if(clienteId) {
            getClienteApiCall(clienteId)
            .then((data)=>{
                console.log(data);
                setCliente(data);
            });
        }
        else {
            setCliente({Legajo: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteClienteApiCall(cliente.Cuit)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "El cliente '" + cliente.NombreApellido + "' fue eliminado con éxito",
                afterCloseModal: goBack,
            })
        })
    }

    
    const onConfirmDelete = () => {
        setModalProps({
            ...modalProps,
            title: "Borrar",
            show: true,
            type: "delete",
            message: "¿Está seguro que desea eliminar el cliente '" + cliente.NombreApellido + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeCuit = e => {
        setCliente({...cliente,
            Cuit: e.target.value,
        })
    }
    const onChangeRazonSocial = e => {
        setCliente({...cliente,
            RazonSocial: e.target.value,
        })
    }
    const onChangeNombreApellido = e => {
        setCliente({...cliente,
            NombreApellido: e.target.value,
        })
    }
    const onChangeTelefono = e => {
        setCliente({...cliente,
            Telefono: e.target.value,
        })
    }
    const onChangeDomicilio = e => {
        setCliente({...cliente,
            Domicilio: e.target.value,
        })
    }
    const onChangeCondicion = e => {
        setCliente({...cliente,
            Condicion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/clientes");
    }

    const onSave = () => {
        const cbOk = response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "Cliente " + cliente.NombreApellido + " guardado con éxito",
                afterCloseModal: goBack
            })
        }
        if(props.isNew){
            createNewClienteApiCall(cliente)
            .then(cbOk)
        }
        else {
            updateClienteApiCall(cliente.Cuit, cliente)
            .then(cbOk)
        }
    }

    return (
        <>
            <ModalComponent modalProps={modalProps} onCloseModal={onCloseModal}/>
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
                <FormGroup>                
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> CUIT </small>
                        <Input value={cliente.Cuit ?? ""} onChange={onChangeCuit} aria-describedby="my-helper-text"/>
                    </FormControl>

                    <FormControl sx={{ minWidth: "45%", marginBottom: "25px" }}>
                        <small> Razon Social </small>
                        <Input value={cliente.RazonSocial ?? ""} onChange={onChangeRazonSocial} aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%", marginBottom: "25px"}}>
                        <small> Apellido y Nombre </small>
                        <Input value={cliente.NombreApellido ?? ""} onChange={onChangeNombreApellido} aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%", marginBottom: "25px" }}>
                        <small> Telefono </small>
                        <Input value={cliente.Telefono ?? ""} onChange={onChangeTelefono} aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%", marginBottom: "25px" }}>
                        <small> Domicilio </small>
                        <Input value={cliente.Domicilio} onChange={onChangeDomicilio} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <Box sx={{ minWidth: "45%", marginBottom: "25px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Condicion Tributaria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cliente.Condicion ?? 0}
                                label="Condicion Tributaria"
                                onChange={onChangeCondicion}
                            >
                                <MenuItem value={0}>Responsable Insripto</MenuItem>
                                <MenuItem value={1}>Monotributista</MenuItem>
                                <MenuItem value={2}>Exento</MenuItem>
                                <MenuItem value={3}>No responsable</MenuItem>
                                <MenuItem value={4}>Consumidor Final</MenuItem>                                
                            </Select>
                        </FormControl>
                    </Box>
                </FormGroup>
                <FormButtonsContainer>
                    <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                    <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                </FormButtonsContainer>
            </FormPageContainer>
        </>
    );
};

export default ClienteDetail;