import api from './client';
import { apiClient } from "@src/api/client";
import { LIMIT } from '@src/constants/Dimensions';

export type imagesType = { url: string; public_id: string }[];

export type currentPositionType = {
	title: string;
	coordinates: {
		latitude: string;
		location: string;
		longitude: string;
	}[];
	id: string;
	time: string;
};

export type routes = {
	id: string;
	title: string;
	time: string;
	coordinates: { latitude: number; longitude: number; location: string }[];
}[];
export type productType = {
	clientName: string;
	clientPhone: string;
	packageWeight?: number;
	priceTotal?: number;
	partenaire: string;
	_id?: string | undefined;
	images: imagesType;
	status?: 'Active' | 'Inactive' | 'In Transit' | 'Delivered' | 'Pending' | 'Cancelled';
	quantity?: number;
	shippingMode?: string;
	createdAt?: string;
	currentStatus?: string;
	typeOfPackage?: string;
	currentPosition?: currentPositionType;
	orderId?: string;
	code?: string;
	route: routes;
	dateOfReception?: string;
	userId: string;
	departureDate: string;
	category: {
		name: string;
		_id: string;
	};
	updatedAt?: string;
	packageCBM: string;
	dateOfReceipt: string;
	contenairNumber: string;
	paymentStatus?: 'Paid' | 'Unpaid' | 'UNPAID' | 'PARTIAL' | 'PAID';
	unitPrice: number;
	shipmentLine?: string;
	destinationCountry?: string;
	destination?: string;
	// Goods-linked order fields
	calculatedTotal?: number;
	calculatedCBM?: number;
	goodsIds?: unknown[];
	isGoodsLinked?: boolean;
	isManual?: boolean;
	pricingSource?: 'manual' | 'goods-cbm';
	paidAmount?: number;
	balanceDue?: number;
	totalCost?: number;
	note?: string;
	goodsCount?: number;
	containerSummaries?: {
		_id: string;
		virtualContainerNumber?: string;
		containerNumber?: string;
		status?: string;
		shippingLine?: string;
		shippingMode?: string;
	}[];
	// Aggregated, deduped photos from all non-void linked goods (read-time, set by getOrder).
	goodsPhotos?: string[];
};

export type OrderSortBy = 'updatedAt' | 'createdAt' | 'departureDate' | 'calculatedTotal' | 'balanceDue';
export type OrderSortOrder = 'asc' | 'desc';

export interface OrderListFilters {
	container?: string;
	shippingMethod?: 'air' | 'sea' | 'all';
	paymentStatus?: 'PAID' | 'PARTIAL' | 'UNPAID' | 'Paid' | 'Unpaid' | 'all';
	linkState?: 'linked' | 'manual' | 'unlinked' | 'all';
	startDate?: string;
	endDate?: string;
	minTotal?: number;
	maxTotal?: number;
	sortBy?: OrderSortBy;
	sortOrder?: OrderSortOrder;
}

const API_URL = {
	GET_ORDER: '/order/search',
	CREATE_ORDER: '/order/create',
	UPDATE_ORDER: '/order',
	getOrdersFromAUser: '/order/one',
	getActiveOrders: '/order',
	getActiveOrdersAdmin: '/order/all',
	single: '/order',
	GET_ORDER_BASED_ON_DATE: '/order/getOrderDepartureDate',
};

interface CheckRoutePayload {
	code: string;
}
export const CheckRoute = async (data: CheckRoutePayload) => {
	const response = await api.post<{ route: string[]; updatedAt: string }>(API_URL.GET_ORDER, data);
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
	category,
	dateOfReceipt,
	packageCBM,
	contenairNumber,
	unitPrice,
	shipmentLine,
	destinationCountry,
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
		category,
		dateOfReceipt,
		packageCBM,
		contenairNumber,
		unitPrice,
		shipmentLine,
		destinationCountry,
	};

	return await api.post<productType>(`${API_URL.CREATE_ORDER}`, data);
};

