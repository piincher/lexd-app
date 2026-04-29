/**
 * Tracking Events - Queries & Mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { customerTrackingService } from '../../services/customerTrackingService';
import { TrackingTimelineEvent, TrackingStatus } from '../../types/tracking';
import { ApiClientError } from '../../api';
import { trackingQueryKeys } from './trackingQueryKeys';

export const useGetMyTrackingEvents = (
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: TrackingStatus;
  },
  options?: UseQueryOptions<
    { events: TrackingTimelineEvent[]; unreadCount: number },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: [trackingQueryKeys.events(), filters],
    queryFn: async () => {
      const response = await customerTrackingService.getMyTrackingEvents(
        filters
      );
      return response.data;
    },
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};

export const useMarkEventsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventIds: string[]) => {
      const response = await customerTrackingService.markEventsAsRead(eventIds);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trackingQueryKeys.events(),
      });
    },
  });
};
