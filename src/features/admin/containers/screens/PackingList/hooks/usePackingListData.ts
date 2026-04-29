import { useMemo } from 'react';
import { useGetPackingList } from '../../../hooks/useContainers';
import { AdminPackingListData } from '../../../types/packingList';
import { transformPackingListResponse } from './transformPackingListResponse';

export const usePackingListData = (containerId: string) => {
  const { data: packingListResponse, isLoading: isContainerLoading } = useGetPackingList(containerId);

  const packingListData: AdminPackingListData | null = useMemo(
    () => transformPackingListResponse(packingListResponse),
    [packingListResponse]
  );

  return { packingListData, isContainerLoading };
};
