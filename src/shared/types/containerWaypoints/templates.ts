/**
 * Waypoint Types - Template type definitions
 */

import { ContainerWaypoint } from './waypoint';

export interface WaypointTemplate {
  shippingLine: string;
  shippingMode: 'SEA' | 'AIR';
  name: string;
  description: string;
  estimatedTotalDays: number;
  waypoints: Omit<ContainerWaypoint, '_id' | 'status' | 'createdAt' | 'updatedAt' | 'updatedBy'>[];
}
