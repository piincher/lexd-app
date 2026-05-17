import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transitStatusService } from '../../services/TransitStatusService';
import { TransitStatusUpdate, BulkTransitUpdate } from '../../types/transitStatus';
import { containerQueryKeys } from '../useContainers';
import { transitStatusQueryKeys } from './useTransitQueries';

export const useUpdateTransitStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ containerId, data }: { containerId: string; data: TransitStatusUpdate }) => {
      const response = await transitStatusService.updateTransitStatus(containerId, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: transitStatusQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: transitStatusQueryKeys.detail(variables.containerId) });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.detail(variables.containerId) });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    },
  });
};

export const useBulkUpdateTransitStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BulkTransitUpdate) => {
      const response = await transitStatusService.bulkUpdateTransitStatus(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transitStatusQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.all });
    },
  });
};
