// Goods Feature - Mutation Hooks
// TanStack Query hooks for modifying goods data

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsApi } from '../api';
import { UpdateGoodsInput } from '../api/types';

const QUERY_KEYS = {
	myGoods: 'my-goods',
	goodsDetail: (id: string) => ['goods', 'detail', id],
} as const;

/**
 * Hook to scan QR code and get goods or container info
 * Invalidates my-goods cache when a goods item is successfully scanned
 */
export const useScanQR = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (qrData: string) => goodsApi.scanQR(qrData),
		onSuccess: (response) => {
			// Invalidate goods list if a goods item was scanned
			if (response.data.data.type === 'goods') {
				queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myGoods] });
			}
		},
	});
};

/**
 * Hook to update goods information
 * Only works if goods status is RECEIVED_AT_WAREHOUSE
 * Invalidates both my-goods cache and specific goods detail cache
 */
export const useUpdateGoods = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ goodsId, data }: { goodsId: string; data: UpdateGoodsInput }) =>
			goodsApi.updateGoods(goodsId, data),
		onSuccess: (_, variables) => {
			// Invalidate goods list and specific goods detail
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myGoods] });
			// Invalidate both query key structures for compatibility
			queryClient.invalidateQueries({ queryKey: ['goods', variables.goodsId] });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.goodsDetail(variables.goodsId) });
			queryClient.invalidateQueries({ queryKey: ['goods', 'detail', variables.goodsId] });
		},
	});
};
