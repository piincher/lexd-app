import api from '@src/api/client';

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
};

const API_URL = {
	GET_ORDER: '/order/search',
	CREATE_ORDER: '/order/create',
	UPDATE_ORDER: '/order',
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
	};

	return await api.post<productType>(`${API_URL.CREATE_ORDER}`, data);
};

const updateOrder = async (data: productType) => {
	return await api.put<productType>(`${API_URL.UPDATE_ORDER}/${data.orderId}`, data);
};
