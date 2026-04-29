/**
 * Hook to get invalidation functions for customer container queries
 */

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './useCustomerContainerKeys';

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
