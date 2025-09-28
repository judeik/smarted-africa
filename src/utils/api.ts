// src/utils/api.ts
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Create Axios instance with defaults
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1", // backend base URL
  withCredentials: true, // include cookies (HTTP-only refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Extend request config to include _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Auto-refresh token interceptor
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // If 401 (unauthorized) and request not retried yet → try refresh
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        // Refresh token request
        await api.post("/auth/refresh");

        // Retry original request with new access token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
