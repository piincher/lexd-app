/**
 * CargoBag Hooks - React Query hooks for cargo bag management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { cargoBagService } from '../services/CargoBagService';
import {
  CargoBag,
  CreateCargoBagInput,
  UpdateCargoBagInput,
  CargoBagGoodsInput,
  CargoBagStatus,
} from '../types';
import { ApiClientError } from '@src/api/client';
import { airwayBillQueryKeys } from './useAirwayBills';

// ============================================
// QUERY KEYS
// ============================================

export const cargoBagQueryKeys = {
  all: ['cargoBags'] as const,
  lists: () => [...cargoBagQueryKeys.all, 'list'] as const,
  list: (awbId: string | undefined) => [...cargoBagQueryKeys.lists(), awbId] as const,
  details: () => [...cargoBagQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...cargoBagQueryKeys.details(), id] as const,
};

// ============================================
// READ HOOKS
// ============================================

export const useGetCargoBagsByAwb = (
  awbId: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.list(awbId),
    queryFn: () => cargoBagService.getAll(awbId),
    enabled: !!awbId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetCargoBagById = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.detail(id || ''),
    queryFn: () => cargoBagService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// WRITE HOOKS
// ============================================

export const useCreateCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCargoBagInput) => cargoBagService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
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
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
    },
  });
};

export const useDeleteCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cargoBagService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
    },
  });
};

export const useAddGoodsToCargoBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input, awbId }: { id: string; input: CargoBagGoodsInput; awbId?: string }) =>
      cargoBagService.addGoods(id, input.goodsIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
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
      if (variables.awbId) {
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.awbId) });
        queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      }
    },
  });
};

export const useUpdateCargoBagStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CargoBagStatus }) =>
      cargoBagService.updateStatus(id, status),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(cargoBagQueryKeys.detail(variables.id), response);
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.lists() });
    },
  });
};
