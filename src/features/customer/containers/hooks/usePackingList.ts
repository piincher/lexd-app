/**
 * usePackingList Hook
 * Data fetching for packing list
 * SRP: Handle packing list data fetching and state
 */

import { useGetMyPackingList, useDownloadPackingListPDF } from './useCustomerContainers';

export const usePackingList = (containerId: string) => {
  const {
    data: packingList,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetMyPackingList(containerId);

  return {
    packingList,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
};

export { useDownloadPackingListPDF };
