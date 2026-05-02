import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { CargoBagGoodsInput } from '../../types';
import { airwayBillQueryKeys } from '../airwayBills/queryKeys';
import { cargoBagQueryKeys } from './queryKeys';

export const useAddGoodsToCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CargoBagGoodsInput; awbId?: string }) =>
      cargoBagService.addGoods(id, input.goodsIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.eligibleGoods(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
      if (variables.awbId) {
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      }
    },
  });
};

export const useRemoveGoodsFromCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, goodsId }: { id: string; goodsId: string; awbId?: string }) =>
      cargoBagService.removeGoods(id, goodsId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.eligibleGoods(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
      if (variables.awbId) {
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      }
    },
  });
};
