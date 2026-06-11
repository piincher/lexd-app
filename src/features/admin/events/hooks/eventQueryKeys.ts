import { EventListFilters } from '../api/types';

export const eventQueryKeys = {
  all: ['admin', 'events'] as const,
  lists: () => [...eventQueryKeys.all, 'list'] as const,
  list: (filters: EventListFilters | undefined) =>
    [...eventQueryKeys.lists(), filters] as const,
  details: () => [...eventQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventQueryKeys.details(), id] as const,
};
