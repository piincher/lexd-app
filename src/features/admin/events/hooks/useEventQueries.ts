import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { eventAdminService } from '../api/eventAdminApi';
import { EventListFilters } from '../api/types';
import { eventQueryKeys } from './eventQueryKeys';

export const useEvents = (filters?: EventListFilters) =>
  useQuery({
    queryKey: eventQueryKeys.list(filters),
    queryFn: () => eventAdminService.getEvents(filters),
    staleTime: DEFAULT_STALE_TIME,
  });

export const useEvent = (id: string | undefined) =>
  useQuery({
    queryKey: eventQueryKeys.detail(id || ''),
    queryFn: () => eventAdminService.getEventById(id!),
    enabled: !!id,
    staleTime: DEFAULT_STALE_TIME,
  });
