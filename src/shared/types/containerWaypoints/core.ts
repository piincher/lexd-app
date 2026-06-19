/**
 * Waypoint Types - Core type definitions
 */

export type WaypointStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
export type SegmentType = 'SEA' | 'ROAD' | 'AIR' | 'WAREHOUSE';
export type PortType = 'LOADING' | 'TRANSIT' | 'DISCHARGE' | 'FEEDER';

export interface WaypointFilters {
  status?: WaypointStatus;
  segmentType?: SegmentType;
  country?: string;
}

export type WaypointType = 'PORT' | 'WAREHOUSE' | 'BORDER' | 'TERMINAL' | 'DEPOT' | 'CUSTOMS';

export type TransportMode = 'SEA' | 'ROAD' | 'AIR' | 'RAIL';
