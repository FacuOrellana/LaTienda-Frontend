import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsuariosApiCall } from '../../api/UsuariosApiCalls';
import FlexContainer from '../../components/Containers/FlexContainer';
//import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';

const columns = [
    {
      headerText: "Legajo",
      selector: "Legajo",
    },
    {
      headerText: "Apellido Y Nombre",
      selector: "ApellidoYNombre",
    },
    {
      headerText: "UserName",
      selector: "UserName",
    },
    {
      headerText: "Email",
      selector: "Email",
    },
    {
      headerText: "Tipo Usuario",
      selector: "TipoUsuario",
    },

]

const Usuarios = () => {
  const [data, setData] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
    getAllUsuariosApiCall()
      .then(data=>{
          setData(data);
      })
      .catch(e => {
          console.log(e);
      })
  }, [])

  return(
    <TablePageContainer>
        <FlexContainer alignX="flex-end" margin="0 0 20px 0">
            <Button variant="contained" size="large" onClick={()=>{navigateTo("/usuarios/new")}}>Nuevo</Button>
        </FlexContainer>
        
        <CustomizedTables rows={data} columns={columns} onRowClick={legajo=> navigateTo("/usuarios/"+legajo) } idColumn="Legajo"/>
    </TablePageContainer>
  );
};

export default Usuarios;