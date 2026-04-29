import { getOrderById, getSeaRouteById } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderDetail = (orderId: string) => {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: () => getOrderById(orderId),
		enabled: !!orderId,
	});
};

export const useGetSeaRouteById = (id: string) => {
	return useQuery({
		queryKey: ["seaRoute", id],
		queryFn: () => getSeaRouteById(id),
		enabled: !!id,
	});
};
