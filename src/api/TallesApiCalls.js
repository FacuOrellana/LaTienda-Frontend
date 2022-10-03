import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllTallesApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/talles");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getTalleApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/talles/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveTalleApiCall = async (id, talle) => {
    try {
        const response = await axios.put(rootApiRoute + "/talles/"+id, talle);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteTalleApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/talles/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}