export const updateOrder = async (data: productType) => {
	console.log('order id', data.orderId);
	const response = await api.put<productType>(`${API_URL.UPDATE_ORDER}/${data.orderId}/update`, data);
	return response.data;
};
export const batchUpdate = async (data: { orders: string[]; title: string }) => {
	return await api.post<productType>(`${API_URL.UPDATE_ORDER}/batchUpdate`, data);
};

export const editOrder = async (data: productType) => {
	const response = await api.put<productType>(`${API_URL.single}/${data.orderId}/edit`, data);
	return response.data;
};
export const getOrderBasedOnDate = async (data: { departureDate: string }) => {
	const response = await api.post<productType[]>(`${API_URL.GET_ORDER_BASED_ON_DATE}`, data);
	return response.data;
};

export const getActiveOrders = async (page: number, status: string, shippingMethod: 'air' | 'sea') => {
	const response = await api.get<productType[]>(
		`${API_URL.getOrdersFromAUser}?status=${status}&limit=${LIMIT}&page=${page}&shippingMethod=${shippingMethod}`
	);
	return response.data;
};

export const getActiveOrdersAdmin = async (
	page: number,
	Status: string,
	departureDate: Date,
	shippingMethod: 'air' | 'sea'
) => {
	let query = `status=${Status}&limit=${LIMIT}&page=${page}&shippingMethod=${shippingMethod}`;

	// Only add the departureDate if the startDate is valid (not null)
	if (departureDate) {
		query += `&departureDate=${departureDate.toISOString()}`;
	}
	const response = await api.get<productType[]>(`${API_URL.getActiveOrdersAdmin}?${query}`);
	return response.data;
};
export const getOrderDetails = async (id: string) => {
	const response = await api.get<productType>(`${API_URL.single}/${id}/single`);
	return response.data;
};
export const updateOrderToDelivered = async (data: productType) => {
	console.log('order id', data.orderId);
	const response = await api.put<productType>(`${API_URL.UPDATE_ORDER}/${data.orderId}/delivered`, data);
	return response.data;
};

export const getOrdersBetweenDate = async (data: { departureDate: Date; status: string }) => {
	const response = await api.post<productType[]>(`${API_URL.single}/getOrdersbetweentwodates`, data);
	return response.data;
};

export const deleteImage = async (data: { public_id: string }) => {
	const response = await api.post<{ ok: boolean }>(`${API_URL.single}/${data.public_id}/delete`, data);

	return response.data;
};
export const deleteOrder = async (data: { orderId: string }) => {
	console.log('order id', data.orderId);
	const response = await api.delete<{ message: string }>(`${API_URL.single}/${data.orderId}/delete`);
	return response.data;
}

export const getOrdersBasedOnUserId = async (id:string) => {
	console.log('user id', id);
	const response = await api.get<productType[]>(`${API_URL.getOrdersFromAUser}/${id}/orders`);
	return response.data;
}

export const getAllOrders = async (page: number = 1, status?: string, filters: OrderListFilters = {}) => {
	const params = new URLSearchParams({
		limit: String(LIMIT),
		page: String(page),
	});
	if (status && status !== 'all') {
		params.append('status', status);
	}
	Object.entries(filters).forEach(([key, value]) => {
		if (value === undefined || value === '' || value === 'all') return;
		params.append(key, String(value));
	});
	const url = `${API_URL.getActiveOrdersAdmin}?${params.toString()}`;
	const response = await api.get<productType[]>(url);
	return response.data;
};

// ── Assign Goods to Order ──

export interface AssignGoodsToOrderRequest {
  orderId: string;
  goodsId: string;
}

export interface AssignGoodsToOrderResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    clientName: string;
    status: string;
    manualOrderStatus: string;
    isGoodsLinked: boolean;
    calculatedCBM: number;
    calculatedTotal: number;
    goodsCount: number;
  };
}

/**
 * Assign goods to an existing manual order
 * POST /order/:orderId/assign-goods
 */
export const assignGoodsToOrder = async ({
  orderId,
  goodsId,
}: AssignGoodsToOrderRequest): Promise<AssignGoodsToOrderResponse> => {
  const response = await apiClient.post<AssignGoodsToOrderResponse>(
    `/order/${orderId}/assign-goods`,
    { goodsId }
  );
  return response.data;
};
