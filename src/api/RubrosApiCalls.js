import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllRubrosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/rubros");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getRubroApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/rubros/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveRubroApiCall = async (id, marca) => {
    try {
        const response = await axios.put(rootApiRoute + "/rubros/"+id, marca);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteRubroApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/rubros/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}