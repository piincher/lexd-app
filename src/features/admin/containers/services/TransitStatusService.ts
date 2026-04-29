/**
 * Transit Status Service - API service for container transit status management
 * Provides transit status updates, history tracking, and validation
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiResponse } from '@src/shared/types/api';
import {
  TransitStatusUpdate,
  BulkTransitStatusUpdate,
  CurrentTransitStatus,
  TransitHistoryEntry,
  TransitTransitionValidation,
  TransitStatusResponse,
  TransitHistoryResponse,
  BulkTransitStatusResponse,
} from '../types/transitStatus';

const BASE_URL = '/containers';

/**
 * Transit Status Service
 * Handles all API interactions for container transit status management
 */
export class TransitStatusService {
  private static instance: TransitStatusService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): TransitStatusService {
    if (!TransitStatusService.instance) {
      TransitStatusService.instance = new TransitStatusService();
    }
    return TransitStatusService.instance;
  }

  // ============================================
  // TRANSIT STATUS OPERATIONS
  // ============================================

  /**
   * Update transit status for a container
   */
  async updateTransitStatus(
    containerId: string,
    data: TransitStatusUpdate
  ): Promise<ApiResponse<CurrentTransitStatus>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${containerId}/transit-status`, data);
  }

  /**
   * Get current transit status for a container
   */
  async getCurrentTransitStatus(containerId: string): Promise<ApiResponse<CurrentTransitStatus>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/transit-status`);
  }

  // ============================================
  // TRANSIT HISTORY OPERATIONS
  // ============================================

  /**
   * Get transit history for a container
   */
  async getTransitHistory(containerId: string): Promise<ApiResponse<TransitHistoryResponse>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/transit-history`);
  }

  // ============================================
  // BULK OPERATIONS
  // ============================================

  /**
   * Bulk update transit status for multiple containers
   */
  async bulkUpdateTransitStatus(
    updates: BulkTransitStatusUpdate[]
  ): Promise<ApiResponse<BulkTransitStatusResponse>> {
    return apiRequest.post(this.client, `${BASE_URL}/transit-status/bulk`, { updates });
  }

  // ============================================
  // VALIDATION OPERATIONS
  // ============================================

  /**
   * Validate if a transit status transition is allowed
   */
  async validateTransitTransition(
    containerId: string,
    newStatus: string
  ): Promise<ApiResponse<TransitTransitionValidation>> {
    return apiRequest.get(
      this.client,
      `${BASE_URL}/${containerId}/transit-status/validate`,
      { params: { newStatus } }
    );
  }
}

export const transitStatusService = TransitStatusService.getInstance();
