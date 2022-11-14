import axios from "axios";
import {settings} from "../utils/settings"

const API_URL = settings.apiURL;

export const getVehicles = () =>{
    return axios.get(`${API_URL}/car/visitors/all`);
}

export const getVehiclesByPage = (page=0, size=10, sort="model", direction="ASC") =>{
    return axios.get(`${API_URL}/car/visitors/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
}

export const getVehicle = (id) =>{
    return axios.get(`${API_URL}/car/visitors/${id}`);
}