/**
 * Hook to fetch all containers where the current customer has goods
 */

import { useQuery } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';
import { CustomerContainerFilters } from '../../types';
import { QUERY_KEYS } from './useCustomerContainerKeys';

export const useGetMyContainers = (filters?: CustomerContainerFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.containersList(filters),
    queryFn: () => customerContainerApi.getMyContainers(filters),
    select: (response) => {
      const data = response?.data?.data;
      if (!data || !Array.isArray(data.containers)) {
        return data ?? { containers: [] };
      }
      return {
        ...data,
        containers: data.containers.map((c: any) => {
          const routeData = c.routeId || c.route;
          return {
            ...c,
            myGoods: c.customerGoods?.items || [],
            route: routeData ? {
              name: routeData.name || '',
              origin: typeof routeData.origin === 'string' ? routeData.origin : routeData.origin?.city || '',
              destination: typeof routeData.destination === 'string' ? routeData.destination : routeData.destination?.city || '',
              estimatedTransitDays: routeData.estimatedTransitDays || 0,
            } : { name: '', origin: '', destination: '', estimatedTransitDays: 0 },
          };
        }),
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
