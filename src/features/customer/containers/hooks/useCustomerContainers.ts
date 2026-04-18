/**
 * Customer Container Hooks
 * TanStack Query hooks for customer container data fetching
 */

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { customerContainerApi } from '../api/customerContainerApi';
import { CustomerContainerFilters } from '../types';

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  myContainers: 'customer-containers',
  containersList: (filters?: CustomerContainerFilters) =>
    [QUERY_KEYS.myContainers, 'list', filters],
  containerDetail: (id: string) => [QUERY_KEYS.myContainers, 'detail', id],
  containerForGoods: (goodsId: string) => [QUERY_KEYS.myContainers, 'for-goods', goodsId],
  packingList: (containerId: string) => [QUERY_KEYS.myContainers, 'packing-list', containerId],
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch all containers where the current customer has goods
 * @param filters Optional filters for status and shipping mode
 */
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

/**
 * Hook to fetch detailed information about a specific container
 * @param containerId The container ID
 */
export const useGetContainerDetails = (containerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.containerDetail(containerId),
    queryFn: () => customerContainerApi.getContainerDetails(containerId),
    select: (response) => {
      const container = response.data.data.container;
      if (!container) return container;
      // Map customerGoods.items → myGoods and routeId → route for frontend compatibility
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

/**
 * Hook to fetch container information for a specific goods item
 * @param goodsId The goods ID
 */
export const useGetContainerForGoods = (goodsId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.containerForGoods(goodsId),
    queryFn: () => customerContainerApi.getContainerForGoods(goodsId),
    select: (response) => response.data.data,
    enabled: !!goodsId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch client's packing list for a specific container
 * Shows only the client's goods with consignee info and pickup details
 * @param containerId The container ID
 */
export const useGetMyPackingList = (containerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.packingList(containerId),
    queryFn: () => customerContainerApi.getMyPackingList(containerId),
    select: (response) => {
      const raw = response.data.data;
      if (!raw) return raw;
      const c = raw.container || {} as any;
      // Transform backend shape → frontend ClientPackingListResponse shape
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

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Hook to download packing list PDF for a container
 * Returns a Blob that can be saved or shared
 */
export const useDownloadPackingListPDF = () => {
  return useMutation({
    mutationFn: async (containerId: string) => {
      const response = await customerContainerApi.downloadPackingListPDF(containerId);
      // Axios with responseType: 'blob' returns the blob directly
      return response.data as Blob;
    },
  });
};

// ============================================
// INVALIDATION HELPERS
// ============================================

/**
 * Hook to get invalidation functions
 */
export const useCustomerContainerInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateContainersList = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.myContainers, 'list'],
    });
  };

  const invalidateContainerDetail = (containerId: string) => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.containerDetail(containerId),
    });
  };

  const invalidateAllContainers = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.myContainers],
    });
  };

  return {
    invalidateContainersList,
    invalidateContainerDetail,
    invalidateAllContainers,
    queryClient,
  };
};
