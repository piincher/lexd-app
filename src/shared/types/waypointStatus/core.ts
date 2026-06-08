/**
 * Port-Specific Waypoint Status System - Core types
 */

import { WaypointStatus } from '../containerWaypoints';

export type ExtendedWaypointStatus = 
  | WaypointStatus
  | 'ARRIVED_AT_PORT'
  | 'CUSTOMS_CLEARANCE'
  | 'CUSTOMS_CLEARED'
  | 'BERTHING'
  | 'DISCHARGING'
  | 'DISCHARGED'
  | 'READY_FOR_PICKUP'
  | 'BORDER_CROSSING'
  | 'CUSTOMS_INSPECTION'
  | 'CLEARED_BORDER'
  | 'IN_WAREHOUSE'
  | 'AVAILABLE_FOR_PICKUP'
  | 'PICKED_UP';

export type LocationCategory = 
  | 'LOADING_PORT'
  | 'TRANSIT_PORT'
  | 'DISCHARGE_PORT'
  | 'BORDER'
  | 'CUSTOMS'
  | 'WAREHOUSE'
  | 'ROAD_TRANSIT';

export interface PortStatusOption {
  status: ExtendedWaypointStatus;
  label: string;
  icon: string;
  color: string;
  description?: string;
  requiresNote?: boolean;
  availableFrom: ExtendedWaypointStatus[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  targetStatus: ExtendedWaypointStatus;
  category: LocationCategory[];
  requiredCurrentStatus: ExtendedWaypointStatus[];
  confirmationMessage?: string;
}
