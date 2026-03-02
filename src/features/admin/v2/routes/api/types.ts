/**
 * Route API Types
 * Request/Response type definitions for route API
 */

import { Route, RouteFilters } from '../types';

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Get routes request params
 */
export interface GetRoutesParams extends RouteFilters {
  page?: number;
  limit?: number;
  sort?: string;
}

/**
 * Get routes response
 */
export type GetRoutesResponse = ApiResponse<Route[]>;

/**
 * Get active routes params
 */
export interface GetActiveRoutesParams {
  mode?: string;
}

/**
 * Get active routes response
 */
export type GetActiveRoutesResponse = ApiResponse<Route[]>;

/**
 * Get route by ID response
 */
export type GetRouteByIdResponse = ApiResponse<Route>;

/**
 * Create route request body
 */
export interface CreateRouteRequest {
  name: string;
  shippingMode: 'SEA' | 'AIR';
  origin: string;
  destination: string;
  shippingLine?: string;
  estimatedTransitDays: number;
  description?: string;
  isActive: boolean;
}

/**
 * Create route response
 */
export type CreateRouteResponse = ApiResponse<Route>;

/**
 * Update route request body
 */
export type UpdateRouteRequest = Partial<CreateRouteRequest>;

/**
 * Update route response
 */
export type UpdateRouteResponse = ApiResponse<Route>;

/**
 * Delete route response
 */
export type DeleteRouteResponse = ApiResponse<void>;
