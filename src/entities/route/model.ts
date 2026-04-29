/**
 * Route Entity Model
 * Core domain types for the Route entity
 */

// ============================================
// BASE TYPES
// ============================================

export type ShippingMode = "SEA" | "AIR";

export type ShippingLine =
  | "MSC"
  | "MAERSK"
  | "CMA_CGM"
  | "HAPAG_LLOYD"
  | "ETHIOPIAN_AIRLINES";

export type RouteStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

// ============================================
// ROUTE WAYPOINT
// ============================================

export interface RouteWaypoint {
  id: string;
  order: number;
  location: {
    city: string;
    country: string;
    countryCode?: string;
    portCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  estimatedDaysFromStart: number;
  description: string;
  type: "PORT" | "AIRPORT" | "CUSTOMS" | "ROAD" | "WAREHOUSE" | "BORDER";
  segmentType?: "SEA" | "AIR" | "ROAD" | "WAREHOUSE";
  terminal?: string;
  carrier?: string;
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
}

export type RouteWaypointDraft = Omit<RouteWaypoint, "id"> & { id?: string };

// ============================================
// CORE ROUTE ENTITY
// ============================================

export interface Route {
  _id: string;
  name: string;
  shippingMode: ShippingMode;
  origin: {
    city: string;
    country: string;
    warehouse?: string;
  };
  destination: {
    city: string;
    country: string;
    warehouse?: string;
  };
  shippingLine: string;
  estimatedTransitDays: number;
  description?: string;
  status: RouteStatus;
  waypoints: RouteWaypoint[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// DTOs
// ============================================

export interface CreateRouteInput {
  name: string;
  shippingMode: ShippingMode;
  origin: string | Route["origin"];
  destination: string | Route["destination"];
  shippingLine?: ShippingLine | "";
  estimatedTransitDays: number;
  waypoints?: RouteWaypointDraft[];
  description?: string;
  isActive?: boolean;
}

export type UpdateRouteInput = Partial<CreateRouteInput>;

// ============================================
// FILTERS
// ============================================

export interface RouteFilters {
  shippingMode?: ShippingMode;
  isActive?: boolean;
  shippingLine?: string;
}
