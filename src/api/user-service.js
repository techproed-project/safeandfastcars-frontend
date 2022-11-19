import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
  };

export const getUser = () => {
  return axios.get(`${API_URL}/user`, { headers: authHeader() });
};


export const updateUser = (user) => {
  return axios.put(`${API_URL}/user`, user, { headers: authHeader() });
};

export const updatePassword = (passwords) => {
  return axios.patch(`${API_URL}/user/auth`, passwords, { headers: authHeader() });
};


/* ADMIN SERVICES */

export const getUsers = (page=0, size=10, sort="firstName", direction="ASC") =>{
  return axios.get(`${API_URL}/user/auth/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, { headers: authHeader() });
}

export const downloadUsers = () => {
  return axios.get(`${API_URL}/excel/download/users`, 
  { 
    headers: { 
      ...authHeader(),
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    responseType: "blob" 
  });
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};

export const updateUserById = (id, user) => {
  return axios.put(`${API_URL}/user/${id}/auth`, user, { headers: authHeader() });
};

export const deleteUserById = (id) => {
  return axios.delete(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};