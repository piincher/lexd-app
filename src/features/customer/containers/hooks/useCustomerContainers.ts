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
    select: (response) => response.data.data,
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
    select: (response) => response.data.data.container,
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
    select: (response) => response.data.data,
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
