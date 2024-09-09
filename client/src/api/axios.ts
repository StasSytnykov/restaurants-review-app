import axios from "axios";

const BASE_URL = "http://localhost:3005/api/v1";

export const restaurantsAxios = axios.create({
  baseURL: `${BASE_URL}/restaurants`,
});

export const defaultAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
