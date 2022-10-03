import { Button, CircularProgress, FormControl, FormGroup, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexContainer from '../../components/Containers/FlexContainer';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import ModalComponent from '../../components/Modal/ModalComponent';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import { Box } from '@mui/system';
import { getAllClientesApiCall } from '../../api/ClientesApiCalls';
import { useNavigate } from 'react-router-dom';
import { checkOnlyNumbers, getUserName } from '../../utils/Utils';
import CustomizedTables from '../../components/table/Table';
import TableProductos from '../../data-components/TableProductos';
import { newVentaApiCall } from '../../api/VentasApiCalls';

const columns = [
  {
    selector: "Cuit",
    headerText: "CUIT",
  },
  {
    selector: "NombreApellido",
    headerText: "Nombre y Apellido",
  },
]

const productColumns = [
  {
    headerText: "Descripcion",
    selector: "Descripcion",
  },
  {
    headerText: "Precio Unitario",
    selector: "PrecioUnitario",
  },
  {
    headerText: "Cantidad",
    selector: "Cantidad",
  },
  {
    headerText: "SubTotal",
    selector: "SubTotal",
  },
]

const NewVenta = _props => {
  const navigateTo = useNavigate();

  const [venta, setVenta] = useState({
    ClienteCUIT: "20000000000",
    User: getUserName(),
    MedioDePago: 1,
    TipoFacturaId: 1,
  });

  const [montoTotal, setMontoTotal] = useState(0);

  const [saleLines, setSaleLines] = useState([]);
  const [nombreClienteBuscar, setNombreClienteBuscar] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clientesFiltered, setClientesFiltered] = useState([]);

  const [selectedSaleLine, setSelectedSaleLine] = useState();
  const [selectedProducto, setSelectedProducto] = useState();
  const [quantity, setQuantity] = useState(0);

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

  const onError = e => {
      console.log(e);
      setModalProps({
          ...modalProps,
          title: "¡ERROR!",
          show: true,
          type: "error",
          message: e.message,
      })
  }


  useEffect(()=>{
    getAllClientesApiCall()
    .then((data)=>{
      setClientes(data);
      setClientesFiltered(data);
    })
  }, [])

  const onChangeNombreCliente = e => {
    setNombreClienteBuscar(e.target.value);
    const filtered = clientes.filter( c => c.Cuit.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || c.NombreApellido.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
    setClientesFiltered(filtered);
    console.log(filtered[0].Cuit);
    setVenta({
      ...venta,
      ClienteCuit: filtered[0].Cuit,
      Cliente: filtered[0],
    })
  }

  const onChangeCantidad = e => {
    setQuantity(e.target.value);
  }

  const handleChangeCliente = event => {
      var client = clientes.find(cliente => cliente.Cuit === event.target.value);
      console.log(client);
      setVenta({...venta,
          ClienteCUIT: event.target.value,
          Cliente: client,
      });
  }
  const handleChangeClienteSeleccionado = id => {
    var client = clientes.find(cliente => cliente.Cuit === id);
    setVenta({...venta,
        ClienteCUIT: id,
        Cliente: client,
    });
  }

  const onProductSelect = (_id, producto) =>{
    // setQuantity(0);
    setSelectedProducto(producto);
  }
  
  const onSaleLineSelect = codigoDeBarra =>{
    const saleLine = saleLines.find(sl => sl.CodigoDeBarra === codigoDeBarra);
    setSelectedSaleLine(saleLine);
  }

  const selectedProductoIsNotInSale = ()=>{
    const pr = saleLines.find(p => p.CodigoDeBarra === selectedProducto.CodigoDeBarra);
    return pr === undefined;
  }
  const shouldEnableAddSaleLine = ()=>{
    return (selectedProducto && quantity > 0 && selectedProductoIsNotInSale()) ? true : false
  }
  const addSaleLine = () => {
    if(shouldEnableAddSaleLine()){
      const subTotal = (parseFloat(quantity)) * (parseFloat(selectedProducto.PrecioVenta));
      const saleLine = {
        CodigoDeBarra: selectedProducto.CodigoDeBarra,
        Descripcion: selectedProducto.Descripcion,
        PrecioUnitario: selectedProducto.PrecioVenta,
        Cantidad: quantity,
        SubTotal: subTotal,
      };
      setSaleLines([...saleLines, saleLine]);
    }
  }

  const shouldEnableRemoveSaleLine = ()=>{
    return (selectedSaleLine && saleLines.length > 0) ? true : false
  }
  const removeSaleLine = () => {
    const saleLinesAux = saleLines.filter(saleLine => saleLine.CodigoDeBarra !== selectedSaleLine.CodigoDeBarra);
    setSaleLines(saleLinesAux);
  }
  
    
  const goBack = () => {
    navigateTo("/home");
  }

  useEffect(()=>{
    setVenta(v => {
      return {...v,
        LineasDeVenta: saleLines
      }
    });
    let total = 0;
    saleLines.forEach(saleLine => {
      total += saleLine.SubTotal;
    });
    setMontoTotal(total);
  }, [saleLines]);

  useEffect(()=>{
    console.log(venta);
  }, [venta]);

  const onSave = () => {
    newVentaApiCall(venta)
    .then(response => {
        console.log(response);
    })
    .catch(onError)
  }

  return(
    <FlexContainer>
        <>
          <h1>Nueva Venta</h1>
          <ModalComponent modalProps={modalProps} onCloseModal={onCloseModal}/>
          <FormPageContainer>
              <FormGroup>
                <FormControl /* sx={{ maxWidth: "30%" }} */>
                  <small> Filtrar </small>
                  <Input onChange={onChangeNombreCliente} id="my-input" aria-describedby="my-helper-text" value={nombreClienteBuscar ?? ""} />
                </FormControl>
                {
                  venta.ClienteCUIT !== undefined && clientesFiltered.length > 0 ?
                  <CustomizedTables
                    rows={clientesFiltered}
                    columns={columns}
                    idColumn="Cuit"
                    onRowClick={id=>{handleChangeClienteSeleccionado(id)}}
                    height={150}
                  /> :
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                  // <>
                  //   <Box sx={{ maxWidth: "60%" }}>
                  //     <FormControl fullWidth>
                  //       <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                  //       <Select
                  //         disabled={props.isAssociate}
                  //         labelId="demo-simple-select-label"
                  //         id="demo-simple-select"
                  //         defaultValue={venta.ClienteCuit}
                  //         value={venta.ClienteCuit}
                  //         onChange={handleChangeCliente}
                  //       >
                  //         {
                  //           clientesFiltered.map((cliente, index) => {
                  //             console.log(cliente);
                  //             return <MenuItem key={index} value={cliente.Cuit}>{cliente.NombreApellido}</MenuItem>
                  //           })
                  //         }
                  //       </Select>
                  //     </FormControl>
                  //   </Box>
                  // </> 
                }
                <br/>
                <FormControl disabled /* sx={{ maxWidth: "30%" }} */>
                  <InputLabel> Cliente </InputLabel>
                  <Input onChange={onChangeNombreCliente} id="my-input" aria-describedby="my-helper-text" value={venta?.Cliente?.NombreApellido ?? ""} />
                </FormControl>
              </FormGroup>
              <FlexContainer alignX="space-between">
                <TableProductos onProductSelect={(id, producto)=>onProductSelect(id, producto)} width={400}/>
                <FlexContainer flexDirection="column" alignX="center" alignY="center">
                  <FormControl>
                    Producto
                    <Input value={selectedProducto?.Descripcion ?? ""} disabled/>
                  </FormControl>
                  <br/>
                  <FormControl>
                    <FlexContainer alignY="flex-end" alignX="space-between" style={{maxWidth: 220}}>
                      <Box sx={{maxWidth: 100}}>
                        Cantidad
                        <Input
                          onKeyPress={checkOnlyNumbers}
                          onChange={onChangeCantidad}
                          value={quantity}/>
                      </Box>
                      <Button variant="outlined" size="small" disabled={!shouldEnableAddSaleLine()} onClick={addSaleLine}>Agregar</Button>
                    </FlexContainer>
                    <br/>
                    <FlexContainer style={{minWidth: 200}} alignX="flex-end">
                      <Box sx={{minWidth: 70}}>
                        <Button variant="outlined" color="error" size="small" disabled={!shouldEnableRemoveSaleLine()} onClick={removeSaleLine}>Quitar</Button>
                      </Box>
                    </FlexContainer>
                  </FormControl>
                </FlexContainer>
                <FlexContainer alignY="start">
                  <CustomizedTables height={300} width={400} columns={productColumns} rows={saleLines} idColumn="CodigoDeBarra" onRowClick={onSaleLineSelect}/>
                </FlexContainer>
              </FlexContainer>
              <FlexContainer alignY="flex-end" alignX="flex-end">
                <Box sx={{maxWidth: 200}}>
                  Monto Total de la Venta:
                  <TextField
                    value={montoTotal}
                    color="secondary"
                    focused
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputProps: {
                        style: { textAlign: "right" },
                      }
                  }}
                  />
                </Box>
              </FlexContainer>
              <FormButtonsContainer width="350px">
                <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                <Button variant="contained" size="large" onClick={onSave}>Confirmar Venta</Button>
              </FormButtonsContainer>
          </FormPageContainer>
        </>
    </FlexContainer>
  );
};

export default NewVenta;
