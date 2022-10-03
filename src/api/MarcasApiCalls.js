import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllMarcasApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/marcas");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getMarcaApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/marcas/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveMarcaApiCall = async (id, marca) => {
    try {
        const response = await axios.put(rootApiRoute + "/marcas/"+id, marca);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteMarcaApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/marcas/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}