import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTallesApiCall } from '../../api/TallesApiCalls';
import FlexContainer from '../../components/Containers/FlexContainer';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';

const columns = [
    {
      headerText: "Código",
      selector: "Id",
    },
    {
      headerText: "Descripción",
      selector: "Descripcion",
    }
]

const Talles = () => {
  const [data, setData] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
    getAllTallesApiCall()
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
            <Button variant="contained" size="large" onClick={()=>{navigateTo("/talles/new")}}>Nuevo</Button>
        </FlexContainer>
        
        <CustomizedTables rows={data} columns={columns} onRowClick={id=> navigateTo("/talles/"+id) } idColumn="Id"/>
    </TablePageContainer>
  );
};

export default Talles;