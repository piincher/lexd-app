/**
 * Container CRUD Mutation Hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { CreateContainerInput, UpdateContainerStatusInput } from '../../types';
import { containerQueryKeys } from './containerQueryKeys';

export const useCreateContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateContainerInput) => containerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};

export const useUpdateContainerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateContainerStatusInput;
    }) => containerService.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};

export const useDeleteContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => containerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};
