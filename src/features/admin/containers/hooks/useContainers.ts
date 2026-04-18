/**
 * Container Hooks - React Query hooks for container management
 * Phase 3: Container System with Route Integration
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { containerService } from '../services/ContainerService';
import { PackingList } from '../types/PackingList';
import { Container, CreateContainerInput, UpdateContainerStatusInput, AssignGoodsInput, ContainerFilters, Route, ShippingMode } from '../types';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const containerQueryKeys = {
  all: ['containers'] as const,
  lists: () => [...containerQueryKeys.all, 'list'] as const,
  list: (filters: ContainerFilters | undefined) => 
    [...containerQueryKeys.lists(), filters] as const,
  details: () => [...containerQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...containerQueryKeys.details(), id] as const,
  byStatus: (status: string) => [...containerQueryKeys.all, 'status', status] as const,
  readyForDeparture: () => [...containerQueryKeys.all, 'ready-for-departure'] as const,
  packingList: (id: string) => [...containerQueryKeys.detail(id), 'packing-list'] as const,
  unassignedGoods: (shippingMode?: string) => [...containerQueryKeys.all, 'unassigned-goods', shippingMode] as const,
  // Route query keys
  routes: () => [...containerQueryKeys.all, 'routes'] as const,
  routesByMode: (mode: string) => [...containerQueryKeys.routes(), 'mode', mode] as const,
};

// ============================================
// ROUTE HOOKS (Phase 3)
// ============================================

/**
 * Get active routes filtered by shipping mode
 */
export const useGetActiveRoutesForMode = (
  mode: ShippingMode | undefined,
  options?: UseQueryOptions<ApiResponse<Route[]>, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.routesByMode(mode || ''),
    queryFn: () => containerService.getActiveRoutesByMode(mode!),
    enabled: !!mode,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// ============================================
// READ HOOKS
// ============================================

export const useGetAllContainers = (
  filters?: ContainerFilters,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.list(filters),
    queryFn: () => containerService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetContainerById = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.detail(id || ''),
    queryFn: () => containerService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetContainersByStatus = (
  status: string,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.byStatus(status),
    queryFn: () => containerService.getByStatus(status),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetReadyForDeparture = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.readyForDeparture(),
    queryFn: () => containerService.getReadyForDeparture(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetUnassignedGoods = (
  shippingMode?: string,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.unassignedGoods(shippingMode),
    queryFn: () => containerService.getUnassignedGoods(shippingMode),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetPackingList = (
  containerId: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.packingList(containerId || ''),
    queryFn: () => containerService.generatePackingList(containerId!),
    enabled: !!containerId,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

export const useCreateContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContainerInput) => containerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    },
  });
};

export const useUpdateContainerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: UpdateContainerStatusInput 
    }) => containerService.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: containerQueryKeys.detail(variables.id) 
      });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    },
  });
};

export const useDeleteContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => containerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    },
  });
};

export const useAssignGoodsToContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      containerId, 
      data 
    }: { 
      containerId: string; 
      data: AssignGoodsInput 
    }) => containerService.assignGoods(containerId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: containerQueryKeys.detail(variables.containerId) 
      });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.unassignedGoods() });
    },
  });
};

export const useRemoveGoodsFromContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      containerId, 
      goodsId 
    }: { 
      containerId: string; 
      goodsId: string 
    }) => containerService.removeGoods(containerId, goodsId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: containerQueryKeys.detail(variables.containerId) 
      });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.unassignedGoods() });
    },
  });
};

// ============================================
// PICKUP WORKFLOW MUTATIONS (Phase 3)
// ============================================

export const useMarkReadyForPickup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (containerId: string) => containerService.markReadyForPickup(containerId),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({ 
        queryKey: containerQueryKeys.detail(containerId) 
      });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    },
  });
};

export const useMarkGoodsDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goodsId: string) => containerService.markGoodsDelivered(goodsId),
    onSuccess: () => {
      // Invalidate all container and goods queries
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.all });
    },
  });
};

export const useMarkContainerDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (containerId: string) => 
      containerService.updateStatus(containerId, { status: 'DELIVERED' }),
    onSuccess: (_, containerId) => {
      // Invalidate container queries
      queryClient.invalidateQueries({ 
        queryKey: containerQueryKeys.detail(containerId) 
      });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
      
      // Invalidate goods queries (all goods may have been updated)
      queryClient.invalidateQueries({ queryKey: ['goods'] });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

export const useContainerStats = () => {
  const { data: allContainers } = useGetAllContainers();
  
  const stats = (() => {
    // Handle both array and paginated object response formats
    const responseData = allContainers?.data;
    const containers: Container[] = Array.isArray(responseData) 
      ? responseData 
      : responseData?.containers || [];
    
    return {
      total: containers?.length || 0,
      booked: containers?.filter((c: Container) => c.status === 'BOOKED').length || 0,
      loading: containers?.filter((c: Container) => c.status === 'LOADING').length || 0,
      loaded: containers?.filter((c: Container) => c.status === 'LOADED').length || 0,
      inTransit: containers?.filter((c: Container) => c.status === 'IN_TRANSIT').length || 0,
      arrived: containers?.filter((c: Container) => c.status === 'ARRIVED').length || 0,
      // Phase 3: Mode stats
      sea: containers?.filter((c: Container) => c.shippingMode === 'SEA').length || 0,
      air: containers?.filter((c: Container) => c.shippingMode === 'AIR').length || 0,
      readyForPickup: containers?.filter((c: Container) => c.status === 'READY_FOR_PICKUP').length || 0,
    };
  })();

  return stats;
};
