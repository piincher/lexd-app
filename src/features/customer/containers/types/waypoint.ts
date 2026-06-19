/**
 * Waypoint Types and Constants
 */

/**
 * Waypoint location types
 */
export type WaypointType = 'PORT' | 'ROAD_TRANSIT' | 'BORDER' | 'WAREHOUSE' | 'CUSTOMS';

/**
 * Waypoint status in the journey
 */
export type WaypointStatus = 'PENDING' | 'IN_TRANSIT' | 'ARRIVED' | 'DEPARTED';

/**
 * Transport mode for a waypoint segment
 */
export type TransportMode = 'SEA' | 'ROAD' | 'RAIL';

/**
 * Individual waypoint in container journey (customer view - simplified)
 */
export interface ContainerWaypoint {
  order: number;
  location: string;
  locationCode: string;
  type: WaypointType;
  status: WaypointStatus;
  coordinates?: { lat: number; lng: number };
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  vesselName?: string;
  vesselIMO?: string;
  transportMode: TransportMode;
  carrier?: string;
  truckPlate?: string;
  driverName?: string;
  driverPhone?: string;
  notes?: string;
  /** Raw backend description for this waypoint (e.g. port operation context). */
  description?: string;
  /** Short name used for compact labels. */
  shortName?: string;
  /** Road route details such as "Dakar → Kidira → Diboli → Kayes → Bamako". */
  routeDetails?: string;
  /** Border crossing point for road segments. */
  borderCrossing?: string;
  /**
   * Nested road details fallback (used when the waypoint comes from the shared
   * ContainerWaypoint shape instead of the flattened customer shape).
   */
  roadDetails?: {
    routeDetails?: string;
    borderCrossing?: string;
  };
}

/**
 * Waypoint status display labels (French) - Customer friendly
 */
export const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  DEPARTED: 'Parti',
};

/**
 * Waypoint type display labels (French)
 */
export const WAYPOINT_TYPE_LABELS: Record<WaypointType, string> = {
  PORT: 'Port',
  ROAD_TRANSIT: 'Transit',
  BORDER: 'Frontière',
  WAREHOUSE: 'Entrepôt',
  CUSTOMS: 'Douane',
};

/**
 * Waypoint type icons
 */
export const WAYPOINT_TYPE_ICONS: Record<WaypointType, string> = {
  PORT: 'boat',
  ROAD_TRANSIT: 'car',
  BORDER: 'flag',
  WAREHOUSE: 'cube',
  CUSTOMS: 'shield-checkmark',
};

/**
 * Transport mode display labels (French)
 */
export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
  SEA: 'Maritime',
  ROAD: 'Routier',
  RAIL: 'Ferroviaire',
};

/**
 * Transport mode icons
 */
export const TRANSPORT_MODE_ICONS: Record<TransportMode, string> = {
  SEA: 'boat',
  ROAD: 'car',
  RAIL: 'train',
};

/**
 * Waypoint type colors for customer UI
 */
export const CUSTOMER_WAYPOINT_TYPE_COLORS: Record<WaypointType, string> = {
  PORT: '#0EA5E9',
  ROAD_TRANSIT: '#F59E0B',
  BORDER: '#8B5CF6',
  WAREHOUSE: '#10B981',
  CUSTOMS: '#EF4444',
};
