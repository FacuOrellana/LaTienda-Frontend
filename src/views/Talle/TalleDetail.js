import { Button, FormControl, Input } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTalleApiCall, getTalleApiCall, saveTalleApiCall } from '../../api/TallesApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const TalleDetail = props => {
    const navigateTo = useNavigate();

    const { talleId } = useParams();

    const [talle, setTalle] = useState({});
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
        if(talleId) {
            getTalleApiCall(talleId)
            .then((data)=>{
                console.log(data);
                setTalle(data);
            });
        }
        else {
            setTalle({Id: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteTalleApiCall(talle.Id)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Registro '" + talle.Descripcion + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el Talle '" + talle.Descripcion + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeDescripcion = e => {
        setTalle({...talle,
            Descripcion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/talles");
    }

    const onSave = () => {
        saveTalleApiCall(talle.Id, talle)
        .then(response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "Talle " + talle.Descripcion + " guardado con éxito",
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
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={talle.Id ?? ""} />
                    </FormControl>
                    <FormControl sx={{ minWidth: "60%" }}>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={talle.Descripcion ?? ""} />
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

export default TalleDetail;
