/**
 * Container CRUD Mutation Hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';
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
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: [...containerQueryKeys.all, 'unassigned-goods'],
      });
      queryClient.removeQueries({
        queryKey: containerQueryKeys.detail(id),
      });
      queryClient.removeQueries({
        queryKey: waypointQueryKeys.list(id),
      });
      queryClient.removeQueries({
        queryKey: waypointQueryKeys.status(id),
      });
    },
  });
};
