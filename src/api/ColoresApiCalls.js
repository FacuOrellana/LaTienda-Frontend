import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllColoresApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/colores");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getColorApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/colores/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveColorApiCall = async (id, marca) => {
    try {
        const response = await axios.put(rootApiRoute + "/colores/"+id, marca);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteColorApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/colores/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}