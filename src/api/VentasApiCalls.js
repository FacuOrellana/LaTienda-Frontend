import axios from "axios"
import { getToken } from "../utils/Utils";
import { rootApiRoute } from "./GlobalApiConfs";


const headers = {
    headers: {
        'Authorization': getToken()
    }
}

export const newVentaApiCall = async (venta) => {
    try {
        const response = await axios.post(rootApiRoute + "/ventas", venta, headers);
        return response;
    } catch (error) {
        throw error;
    }
}
export const getAllVentasApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/ventas", headers);
        return response.data;
    } catch (error) {
        throw error;
    }
}