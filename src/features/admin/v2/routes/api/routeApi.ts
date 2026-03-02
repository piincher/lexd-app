/**
 * Route API - Business logic layer for route management
 * Phase 3: Route Management System
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import { 
  Route, 
  CreateRouteInput, 
  UpdateRouteInput,
  RouteFilters,
} from '../types';

const BASE_URL = '/routes';

/**
 * Route Service
 * Handles all API interactions for route management
 */
export class RouteService {
  private static instance: RouteService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): RouteService {
    if (!RouteService.instance) {
      RouteService.instance = new RouteService();
    }
    return RouteService.instance;
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Get all routes with optional filters
   */
  async getRoutes(filters?: RouteFilters): Promise<ApiResponse<Route[]>> {
    return apiRequest.get(this.client, BASE_URL, { params: filters });
  }

  /**
   * Get active routes for dropdown selection
   * Optionally filter by shipping mode
   */
  async getActiveRoutes(mode?: string): Promise<ApiResponse<Route[]>> {
    const url = mode 
      ? `${BASE_URL}/active/${mode}` 
      : `${BASE_URL}/active`;
    return apiRequest.get(this.client, url);
  }

  /**
   * Get a single route by ID
   */
  async getRouteById(id: string): Promise<ApiResponse<Route>> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  // ============================================
  // WRITE OPERATIONS
  // ============================================

  /**
   * Create a new route
   */
  async createRoute(data: CreateRouteInput): Promise<ApiResponse<Route>> {
    return apiRequest.post(this.client, BASE_URL, data);
  }

  /**
   * Update an existing route
   */
  async updateRoute(
    id: string, 
    data: UpdateRouteInput
  ): Promise<ApiResponse<Route>> {
    return apiRequest.put(this.client, `${BASE_URL}/${id}`, data);
  }

  /**
   * Delete a route
   */
  async deleteRoute(id: string): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }
}

// Export singleton instance
export const routeService = RouteService.getInstance();
