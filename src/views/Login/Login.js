import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useNavigate } from "react-router"
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import SingleButtonContainer from "../../components/Containers/SingleButtonContainer";
import { loginApiCall } from "../../api/Session";
import { setSessionId, setToken, setUserNameCookie, setUserTypeCookie } from "../../utils/Utils";
import { useRecoilState } from 'recoil';
import { token, userName as userNameAtom, userType } from '../../recoil/atom/atoms';

const Login = () => {
    const [, setTokenAtom] = useRecoilState(token);
    const [, setUserNameAtom] = useRecoilState(userNameAtom);
    const [, setUserTypeAtom] = useRecoilState(userType);
    const navigateTo = useNavigate();


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
        afterCloseModal: ()=>{}
    })

    const onError = e => {
        console.log(e.response.data);
        if(e.response?.status === 401) {
            setModalProps({
                ...modalProps,
                title: "No Autorizado!",
                show: true,
                type: "error",
                message: "Usuario o Contraseña Incorrectos!",
            })
        } else {
            setModalProps({
                ...modalProps,
                title: "ERROR!",
                show: true,
                type: "error",
                message: e.response.data.ExceptionMessage ?? e.message,
            })
        }
    }

    const onCloseModal = ()=>{
        console.log("cerrar");
        setModalProps(
            {...modalProps,
                show: false,
            }
        )
    }


    const onChangeUserName = e =>{
        setUserName(e.target.value);
    }

    const onChangePassword = e =>{
        setPassword(e.target.value);
    }

    const handleLogin = e =>{
        e.preventDefault();
        loginApiCall(userName, password)
        .then(data => {
            console.log(data.TipoUsuario);
            setToken(data.Token);
            setSessionId(data.SessionId);
            setUserTypeCookie(data.TipoUsuario)
            setUserNameCookie(userName);
            setTokenAtom(data.Token);
            setUserTypeAtom(data.TipoUsuario);
            setUserNameAtom(userName);
            navigateTo("/");
        })
        .catch(onError);
    }

    return (
        
        <>
            <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
            <h1 style={{textAlign: "center"}}>Iniciar Sesión</h1>
            <FormPageContainer>
                <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                        <small> Usuario </small>
                        <Input onChange={onChangeUserName} id="username-txt" aria-describedby="my-helper-text" value={userName} />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                        <small> Contraseña </small>
                        <Input onChange={onChangePassword} type="password" id="my-input" aria-describedby="my-helper-text" value={password} />
                    </FormControl>
                </FormGroup>
                <SingleButtonContainer>
                    <Button variant="contained" size="large" onClick={handleLogin}>Aceptar</Button>
                </SingleButtonContainer>
            </FormPageContainer>
        </>
    )
}

export default Login
