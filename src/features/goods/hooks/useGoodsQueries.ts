// Goods Feature - Data Fetching Hooks
// TanStack Query hooks for fetching goods data

import { useQuery } from '@tanstack/react-query';
import { goodsApi, type GoodsFilters } from '../api';

const QUERY_KEYS = {
	myGoods: 'my-goods',
	goodsDetail: (id: string) => ['goods', id],
} as const;

/**
 * Hook to fetch current user's goods with optional filters
 */
export const useGetMyGoods = (filters?: GoodsFilters) => {
	return useQuery({
		queryKey: [QUERY_KEYS.myGoods, filters],
		queryFn: () => goodsApi.getMyGoods(filters),
		select: (response) => response.data.data,
		staleTime: 2 * 60 * 1000,
		refetchOnReconnect: true,
	});
};

/**
 * Hook to fetch goods details by ID
 */
export const useGetGoodsDetail = (goodsId: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.goodsDetail(goodsId),
		queryFn: () => goodsApi.getGoodsById(goodsId),
		select: (response) => response.data.data.goods,
		enabled: !!goodsId,
		staleTime: 0, // Always fetch fresh data on refetch
	});
};
