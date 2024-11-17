import { useAuth } from "@src/store/Auth";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// Default config for the axios instance
const env = "development" as string;
const axiosParams = {
   // Set different base URL based on the environment
   baseURL:
      env === "development"
         ? "https://chinalinkexpressbackend.onrender.com/api/v1"
         : "https://api.myempirebymyma.com/api/v1",
};
// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);
// Main api function
const api = (axios: AxiosInstance) => {
   return {
      get: <T,>(url: string, config: AxiosRequestConfig = {}) => axios.get<T>(url, config),
      delete: <T,>(url: string, config: AxiosRequestConfig = {}) => axios.delete<T>(url, config),
      post: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
         axios.post<T>(url, body, config),
      put: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
         axios.put<T>(url, body, config),
   };
};

export default api(axiosInstance);

axiosInstance.interceptors.request.use(
   function (config) {
      // Get the token from wherever you have stored it (Zustand)
      const token = useAuth.getState().token;

      // Attach the Authorization header to the request
      if (token) {
         config.headers.Authorization = `${token}`;
      }

      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   function (response) {
      return response;
   },
   async function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
         useAuth.getState().logOut();
      }

      return Promise.reject(error);
   }
);
