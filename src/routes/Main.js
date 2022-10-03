import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../views/Home/Home';
import {  useRecoilState } from 'recoil';
import { token, userName, userType } from "../recoil/atom/atoms";
import { getToken, getUserName, getUserType, setToken, setUserNameCookie, setUserTypeCookie } from '../utils/Utils';
import NavBar from '../components/NavBar/NavBar';
import Login from '../views/Login/Login';
import LogOut from '../views/LogOut/LogOut';
import Productos from '../views/Productos/Productos';
import { ProductoDetail } from '../views/Productos/ProductoDetail';
import Marcas from '../views/Marca/Marcas';
import MarcaDetail from '../views/Marca/MarcaDetail';
import Talles from '../views/Talle/Talles';
import TalleDetail from '../views/Talle/TalleDetail';
import NewVenta from '../views/Ventas/NewVenta';
import PrivateRoute from './PrivateRoute';
import Colores from '../views/Color/Colores';
import ColorDetail from '../views/Color/ColorDetail';
import Rubros from '../views/Rubro/Rubro';
import RubroDetail from '../views/Rubro/RubroDetail';
import UsuarioDetail from '../views/Usuario/UsuarioDetail';
import Usuarios from '../views/Usuario/Usuarios';
import Ventas from '../views/Ventas/Ventas';
import Clientes from '../views/Cliente/Clientes';
import ClienteDetail from '../views/Cliente/ClienteDetail';


const routesAdmin = [
  {
      text: "Home",
      path: "/"
  },
  {
      text: "Productos",
      path: "/productos"
  },
  {
    text: "Marcas",
    path: "/marcas"
  },
  {
    text: "Colores",
    path: "/colores"
  },
  {
    text: "Rubros",
    path: "/rubros"
  },
  {
    text: "Talles",
    path: "/talles"
  },
  {
    text: "Usuarios",
    path: "/usuarios"
  },
  {
    text: "Clientes",
    path: "/clientes"
  },
];

const routesSalesMan = [
  {
      text: "Home",
      path: "/"
  },
  {
      text: "Nueva Venta",
      path: "/ventas/new"
  },
]
const Main = () => {
  const [routes, setRoutes] = useState();

  const [tokenAtom, setTokenAtom] = useRecoilState(token);
  const [userTypeState, setUserTypeState] = useRecoilState(userType);
  const [userNameState, setUserNameState] = useRecoilState(userName);

  useEffect(()=>{
      setTokenAtom( getToken() );
      setUserTypeState( getUserType() );
      setUserNameState( getUserName() );
      console.log(getUserType());
      setRoutes(userTypeState === "Administrador" ? routesAdmin : routesSalesMan);
      console.log(userTypeState);
  }, [setTokenAtom, setUserNameState, setUserTypeState, userTypeState]);

  const closeSession = ()=>{
    setTokenAtom("");
    setToken("");
    setUserTypeState("");
    setUserTypeCookie("");
    setUserNameState("");
    setUserNameCookie("");
  }

  return (
    <Router>
        <NavBar userName={userNameState} closeSession={closeSession} thereIsAnyToken={tokenAtom} routes={routes}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/logout" element={<LogOut />}/>
          <Route path="/productos">
            <Route path="" element={
              // <PrivateRoute userTypeRequired="Administrador">
                <Productos />
              // </PrivateRoute>
            }/>
            <Route path=":productoId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ProductoDetail />
              </PrivateRoute>
            }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ProductoDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>
          <Route path="/marcas">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Marcas />
              </PrivateRoute>
              }/>
            <Route path=":marcaId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <MarcaDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <MarcaDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>

          <Route path="/colores">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Colores />
              </PrivateRoute>
              }/>
            <Route path=":colorId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ColorDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ColorDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>

          <Route path="/rubros">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Rubros />
              </PrivateRoute>
              }/>
            <Route path=":rubroId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <RubroDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <RubroDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>
         
          <Route path="/usuarios">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Usuarios />
              </PrivateRoute>
              }/>
            <Route path=":usuarioId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <UsuarioDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <UsuarioDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>

          <Route path="/clientes">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Clientes />
              </PrivateRoute>
              }/>
            <Route path=":clienteId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ClienteDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <ClienteDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>
         
          <Route path="/ventas">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Ventas />
              </PrivateRoute>
            }/>
            <Route path=":ventaId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Ventas/>
              </PrivateRoute>
            }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Vendedor">
                <NewVenta />
              </PrivateRoute>
            }/>
          </Route>

          <Route path="/talles">
            <Route path="" element={
              <PrivateRoute userTypeRequired="Administrador">
                <Talles />
              </PrivateRoute>
              }/>
            <Route path=":talleId" element={
              <PrivateRoute userTypeRequired="Administrador">
                <TalleDetail />
              </PrivateRoute>
              }/>
            <Route path="new" element={
              <PrivateRoute userTypeRequired="Administrador">
                <TalleDetail isNew={true} />
              </PrivateRoute>
            }/>
          </Route>
        </Routes>
    </Router>
  );
};

export default Main;
