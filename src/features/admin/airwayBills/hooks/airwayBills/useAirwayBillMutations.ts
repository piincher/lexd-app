import { useMutation, useQueryClient } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import {
  CreateAirwayBillInput,
  UpdateAirwayBillInput,
  AssignGoodsInput,
} from '../../types';
import { airwayBillQueryKeys } from './queryKeys';

export const useCreateAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateAirwayBillInput) => airwayBillService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
    },
  });
};

export const useUpdateAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAirwayBillInput }) =>
      airwayBillService.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
    },
  });
};

export const useDeleteAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, hardDelete = false }: { id: string; hardDelete?: boolean }) =>
      airwayBillService.delete(id, hardDelete),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ['cargoBags'] });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
    },
  });
};

export const useUpdateAirwayBillStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      airwayBillService.updateStatus(id, status),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(airwayBillQueryKeys.detail(variables.id), response);
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.waypoints(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
    },
  });
};

export const useAssignGoodsToAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: AssignGoodsInput }) =>
      airwayBillService.assignGoods(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
    },
  });
};

export const useRemoveGoodsFromAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, goodsId }: { id: string; goodsId: string }) =>
      airwayBillService.removeGoods(id, goodsId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
    },
  });
};
