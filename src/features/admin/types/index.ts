/**
 * Admin Feature Types
 * Re-exports all types from admin sub-features
 */

// Re-export all route types from the routes feature
export type {
  // Domain entities
  ShippingMode,
  ShippingLine,
  Route,
  CreateRouteInput,
  UpdateRouteInput,
  
  // Filter & Query types
  RouteFilters,
  
  // UI State types
  RouteFormData,
} from '../routes/types';

export {
  // Display constants
  SHIPPING_MODE_LABELS,
  SHIPPING_MODE_COLORS,
  SHIPPING_LINE_LABELS,
  SHIPPING_LINES_BY_MODE,
  COMMON_ORIGINS,
  COMMON_DESTINATIONS,
} from '../routes/types';
