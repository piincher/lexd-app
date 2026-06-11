import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { getActiveEvent } from '../api/eventApi';
import { selectFeaturedLane } from '../lib/selectFeaturedLane';

export const activeEventQueryKeys = {
  all: ['events', 'active'] as const,
  region: (region?: string) => [...activeEventQueryKeys.all, region ?? 'global'] as const,
};

/**
 * Loads the active event (if any) for a region and derives the lane to
 * feature in the countdown banner. Returns `event: null` when nothing is live.
 */
export const useActiveEvent = (region?: string) => {
  const query = useQuery({
    queryKey: activeEventQueryKeys.region(region),
    queryFn: () => getActiveEvent(region),
    staleTime: DEFAULT_STALE_TIME,
  });

  const event = query.data ?? null;
  const featuredLane = event ? selectFeaturedLane(event.lanes) : null;

  return {
    event,
    featuredLane,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
