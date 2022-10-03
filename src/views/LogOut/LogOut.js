import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutApiCall } from '../../api/Session';
import FlexContainer from '../../components/Containers/FlexContainer';
import { getSessionId } from '../../utils/Utils';

const LogOut = () => {
    const navigateTo = useNavigate();
    useEffect(()=>{
        const sessionId = getSessionId();
        console.log(sessionId);
        logoutApiCall(sessionId);
    }, [])
    return (
        <>
            <FlexContainer margin="20px">
                Se ha cerrado sesión
            </FlexContainer>
            <FlexContainer>
                <Button onClick={()=>{navigateTo("/")}} variant="contained">Continuar</Button>
            </FlexContainer>
        </>
    );
};

export default LogOut;
