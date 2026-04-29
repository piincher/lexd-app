/**
 * Hook to fetch client's packing list for a specific container
 * Shows only the client's goods with consignee info and pickup details
 */

import { useQuery } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';
import { QUERY_KEYS } from './useCustomerContainerKeys';

export const useGetMyPackingList = (containerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.packingList(containerId),
    queryFn: () => customerContainerApi.getMyPackingList(containerId),
    select: (response) => {
      const raw = response.data.data;
      if (!raw) return raw;
      const c = raw.container || {} as any;
      return {
        containerNumber: c.number || c.virtualContainerNumber || '',
        shippingMode: c.shippingMode || 'SEA',
        shippingLine: c.shippingLine || '',
        shippingLineLabel: c.shippingLineLabel || c.shippingLine || '',
        route: c.route || { origin: '', destination: '', estimatedTransitDays: 0 },
        consignee: c.consignee || null,
        tracking: {
          status: c.status || '',
          statusLabel: c.statusLabel || c.status || '',
        },
        items: raw.goods || [],
        summary: raw.summary || { totalItems: 0, totalCBM: 0, totalWeight: 0, totalPackages: 0 },
        generatedAt: raw.generatedAt || '',
      };
    },
    enabled: !!containerId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
