/**
 * Tracking Utility Hooks
 */

import { TrackingStatus } from '../../types/tracking';
import { useGetContainerTracking } from './useTrackingQueries';
import { useGetDeliveryProgress } from './useDeliveryInfo';
import { useGetMyTrackingEvents } from './useTrackingEvents';

export const useIsNearDestination = (
  containerId: string | undefined
): boolean => {
  const { data: tracking } = useGetContainerTracking(containerId);

  if (!tracking) return false;

  const nearDestinationStatuses: TrackingStatus[] = [
    'ARRIVED_PORT',
    'CUSTOMS_CLEARANCE',
    'INLAND_TRANSPORT',
    'READY_FOR_PICKUP',
  ];

  return nearDestinationStatuses.includes(tracking.currentStatus);
};

export const useDaysUntilDelivery = (
  containerId: string | undefined
): number | null => {
  const { data: progress } = useGetDeliveryProgress(containerId);
  return progress?.estimatedDaysRemaining ?? null;
};

export const useHasUnreadTrackingEvents = (): boolean => {
  const { data: events } = useGetMyTrackingEvents();
  return (events?.unreadCount ?? 0) > 0;
};
