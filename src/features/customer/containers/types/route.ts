/**
 * Route Types and Constants
 */

/**
 * Container route information
 */
export interface ContainerRoute {
  name: string;
  origin: string;
  destination: string;
  estimatedTransitDays: number;
}

/**
 * Route display constants for Dakar-Bamako route
 */
export const ROUTE_DISPLAY = {
  SEA_ROUTE: 'Chine → Dakar (Sénégal)',
  ROAD_ROUTE: 'Dakar → Diboli → Bamako',
  FINAL_DESTINATION: 'Warehouse Bamako, Mali',
} as const;

/**
 * Waypoint location codes for Dakar route
 */
export const WAYPOINT_LOCATIONS = {
  NANSHA: { code: 'NNS', name: 'Nansha', country: 'CN' },
  DAKAR: { code: 'DKR', name: 'Dakar', country: 'SN' },
  DIBOLI: { code: 'DBL', name: 'Diboli', country: 'ML' },
  BAMAKO: { code: 'BKO', name: 'Bamako', country: 'ML' },
} as const;
