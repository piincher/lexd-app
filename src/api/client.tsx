import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// Default config for the axios instance
const env = 'development' as string;
const axiosParams = {
	// Set different base URL based on the environment
	baseURL: env === 'development' ? 'https://api.myempirebymyma.com/api/v1' : 'https://www.homely-prod.me/api/v1',
};
// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);
// Main api function
const api = (axios: AxiosInstance) => {
	return {
		get: <T,>(url: string, config: AxiosRequestConfig = {}) => axios.get<T>(url, config),
		delete: <T,>(url: string, config: AxiosRequestConfig = {}) => axios.delete<T>(url, config),
		post: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) => axios.post<T>(url, body, config),
		put: <T,>(url: string, body: unknown, config: AxiosRequestConfig = {}) => axios.put<T>(url, body, config),
	};
};

export default api(axiosInstance);
