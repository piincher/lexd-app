// Customer Goods Detail Hook
// Fetches customer-facing goods detail with tracking and payment info

import { useQuery } from '@tanstack/react-query';
import { goodsApi } from '../api/goodsApi';
import { goodsQueryKeys } from '../constants/queryKeys';

export const useCustomerGoodsDetail = (goodsId: string) => {
	return useQuery({
		queryKey: goodsQueryKeys.customerDetail(goodsId),
		queryFn: () => goodsApi.getCustomerDetail(goodsId),
		select: (response) => response.data.data,
		enabled: !!goodsId,
		staleTime: 5 * 60 * 1000,
	});
};
