import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { CreateCargoBagInput, UpdateCargoBagInput } from '../../types';
import { airwayBillQueryKeys } from '../airwayBills/queryKeys';
import { cargoBagQueryKeys } from './queryKeys';

export const useCreateCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCargoBagInput) => cargoBagService.create(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
    },
  });
};

export const useUpdateCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCargoBagInput }) =>
      cargoBagService.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
    },
  });
};

export const useDeleteCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; awbId?: string }) => cargoBagService.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      if (variables.awbId) {
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
      }
    },
  });
};
