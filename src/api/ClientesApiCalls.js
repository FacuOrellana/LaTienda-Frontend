import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllClientesApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes");
        return response.data;
    } catch (error) {
        throw error;
    }
}
       
export const getClienteApiCall = async (cuit) => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes/?cuit="+cuit);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewClienteApiCall = async (cliente) => {
    try {
        const response = await axios.post(rootApiRoute + "/clientes", cliente);

        return response;
    } catch (error) {
        throw error;
    }
}



export const saveClienteApiCall = async (cliente) => {
    try 
     {
        const response = await axios.put(rootApiRoute + "/clientes/", cliente);
        return response;
    } 
    catch (error) 
    {
        throw error;
    }
}

export const updateClienteApiCall = async (id, cliente) => {
    try {
        const response = await axios.put(rootApiRoute + "/clientes/?cuit="+id, cliente);
        return response;
    } catch (error) {
        throw error;
    }
}


export const deleteClienteApiCall = async (cuit) => {
    try {
        const response = await axios.delete(rootApiRoute + "/clientes/?cuit="+ cuit);
        return response;
    } 
    catch (error) {
        throw error;
    }
}
