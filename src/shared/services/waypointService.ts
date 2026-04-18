/**
 * Waypoint Service - API service for container waypoint tracking
 * Provides detailed route tracking with sea and road segments
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import {
  ContainerWaypoint,
  WaypointUpdate,
  SeaSegmentUpdate,
  RoadSegmentUpdate,
  WaypointInitResponse,
  WaypointsResponse,
  WaypointStatus,
  SegmentType,
} from '@src/shared/types/containerWaypoints';

const BASE_URL = '/containers';

/**
 * Waypoint Service
 * Handles all API interactions for container waypoint and segment management
 */
export class WaypointService {
  private static instance: WaypointService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): WaypointService {
    if (!WaypointService.instance) {
      WaypointService.instance = new WaypointService();
    }
    return WaypointService.instance;
  }

  // ============================================
  // WAYPOINT INITIALIZATION
  // ============================================

  /**
   * Initialize waypoints for a container from route templates
   * Creates default waypoint sequence based on container's shipping line and route
   */
  async initializeWaypoints(containerId: string): Promise<ApiResponse<WaypointInitResponse>> {
    return apiRequest.post(this.client, `${BASE_URL}/${containerId}/waypoints/initialize`, {});
  }

  // ============================================
  // WAYPOINT READ OPERATIONS
  // ============================================

  /**
   * Get all waypoints for a container with current status
   */
  async getWaypoints(containerId: string): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/waypoints`);
  }

  /**
   * Get waypoint by index
   */
  async getWaypointByIndex(
    containerId: string,
    waypointIndex: number
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/waypoints/${waypointIndex}`);
  }

  // ============================================
  // WAYPOINT WRITE OPERATIONS
  // ============================================

  /**
   * Update a specific waypoint
   */
  async updateWaypoint(
    containerId: string,
    waypointIndex: number,
    data: WaypointUpdate
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.patch(
      this.client,
      `${BASE_URL}/${containerId}/waypoints/${waypointIndex}`,
      data
    );
  }

  /**
   * Add a new waypoint to the sequence
   */
  async addWaypoint(
    containerId: string,
    waypoint: ContainerWaypoint
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.post(this.client, `${BASE_URL}/${containerId}/waypoints`, waypoint);
  }

  /**
   * Remove a waypoint from the sequence
   */
  async removeWaypoint(
    containerId: string,
    waypointIndex: number
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.delete(this.client, `${BASE_URL}/${containerId}/waypoints/${waypointIndex}`);
  }

  /**
   * Reorder waypoints
   */
  async reorderWaypoints(
    containerId: string,
    waypointOrder: string[]
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${containerId}/waypoints/reorder`, {
      waypointOrder,
    });
  }

  // ============================================
  // SEA SEGMENT OPERATIONS
  // ============================================

  /**
   * Update a sea segment with vessel/tracking information
   */
  async updateSeaSegment(
    containerId: string,
    segmentIndex: number,
    data: SeaSegmentUpdate
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.patch(
      this.client,
      `${BASE_URL}/${containerId}/waypoints/sea-segments/${segmentIndex}`,
      data
    );
  }

  /**
   * Update vessel tracking information for a sea segment
   */
  async updateVesselTracking(
    containerId: string,
    segmentIndex: number,
    vesselData: {
      vesselName?: string;
      vesselIMO?: string;
      estimatedArrival?: string;
      actualArrival?: string;
      trackingUrl?: string;
    }
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.patch(
      this.client,
      `${BASE_URL}/${containerId}/waypoints/sea-segments/${segmentIndex}/vessel`,
      vesselData
    );
  }

  // ============================================
  // ROAD SEGMENT OPERATIONS
  // ============================================

  /**
   * Update a road segment with trucking information
   */
  async updateRoadSegment(
    containerId: string,
    segmentIndex: number,
    data: RoadSegmentUpdate
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.patch(
      this.client,
      `${BASE_URL}/${containerId}/waypoints/road-segments/${segmentIndex}`,
      data
    );
  }

  /**
   * Update truck/transporter information for a road segment
   */
  async updateTransporterInfo(
    containerId: string,
    segmentIndex: number,
    transporterData: {
      transporterName?: string;
      driverName?: string;
      driverPhone?: string;
      truckPlateNumber?: string;
      trackingNumber?: string;
    }
  ): Promise<ApiResponse<ContainerWaypoint>> {
    return apiRequest.patch(
      this.client,
      `${BASE_URL}/${containerId}/waypoints/road-segments/${segmentIndex}/transporter`,
      transporterData
    );
  }

  // ============================================
  // BULK OPERATIONS
  // ============================================

  /**
   * Bulk update multiple waypoints
   */
  async bulkUpdateWaypoints(
    containerId: string,
    updates: Array<{
      waypointIndex: number;
      data: WaypointUpdate;
    }>
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${containerId}/waypoints/bulk`, { updates });
  }

  /**
   * Mark multiple waypoints as completed
   */
  async markWaypointsCompleted(
    containerId: string,
    waypointIndices: number[],
    completedAt?: string
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${containerId}/waypoints/complete`, {
      waypointIndices,
      completedAt: completedAt || new Date().toISOString(),
    });
  }

  // ============================================
  // CURRENT POSITION
  // ============================================

  /**
   * Update current position of container
   */
  async updateCurrentPosition(
    containerId: string,
    position: {
      waypointIndex: number;
      latitude?: number;
      longitude?: number;
      notes?: string;
    }
  ): Promise<ApiResponse<WaypointsResponse>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${containerId}/waypoints/current-position`, position);
  }

  /**
   * Get current tracking status summary
   */
  async getTrackingStatus(containerId: string): Promise<ApiResponse<{
    currentWaypoint: ContainerWaypoint | null;
    nextWaypoint: ContainerWaypoint | null;
    progressPercentage: number;
    estimatedTimeRemaining: number | null;
    status: WaypointStatus;
  }>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/waypoints/status`);
  }
}

export const waypointService = WaypointService.getInstance();
