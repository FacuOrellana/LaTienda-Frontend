import { Button, FormControl, Input } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteColorApiCall, getColorApiCall, saveColorApiCall } from '../../api/ColoresApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const ColorDetail = props => {
    const navigateTo = useNavigate();

    const { colorId } = useParams();

    const [color, setColor] = useState({});
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
        if(colorId) {
            getColorApiCall(colorId)
            .then((data)=>{
                console.log(data);
                setColor(data);
            });
        }
        else {
            setColor({Id: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteColorApiCall(color.Id)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Color '" + color.Descripcion + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el color '" + color.Descripcion + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeDescripcion = e => {
        setColor({...color,
            Descripcion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/colores");
    }

    const onSave = () => {
        saveColorApiCall(color.Id, color)
        .then(response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "Color " + color.Descripcion + " guardada con éxito",
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
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={color.Id ?? ""} />
                    </FormControl>
                    <FormControl sx={{ minWidth: "60%" }}>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={color.Descripcion ?? ""} />
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

export default ColorDetail;
