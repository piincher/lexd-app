import api from '@src/api/client';
import { LIMIT } from '@src/constants/Dimensions';
import { SmsService } from '@src/constants/types';

export type imagesType = { url: string; public_id: string }[];

export type productType = {
	clientName: string;
	clientPhone: string;
	packageWeight?: number;
	priceTotal?: number;
	partenaire: string;
	_id?: string | undefined;
	images?: imagesType;
	status?: string;
	quantity?: number;
	shippingMode?: string;
	createdAt?: string;
	typeOfPackage?: string;
	currentPosition?: {
		id: string;
		title: string;
	};
	orderId?: string;
	code?: string;
	route?: Array<{ id: string; title: string; time: string; coordinates: { latitude: number; longitude: number } }>;
	dateOfReception?: string;
	userId: string;
	departureDate: string;
};

const API_URL = {
	GET_ORDER: '/order/search',
	CREATE_ORDER: '/order/create',
	UPDATE_ORDER: '/order',
	getOrdersFromAUser: '/order/one',
	getActiveOrders: '/order',
	getActiveOrdersAdmin: '/order/all',
	single: '/order',
	viewSmsBalance: '/order/viewSmsBalance',
};

interface CheckRoute {
	code: string;
}
export const CheckRoute = async (data: CheckRoute) => {
	const response = await api.post<{ route: Array<string>; updatedAt: string }>(API_URL.GET_ORDER, data);
	return response.data;
};

export const placeOrder = async ({
	clientName,
	clientPhone,
	packageWeight,
	priceTotal,
	status,
	images,
	typeOfPackage,
	partenaire,
	quantity,
	shippingMode,
	currentPosition,
	userId,
	departureDate,
}: productType) => {
	const data = {
		clientName,
		clientPhone,
		packageWeight,
		priceTotal,
		status,
		images,
		typeOfPackage,
		partenaire,
		quantity,
		shippingMode,
		currentPosition,
		userId,
		departureDate,
	};

	return await api.post<productType>(`${API_URL.CREATE_ORDER}`, data);
};

export const updateOrder = async (data: productType) => {
	return await api.put<productType>(`${API_URL.UPDATE_ORDER}/${data.orderId}/update`, data);
};

export const getActiveOrders = async (page: number, status: string) => {
	console.log('page', status);
	const response = await api.get<productType[]>(
		`${API_URL.getOrdersFromAUser}?status=${status}&limit=${LIMIT}&page=${page}`
	);
	return response.data;
};

export const fetchSmsBalance = async () => {
	const response = await api.get<SmsService[]>(API_URL.viewSmsBalance);
	return response.data;
};

export const getActiveOrdersAdmin = async (page: number, Status: string) => {
	const response = await api.get<productType[]>(
		`${API_URL.getActiveOrdersAdmin}?status=${Status}&limit=${LIMIT}&page=${page}`
	);
	return response.data;
};
export const getOrderDetails = async (id: string) => {
	console.log('id', id);
	const response = await api.get<productType>(`${API_URL.single}/${id}/single`);
	return response.data;
};
export const updateOrderToDelivered = async (data: productType) => {
	const response = await api.put<productType>(`${API_URL.UPDATE_ORDER}/${data.orderId}/delivered`, data);
	return response.data;
};

interface sendNotificationSms {
	phoneNumbers: string[];
	message: string;
}
export const sendNotificationSms = async (data: sendNotificationSms) => {
	const response = await api.post<{
		message: string;
	}>(`${API_URL.single}/sendNotification`, data);

	console.log('response', response.data);
	return response.data;
};
