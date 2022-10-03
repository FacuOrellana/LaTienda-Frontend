import { Button, FormControl, Input } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMarcaApiCall, getMarcaApiCall, saveMarcaApiCall } from '../../api/MarcasApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const MarcaDetail = props => {
    const navigateTo = useNavigate();

    const { marcaId } = useParams();

    const [marca, setMarca] = useState({});
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
        if(marcaId) {
            getMarcaApiCall(marcaId)
            .then((data)=>{
                console.log(data);
                setMarca(data);
            });
        }
        else {
            setMarca({Id: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteMarcaApiCall(marca.Id)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Registro '" + marca.Descripcion + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar la Marca '" + marca.Descripcion + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeDescripcion = e => {
        setMarca({...marca,
            Descripcion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/marcas");
    }

    const onSave = () => {
        saveMarcaApiCall(marca.Id, marca)
        .then(response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "Marca " + marca.Descripcion + " guardada con éxito",
                afterCloseModal: goBack
            })
        })
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
                    <FormControl sx={{ minWidth: "30%" }}>
                        <small> Código </small>
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={marca.Id ?? ""} />
                    </FormControl>
                    <FormControl sx={{ minWidth: "60%" }}>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={marca.Descripcion ?? ""} />
                    </FormControl>
                </FormGroup>
                <FormButtonsContainer>
                    <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                    <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                </FormButtonsContainer>
            </FormPageContainer>
        </>
    );
};

export default MarcaDetail;
