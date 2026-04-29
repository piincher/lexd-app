/**
 * useTransitTimeline - Business logic for TransitTimeline component
 */
import { useMemo, useCallback } from 'react';
import { Linking } from 'react-native';
import { ContainerWaypoint } from '../../../types';
import { useTimelineData } from './useTimelineData';
import { formatTimestamp } from '../components/TimelineDateMarker';

interface TransitTimelineData {
  completedWaypoints: ContainerWaypoint[];
  currentWaypoint: ContainerWaypoint | null;
  upcomingWaypoints: ContainerWaypoint[];
  progressPercentage: number;
  finalDestination: ContainerWaypoint | undefined;
  dakarWaypoint: ContainerWaypoint | undefined;
  eta: string;
  completedCount: number;
  handleCall: (phone: string) => void;
}

export const useTransitTimeline = (
  waypoints: ContainerWaypoint[],
  currentWaypointIndex: number,
  lastUpdateTimestamp?: string
): TransitTimelineData => {
  const timelineData = useTimelineData(waypoints, currentWaypointIndex);

  const eta = useMemo(() => {
    const final = timelineData.finalDestination;
    if (final?.estimatedArrival) {
      return formatTimestamp(final.estimatedArrival);
    }
    if (final?.actualArrival) {
      return formatTimestamp(final.actualArrival);
    }
    return 'Non disponible';
  }, [timelineData.finalDestination]);

  const completedCount = timelineData.completedWaypoints.length + (timelineData.currentWaypoint ? 1 : 0);

  const handleCall = useCallback((phone: string) => {
    Linking.openURL(`tel:${phone}`);
  }, []);

  return {
    ...timelineData,
    eta,
    completedCount,
    handleCall,
  };
};
