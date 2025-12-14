import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { config } from "../config";
import { ErrorResponse } from "../types";
import { useAuthStore } from "../stores/authStore";


const api = axios.create({
  baseURL: config.api.url,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(config.auth.tokenKey);
    
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API] ${cfg.method?.toUpperCase()} ${cfg.url}`);

    return cfg;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(config.auth.tokenKey);
      useAuthStore.getState().logout();
      
      console.warn("[API] Unauthorized access - logging out.");
    }

    console.error(`[API Error] ${error.response?.status}:`, error.response?.data?.message);

    const apiError =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";


    return Promise.reject(new Error(apiError));
  }
);

export default api;