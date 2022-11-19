import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const createReservation = (carId, reservation) => {
  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: authHeader(),
  });
};

export const getReservations = (
  page = 0,
  size = 10,
  sort = "pickUpTime",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/reservations/auth/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};

export const getReservation = (reservationId) => {
  return axios.get(`${API_URL}/reservations/${reservationId}/auth`, {
    headers: authHeader(),
  });
};

/* ADMIN SERVICES */
export const getReservationsByPage = (
  page = 0,
  size = 10,
  sort = "pickUpTime",
  direction = "DESC"
) => {
  return axios.get(`${API_URL}/reservations/admin/all/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {
    headers: authHeader(),
  });
};

export const getReservationById = (reservationId) => {
  return axios.get(`${API_URL}/reservations/${reservationId}/admin`, {
    headers: authHeader(),
  });
};

export const updateReservation = (reservationId, carId, reservation) => {
  return axios.put(`${API_URL}/reservations/admin/auth?reservationId=${reservationId}&carId=${carId}`, reservation, {
    headers: authHeader(),
  });
};

export const deleteReservation = (reservationId) => {
  return axios.delete(`${API_URL}/reservations/admin/${reservationId}/auth`, {
    headers: authHeader(),
  });
};

export const downloadReservations = () => {
  return axios.get(`${API_URL}/excel/download/reservations`, 
  { 
    headers: { 
      ...authHeader(),
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    responseType: "blob" 
  });
};
