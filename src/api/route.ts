import axiosInstance from '@src/api/client';
export interface Route {
	id: string;
	title: string;
	coordinates: { latitude: number; longitude: number };
}
const rootUrl = '/route';
const API_URL = {
	GET_ROUTES: '/routes',
	CREATE_ROUTE: '/bulkUpload',
};

export const getRoutes = async () => {
	console.log('getRoutes');
	const response = await axiosInstance.get<Route[]>(rootUrl + API_URL.GET_ROUTES);
	return response.data;
};
