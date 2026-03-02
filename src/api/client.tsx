import { useAuth } from "@src/store/Auth";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// ============================================
// API CONFIGURATION
// Change this to switch between local and production
// ============================================

// Option 1: Local Development (Your Computer)
// Use this when testing on physical device
const LOCAL_IP = "192.168.0.112"; // Your computer's IP
const LOCAL_URL = `http://${LOCAL_IP}:3000/api/v1`;
const LOCAL_URL_V2 = `http://${LOCAL_IP}:3000/api/v2`;

// Option 2: Production
const PROD_URL = "https://api.myempirebymyma.com/api/v1";
const PROD_URL_V2 = "https://api.myempirebymyma.com/api/v2";

// Option 3: Render (Staging)
const RENDER_URL = "https://chinalinkexpressbackend.onrender.com/api/v1";
const RENDER_URL_V2 = "https://chinalinkexpressbackend.onrender.com/api/v2";

// ============================================
// SELECT YOUR ENVIRONMENT
// ============================================
// "local" - For testing on physical device (uses your IP)
// "render" - For Render staging
// "production" - For production

const env = "local" as "local" | "render" | "production";

const getBaseURL = () => {
   switch (env) {
      case "local":
         return LOCAL_URL;
      case "render":
         return RENDER_URL;
      case "production":
      default:
         return PROD_URL;
   }
};

export const getBaseURLV2 = () => {
   switch (env) {
      case "local":
         return LOCAL_URL_V2;
      case "render":
         return RENDER_URL_V2;
      case "production":
      default:
         return PROD_URL_V2;
   }
};

// Default config for the axios instance
const axiosParams = {
   baseURL: getBaseURL(),
   timeout: 10000,
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Add auth interceptor to v1 instance
axiosInstance.interceptors.request.use(
   function (config) {
      const token = useAuth.getState().token;
      // Only add auth header if token exists and is not empty
      if (token && token.trim() !== '') {
         config.headers.Authorization = `${token}`;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Main api function
const api = (axios: AxiosInstance) => {
   return {
      get: <T,>(url: string, config: AxiosRequestConfig = {}) =>
         axios.get<T>(url, config),
      delete: <T,>(url: string, config: AxiosRequestConfig = {}) =>
         axios.delete<T>(url, config),
      post: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
         axios.post<T>(url, body, config),
      put: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
         axios.put<T>(url, body, config),
      patch: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
         axios.patch<T>(url, body, config),
   };
};

export default api(axiosInstance);

// Create separate axios instance for v2 API
const axiosInstanceV2 = axios.create({
   baseURL: getBaseURLV2(),
   timeout: 10000,
});

// Apply same interceptors to v2
axiosInstanceV2.interceptors.request.use(
   function (config) {
      const token = useAuth.getState().token;
      // Only add auth header if token exists and is not empty
      if (token && token.trim() !== '') {
         config.headers.Authorization = `${token}`;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

axiosInstanceV2.interceptors.response.use(
   function (response) {
      return response;
   },
   async function (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
         useAuth.getState().logOut();
      }
      return Promise.reject(error);
   }
);

export const apiV2 = api(axiosInstanceV2);

// Original interceptors
axiosInstance.interceptors.request.use(
   function (config) {
      const token = useAuth.getState().token;
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
      if (error.response?.status === 401 || error.response?.status === 403) {
         useAuth.getState().logOut();
      }
      return Promise.reject(error);
   }
);
