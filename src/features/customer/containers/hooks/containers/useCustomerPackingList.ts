/**
 * Hook to fetch client's packing list for a specific container
 * Shows only the client's goods with consignee info and pickup details
 */

import { useQuery } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';
import { QUERY_KEYS } from './useCustomerContainerKeys';
import { normalizePackingList } from './packingListNormalizer';

export const useGetMyPackingList = (containerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.packingList(containerId),
    queryFn: () => customerContainerApi.getMyPackingList(containerId),
    select: (response) => normalizePackingList(response.data.data),
    enabled: !!containerId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
