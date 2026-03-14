/**
 * useTimelineData - Process timeline events and calculate current status
 */
import { useMemo } from 'react';
import { ContainerWaypoint } from '../../../types';

interface TimelineData {
  completedWaypoints: ContainerWaypoint[];
  currentWaypoint: ContainerWaypoint | null;
  upcomingWaypoints: ContainerWaypoint[];
  progressPercentage: number;
  finalDestination: ContainerWaypoint | undefined;
  dakarWaypoint: ContainerWaypoint | undefined;
}

export const useTimelineData = (
  waypoints: ContainerWaypoint[],
  currentWaypointIndex: number
): TimelineData => {
  return useMemo(() => {
    const completed = waypoints.slice(0, currentWaypointIndex);
    const current = waypoints[currentWaypointIndex] || null;
    const upcoming = waypoints.slice(currentWaypointIndex + 1);
    
    const progress = waypoints.length === 0 
      ? 0 
      : ((currentWaypointIndex + 1) / waypoints.length) * 100;

    const dakar = waypoints.find(w => 
      w.locationCode === 'DKR' || w.location.toLowerCase().includes('dakar')
    );

    return {
      completedWaypoints: completed,
      currentWaypoint: current,
      upcomingWaypoints: upcoming,
      progressPercentage: progress,
      finalDestination: waypoints[waypoints.length - 1],
      dakarWaypoint: dakar,
    };
  }, [waypoints, currentWaypointIndex]);
};
