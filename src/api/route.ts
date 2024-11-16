import axiosInstance from '@src/api/client';
type Coordinate = {
	latitude: number;
	longitude: number;
	location: string;
	note?: string;
};

type CoordinateDetails = {
	id: string;
	status: string;
	coordinates: Coordinate[];
};

type RouteType = {
	currentStatus: string;
	orderDetail: CoordinateDetails[];
};
const rootUrl = '/route';
const API_URL = {
	GET_ROUTES: '/routes',
	CREATE_ROUTE: '/bulkUpload',
};

export const getRoutes = async () => {
	const response = await axiosInstance.get<RouteType[]>(rootUrl + API_URL.GET_ROUTES);
	return response.data;
};
