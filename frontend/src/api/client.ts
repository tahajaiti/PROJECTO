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

    let code: "UNAUTHORIZED" | "NOT_FOUND" | "FORBIDDEN" | "UNKNOWN" = "UNKNOWN";

    switch (status) {
      case 404:
        code = "NOT_FOUND";
        break;
      case 401:
        useAuthStore.getState().logout();
        code = "UNAUTHORIZED";
        break;
      case 403:
        code = "FORBIDDEN";
        break;
      default:
        code = "UNKNOWN";
        break;
    }

    console.error(`[API Error] ${error.response?.status}:`, error.response?.data?.message);

    const apiError =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An unexpected error occurred. Please try again later.";

    const validationErrors = error.response?.data?.validationErrors;
    if (validationErrors) {
      console.error("Validation Errors:", validationErrors);
    }

    return Promise.reject({ code, message: apiError, validationErrors });
  }
);

export default api;
