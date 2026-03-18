import { getOrderDetails, getSeaRouteById } from '@src/api/order';
import { ORDERKEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderDetails = (id: string) => {
	return useQuery({
		queryKey: [ORDERKEY, id],
		queryFn: () => getOrderDetails(id),
	});
};

export const useGetOrderDetail = (orderId: string) => {
	return useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderDetails(orderId),
		enabled: !!orderId,
	});
};

export const useGetSeaRouteById = (id: string) => {
	return useQuery({
		queryKey: ['seaRoute', id],
		queryFn: () => getSeaRouteById(id),
		enabled: !!id,
	});
};
