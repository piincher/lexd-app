/**
 * Hook to fetch container information for a specific goods item
 */

import { useQuery } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';
import { QUERY_KEYS } from './useCustomerContainerKeys';

export const useGetContainerForGoods = (goodsId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.containerForGoods(goodsId),
    queryFn: () => customerContainerApi.getContainerForGoods(goodsId),
    select: (response) => response.data.data,
    enabled: !!goodsId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
