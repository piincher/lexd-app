import { ContainerWaypoint } from '../types';
import { ExtendedWaypointStatus, getLocationCategory, getQuickActions } from '../types/waypointStatus';
import { getLocationTitle, getAllStatusesForLocation } from './waypointFormHelpers';

export const useWaypointFormValidation = (
  waypoint: ContainerWaypoint | null,
  status: ExtendedWaypointStatus
) => {
  const locationCode = waypoint?.location?.portCode || '';
  const locationCategory = getLocationCategory(locationCode);
  const quickActions = locationCode ? getQuickActions(locationCode, status) : [];
  const allStatuses = getAllStatusesForLocation(locationCategory);
  const locationTitle = getLocationTitle(locationCategory);

  return { locationCode, locationCategory, quickActions, allStatuses, locationTitle };
};
