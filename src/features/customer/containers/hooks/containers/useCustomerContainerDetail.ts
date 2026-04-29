/**
 * Hook to fetch detailed information about a specific container
 */

import { useQuery } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';
import { QUERY_KEYS } from './useCustomerContainerKeys';

export const useGetContainerDetails = (containerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.containerDetail(containerId),
    queryFn: () => customerContainerApi.getContainerDetails(containerId),
    select: (response) => {
      const container = response.data.data.container;
      if (!container) return container;
      const routeData = container.routeId || container.route;
      return {
        ...container,
        myGoods: container.customerGoods?.items || [],
        route: routeData ? {
          name: routeData.name || '',
          origin: typeof routeData.origin === 'string' ? routeData.origin : routeData.origin?.city || '',
          destination: typeof routeData.destination === 'string' ? routeData.destination : routeData.destination?.city || '',
          estimatedTransitDays: routeData.estimatedTransitDays || 0,
        } : { name: '', origin: '', destination: '', estimatedTransitDays: 0 },
      };
    },
    enabled: !!containerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
