/**
 * Waypoint Types - Location type definitions
 */

export interface WaypointLocation {
  city: string;
  country: string;
  countryCode: string;
  portCode?: string;
  warehouse?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
