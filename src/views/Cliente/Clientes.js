import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClientesApiCall } from '../../api/ClientesApiCalls';
import FlexContainer from '../../components/Containers/FlexContainer';
//import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';

const columns = [
    {
      headerText: "CUIT",
      selector: "Cuit",
    },
    {
      headerText: "Apellido Y Nombre",
      selector: "NombreApellido",
    },
    {
      headerText: "Telefono",
      selector: "Telefono",
    },
    {
      headerText: "Razon Social",
      selector: "RazonSocial",
    },
    {
      headerText: "Domicilio",
      selector: "Domicilio",
    },
    {
        headerText: "Condicion Tributaria",
        selector: "Condicion",
    },

]

const Clientes = () => {
  const [data, setData] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
    getAllClientesApiCall()
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
            <Button variant="contained" size="large" onClick={()=>{navigateTo("/clientes/new")}}>Nuevo</Button>
        </FlexContainer>
        
        <CustomizedTables rows={data} columns={columns} onRowClick={Cuit=> navigateTo("/clientes/"+Cuit) } idColumn="Cuit"/>
    </TablePageContainer>
  );
};

export default Clientes;