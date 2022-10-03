import { Button, FormControl, Input } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRubroApiCall, getRubroApiCall, saveRubroApiCall } from '../../api/RubrosApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const RubroDetail = props => {
    const navigateTo = useNavigate();

    const { rubroId } = useParams();

    const [rubro, setRubro] = useState({});
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
        if(rubroId) {
            getRubroApiCall(rubroId)
            .then((data)=>{
                console.log(data);
                setRubro(data);
            });
        }
        else {
            setRubro({Id: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteRubroApiCall(rubro.Id)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "El rubro '" + rubro.Descripcion + "' fue eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el Rubro '" + rubro.Descripcion + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeDescripcion = e => {
        setRubro({...rubro,
            Descripcion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/rubros");
    }

    const onSave = () => {
        saveRubroApiCall(rubro.Id, rubro)
        .then(response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "El Rubro " + rubro.Descripcion + " guardado con éxito",
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
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={rubro.Id ?? ""} />
                    </FormControl>
                    <FormControl sx={{ minWidth: "60%" }}>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={rubro.Descripcion ?? ""} />
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

export default RubroDetail;
