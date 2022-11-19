import axios from "axios";
import {settings} from "../utils/settings"
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const sendMessage = (message) =>{
    return axios.post(`${API_URL}/contactmessage/visitors`,message);
}


export const getMessagesByPage = (
    page=0,
    size=20,
    sort="subject",
    direction="ASC",
)=>{
    return axios.get(`${API_URL}/contactmessage/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, 
    {headers:authHeader()});
}

export const getMessage = (id)=>{
    return axios.get(`${API_URL}/contactmessage/${id}`,{headers:authHeader()})
}

export const deleteMessage = (id)=>{
    return axios.delete(`${API_URL}/contactmessage/${id}`,{headers:authHeader()})
}