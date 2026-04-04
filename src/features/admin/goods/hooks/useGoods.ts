/**
 * Goods Hooks - React Query hooks for goods management
 * Following React best practices and clean architecture
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { goodsService } from '../services/GoodsService';
import { 
  Goods, 
  ReceiveGoodsInput, 
  GoodsFilters, 
  AssignToContainerInput,
  GoodsFormData,
  GoodsFormErrors 
} from '../types';
import { ApiResponse, PaginatedResponse } from '@src/api/types';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS - Centralized cache management
// ============================================

export const goodsQueryKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsQueryKeys.all, 'list'] as const,
  list: (filters: GoodsFilters | undefined) => [...goodsQueryKeys.lists(), filters] as const,
  details: () => [...goodsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...goodsQueryKeys.details(), id] as const,
  byClient: (clientId: string) => [...goodsQueryKeys.all, 'client', clientId] as const,
};

// ============================================
// READ HOOKS
// ============================================

/**
 * Hook to get all goods with filters
 * @param filters - Optional filters for the query
 * @param options - Additional React Query options
 */
export const useGetAllGoods = (
  filters?: GoodsFilters,
  options?: UseQueryOptions<ApiResponse<PaginatedResponse<Goods>>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.list(filters),
    queryFn: () => goodsService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to get goods by ID
 * @param id - Goods ID
 * @param options - Additional React Query options
 */
export const useGetGoodsById = (
  id: string | undefined,
  options?: UseQueryOptions<ApiResponse<Goods>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.detail(id || ''),
    queryFn: () => goodsService.getById(id!),
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 0, // Always fetch fresh data to ensure updates are reflected
    ...options,
  });
};

/**
 * Hook to get goods by client ID
 * @param clientId - Client ID
 */
export const useGetGoodsByClient = (
  clientId: string | undefined,
  options?: UseQueryOptions<ApiResponse<Goods[]>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.byClient(clientId || ''),
    queryFn: () => goodsService.getByClient(clientId!),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Hook to receive new goods
 * Supports both with and without photo
 */
export const useReceiveGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      photoUris,
      onProgress,
    }: {
      data: ReceiveGoodsInput;
      photoUris?: string[];
      onProgress?: (progress: number) => void;
    }) => {
      if (photoUris && photoUris.length > 0) {
        return goodsService.receiveWithPhoto(data, photoUris, onProgress);
      }
      return goodsService.receive(data);
    },
    onSuccess: () => {
      // Invalidate goods + order lists to refresh data
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};

/**
 * Hook to update goods location
 */
export const useUpdateGoodsLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, location }: { id: string; location: string }) =>
      goodsService.updateLocation(id, location),
    onSuccess: (_, variables) => {
      // Invalidate specific goods and all lists
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

/**
 * Hook to update goods photo
 */
export const useUpdateGoodsPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      photoUri,
      onProgress,
    }: {
      id: string;
      photoUri: string;
      onProgress?: (progress: number) => void;
    }) => goodsService.updatePhoto(id, photoUri, onProgress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

/**
 * Hook to delete goods
 */
export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permanent = false }: { id: string; permanent?: boolean }) =>
      goodsService.delete(id, permanent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

/**
 * Hook to assign goods to container
 */
export const useAssignGoodsToContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ containerId, goodsIds }: AssignToContainerInput) =>
      goodsService.assignToContainer(containerId, goodsIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

/**
 * Hook to update goods status
 */
export const useUpdateGoodsStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      goodsService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook for form validation
 */
export const useGoodsFormValidation = () => {
  const validate = (formData: GoodsFormData, useDimensions: boolean): GoodsFormErrors => {
    const errors: GoodsFormErrors = {};

    if (!formData.clientPhone?.trim()) {
      errors.clientPhone = 'Veuillez sélectionner un client';
    }

    if (!formData.description?.trim()) {
      errors.description = 'La description est requise';
    }

    if (useDimensions) {
      const length = parseFloat(formData.length.replace(',', '.'));
      if (!formData.length || isNaN(length) || length <= 0) {
        errors.length = 'Longueur invalide';
      }

      const width = parseFloat(formData.width.replace(',', '.'));
      if (!formData.width || isNaN(width) || width <= 0) {
        errors.width = 'Largeur invalide';
      }

      const height = parseFloat(formData.height.replace(',', '.'));
      if (!formData.height || isNaN(height) || height <= 0) {
        errors.height = 'Hauteur invalide';
      }
    } else {
      const cbm = parseFloat(formData.cbm.replace(',', '.'));
      if (!formData.cbm || isNaN(cbm) || cbm <= 0) {
        errors.cbm = 'CBM invalide';
      }
    }

    const weight = parseFloat(formData.weight.replace(',', '.'));
    if (!formData.weight || isNaN(weight) || weight <= 0) {
      errors.weight = 'Poids invalide';
    }

    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity <= 0) {
      errors.quantity = 'Quantité invalide';
    }

    const unitPrice = parseFloat(formData.unitPrice.replace(',', '.'));
    if (!formData.unitPrice || isNaN(unitPrice) || unitPrice <= 0) {
      errors.unitPrice = 'Prix unitaire invalide';
    }

    if (!formData.location?.trim()) {
      errors.location = "L'emplacement est requis (ex: C3)";
    }

    return errors;
  };

  const isValid = (errors: GoodsFormErrors): boolean => {
    return Object.keys(errors).length === 0;
  };

  return { validate, isValid };
};

/**
 * Hook for CBM calculation
 */
export const useCBMCalculation = () => {
  const calculateFromDimensions = (length: string, width: string, height: string): number => {
    const l = parseFloat(length.replace(',', '.')) || 0;
    const w = parseFloat(width.replace(',', '.')) || 0;
    const h = parseFloat(height.replace(',', '.')) || 0;
    return (l * w * h) / 1000000; // Convert cm³ to m³
  };

  const calculateDirect = (cbm: string): number => {
    return parseFloat(cbm.replace(',', '.')) || 0;
  };

  return { calculateFromDimensions, calculateDirect };
};
