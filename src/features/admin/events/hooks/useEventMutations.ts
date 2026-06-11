import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventAdminService } from '../api/eventAdminApi';
import { CreateEventInput, UpdateEventInput } from '../api/types';
import { eventQueryKeys } from './eventQueryKeys';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventInput) => eventAdminService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventInput }) =>
      eventAdminService.updateEvent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventAdminService.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
    },
  });
};
