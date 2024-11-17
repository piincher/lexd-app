import axiosInstance from '@src/api/client';
type Coordinate = {
	latitude: number;
	longitude: number;
	location: string;
	note?: string;
};

type CoordinateDetails = {
	id: string;
	title: string;
	coordinates?: Coordinate[];
};

type RouteType = {
	currentStatus: string;
	orderDetail: CoordinateDetails[];
};
const rootUrl = '/sea';
const API_URL = {
	GET_ROUTES: '/routes',
	CREATE_ROUTE: '/bulkUpload',
};

export const getSeaRoutes = async () => {
	const response = await axiosInstance.get<CoordinateDetails[]>(rootUrl + API_URL.GET_ROUTES);
	return response.data;
};
