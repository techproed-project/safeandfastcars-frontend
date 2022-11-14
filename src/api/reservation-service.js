import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const createReservation = (carId, reservation) => {
  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: authHeader(),
  });
};
