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
    const token = useAuthStore.getState().token;

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

    let code: "UNAUTHORIZED" | "FORBIDDEN" | "UNKNOWN" = "UNKNOWN";

    if (status === 401) {
      useAuthStore.getState().logout();
      code = "UNAUTHORIZED";
    }

    if (status === 403) {
      code = "FORBIDDEN";
    }

    console.error(`[API Error] ${error.response?.status}:`, error.response?.data?.message);

    const apiError =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An unexpected error occurred. Please try again later.";

    return Promise.reject({ code, message: apiError });
  }
);

export default api;
