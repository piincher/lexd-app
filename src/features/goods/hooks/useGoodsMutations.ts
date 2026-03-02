// Goods Feature - Mutation Hooks
// TanStack Query hooks for modifying goods data

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsApi } from '../api';

const QUERY_KEYS = {
	myGoods: 'my-goods',
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
