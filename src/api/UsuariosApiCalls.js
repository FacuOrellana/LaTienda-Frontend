import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllUsuariosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getUsuarioApiCall = async (Legajo) => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios/?legajo="+Legajo);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewUsuarioApiCall = async (usuario) => {
    try {
        const response = await axios.post(rootApiRoute + "/usuarios/", usuario);
        return response;
    } catch (error) {
        throw error;
    }
}

export const saveUsuarioApiCall = async (legajo, usuario) => {
    try {
        const response = await axios.put(rootApiRoute + "/usuarios/?legajo="+legajo, usuario);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteUsuarioApiCall = async (Legajo) => {
    try {
        const response = await axios.delete(rootApiRoute + "/usuarios/?legajo="+Legajo);
        return response;
    } catch (error) {
        throw error;
    }
}