import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductosApiCall } from '../../api/ProductosApiCalls';
import FlexContainer from '../../components/Containers/FlexContainer';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';
import TableProductos from '../../data-components/TableProductos';


const Productos = () => {
  const navigateTo = useNavigate();


  return(
    <TablePageContainer>
      <FlexContainer alignX="flex-end" margin="0 0 20px 0">
          <Button variant="contained" size="large" onClick={()=>{navigateTo("/productos/new")}}>Nuevo</Button>
      </FlexContainer>
      <TableProductos onProductSelect={id=>navigateTo("/productos/"+id)}/>
    </TablePageContainer>
  );
};

export default Productos;
