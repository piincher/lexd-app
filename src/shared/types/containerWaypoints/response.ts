/**
 * Waypoint Types - API response type definitions
 */

import { ContainerWaypoint } from './waypoint';

export interface WaypointInitResponse {
  containerId: string;
  waypoints: ContainerWaypoint[];
  message: string;
}

export interface WaypointsResponse {
  containerId: string;
  containerNumber: string;
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  progressPercentage: number;
  estimatedTimeRemaining: number | null;
  shippingLine: string;
  shippingMode: 'SEA' | 'AIR';
}
