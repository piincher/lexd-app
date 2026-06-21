import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promoCampaignAdminService } from '../api/promoCampaignAdminApi';
import type { CreatePromoCampaignInput } from '../api/promoCampaignAdminApi';
import { promoCampaignAdminQueryKeys } from './usePromoCampaignAdminQueries';

export const useCreatePromoCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePromoCampaignInput) => promoCampaignAdminService.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
    },
  });
};

export const useUpdatePromoCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePromoCampaignInput> }) =>
      promoCampaignAdminService.updateCampaign(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.detail(variables.id) });
    },
  });
};

export const useDeletePromoCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => promoCampaignAdminService.deleteCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
    },
  });
};

export const useDuplicatePromoCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => promoCampaignAdminService.duplicateCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
    },
  });
};

export const useTogglePromoCampaignStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      promoCampaignAdminService.toggleStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.detail(variables.id) });
    },
  });
};

export const useUploadPromoCampaignImages = () => {
  return useMutation({
    mutationFn: (uris: string[]) => promoCampaignAdminService.uploadImages(uris),
  });
};
