/**
 * Waypoint Types - Main waypoint type definitions
 */

import { WaypointStatus, SegmentType } from './core';
import { WaypointLocation } from './location';
import { SeaSegmentDetails, RoadSegmentDetails, AirSegmentDetails, WarehouseDetails } from './segments';

export interface ContainerWaypoint {
  _id?: string;
  order: number;
  location: WaypointLocation;
  segmentType: SegmentType;
  status: WaypointStatus;
  
  // Timing
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  durationHours?: number;
  
  // Segment-specific details
  seaDetails?: SeaSegmentDetails;
  roadDetails?: RoadSegmentDetails;
  airDetails?: AirSegmentDetails;
  warehouseDetails?: WarehouseDetails;
  
  // Display
  description: string;
  shortName: string;
  icon?: string;
  
  // Notifications
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
  
  // Metadata
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface WaypointUpdate {
  status?: WaypointStatus;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  notes?: string;
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
}
