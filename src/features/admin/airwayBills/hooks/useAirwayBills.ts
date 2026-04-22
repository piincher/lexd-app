/**
 * AirwayBill Hooks - React Query hooks for airway bill management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../services/AirwayBillService';
import {
  AirwayBill,
  AirwayBillFilters,
  CreateAirwayBillInput,
  UpdateAirwayBillInput,
  AssignGoodsInput,
  AirwayBillConsignee,
  UpdateAirwayBillWaypointInput,
  CargoBag,
  CreateCargoBagInput,
} from '../types';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const airwayBillQueryKeys = {
  all: ['airwayBills'] as const,
  lists: () => [...airwayBillQueryKeys.all, 'list'] as const,
  list: (filters: AirwayBillFilters | undefined) =>
    [...airwayBillQueryKeys.lists(), filters] as const,
  details: () => [...airwayBillQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...airwayBillQueryKeys.details(), id] as const,
  waypoints: (id: string) => [...airwayBillQueryKeys.detail(id), 'waypoints'] as const,
  unassignedGoods: () => [...airwayBillQueryKeys.all, 'unassigned-goods'] as const,
  consignees: (search: string) => [...airwayBillQueryKeys.all, 'consignees', search] as const,
};

// ============================================
// READ HOOKS
// ============================================

export const useGetAllAirwayBills = (
  filters?: AirwayBillFilters,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.list(filters),
    queryFn: () => airwayBillService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetAirwayBillById = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.detail(id || ''),
    queryFn: () => airwayBillService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetUnassignedAirGoods = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.unassignedGoods(),
    queryFn: () => airwayBillService.getUnassignedGoods(),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetAirwayBillWaypoints = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.waypoints(id || ''),
    queryFn: () => airwayBillService.getWaypoints(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useSearchAirwayBillConsignees = (search: string) => {
  return useQuery<AirwayBillConsignee[], ApiClientError>({
    queryKey: airwayBillQueryKeys.consignees(search),
    queryFn: async () => {
      const response = await airwayBillService.searchConsignees(search);
      const data = response.data;
      return Array.isArray(data) ? data : data?.consignees || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

// ============================================
// WRITE HOOKS
// ============================================

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
    mutationFn: (id: string) => airwayBillService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
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

export const useInitializeAirwayBillWaypoints = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => airwayBillService.initializeWaypoints(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.waypoints(id) });
    },
  });
};

export const useUpdateAirwayBillWaypoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      waypointIndex,
      input,
    }: {
      id: string;
      waypointIndex: number;
      input: UpdateAirwayBillWaypointInput;
    }) => airwayBillService.updateWaypoint(id, waypointIndex, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.waypoints(variables.id) });
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
