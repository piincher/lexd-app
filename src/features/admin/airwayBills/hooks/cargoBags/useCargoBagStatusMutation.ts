import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { CargoBagStatus } from '../../types';
import { airwayBillQueryKeys } from '../airwayBills/queryKeys';
import { cargoBagQueryKeys } from './queryKeys';

export const useUpdateCargoBagStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CargoBagStatus; awbId?: string }) =>
      cargoBagService.updateStatus(id, status),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(cargoBagQueryKeys.detail(variables.id), response);
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(variables.id) });
      if (variables.awbId) {
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
      }
    },
  });
};
