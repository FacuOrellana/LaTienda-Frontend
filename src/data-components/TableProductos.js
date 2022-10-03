import { FormControl, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllProductosApiCall } from '../api/ProductosApiCalls'
import FlexContainer from '../components/Containers/FlexContainer'
import CustomizedTables from '../components/table/Table'

const columns = [
    {
      headerText: "Codigo de Barra",
      selector: "CodigoDeBarra",
    },
    {
      headerText: "Descripcion",
      selector: "Descripcion",
    },
    {
      headerText: "Precio de Venta",
      selector: "PrecioVenta",
    },
    {
      headerText: "Marca",
      selector: "Marca",
    },
  ]
  
  const TableProductos = props => {
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [nombreProductoBuscar, setNombreProductoBuscar] = useState([]);
    
    useEffect(()=>{
        getAllProductosApiCall()
        .then(data=>{
            setData(data);
            setDataFiltered(data);
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    
    const onChangeNombreProducto = e => {
        setNombreProductoBuscar(e.target.value);
        const filtered = data.filter( p => p.CodigoDeBarra.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || p.Descripcion.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
        setDataFiltered(filtered);
        // setVenta({
        // ...venta,
        // ClienteCuit: filtered[0].Cuit,
        // })
    }

    const onProductSelect = id => {
      const producto = dataFiltered.find(p => p.CodigoDeBarra === id);
      props.onProductSelect(id, producto);
    }

    return (
        <FlexContainer flexDirection="column">
          <br/>
          <br/>
          <FormControl /* sx={{ maxWidth: "30%" }} */>
              <small> Filtrar </small>
              <Input onChange={onChangeNombreProducto} id="my-input" aria-describedby="my-helper-text" value={nombreProductoBuscar ?? ""} />
          </FormControl>
          <br/>
          <CustomizedTables height={props.height} width={props.width} rows={dataFiltered} columns={columns} onRowClick={onProductSelect} idColumn="CodigoDeBarra"/>
        </FlexContainer>
    )
  }
  
  export default TableProductos