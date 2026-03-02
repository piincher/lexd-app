/**
 * Customer Tracking Service
 * Customer-facing API service for container tracking and public tracking
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import {
  CustomerTrackingInfo,
  PublicTrackingInfo,
  TrackingTimelineEvent,
  TrackingStatus,
} from '../types/tracking';

const BASE_URL = '/customer/tracking';
const PUBLIC_URL = '/public/tracking';

/**
 * Customer Tracking Service
 * Provides tracking information for authenticated customers and public tracking
 */
export class CustomerTrackingService {
  private static instance: CustomerTrackingService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): CustomerTrackingService {
    if (!CustomerTrackingService.instance) {
      CustomerTrackingService.instance = new CustomerTrackingService();
    }
    return CustomerTrackingService.instance;
  }

  // ============================================
  // AUTHENTICATED CUSTOMER TRACKING
  // ============================================

  /**
   * Get detailed tracking information for a container (customer view)
   * Returns tracking with customer's goods information
   */
  async getContainerTracking(
    containerId: string
  ): Promise<ApiResponse<CustomerTrackingInfo>> {
    return apiRequest.get(this.client, `${BASE_URL}/containers/${containerId}`);
  }

  /**
   * Get tracking information for a specific goods item
   */
  async getGoodsTracking(goodsId: string): Promise<ApiResponse<CustomerTrackingInfo>> {
    return apiRequest.get(this.client, `${BASE_URL}/goods/${goodsId}`);
  }

  /**
   * Get all tracking events for customer's containers
   */
  async getMyTrackingEvents(
    filters?: {
      startDate?: string;
      endDate?: string;
      status?: TrackingStatus;
    }
  ): Promise<ApiResponse<{
    events: TrackingTimelineEvent[];
    unreadCount: number;
  }>> {
    return apiRequest.get(this.client, `${BASE_URL}/events`, { params: filters });
  }

  /**
   * Mark tracking events as read
   */
  async markEventsAsRead(eventIds: string[]): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, `${BASE_URL}/events/read`, { eventIds });
  }

  /**
   * Subscribe to push notifications for tracking updates
   */
  async subscribeToTrackingUpdates(
    containerId: string,
    pushToken: string
  ): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, `${BASE_URL}/containers/${containerId}/subscribe`, {
      pushToken,
    });
  }

  /**
   * Unsubscribe from tracking updates
   */
  async unsubscribeFromTrackingUpdates(
    containerId: string,
    pushToken: string
  ): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, `${BASE_URL}/containers/${containerId}/unsubscribe`, {
      pushToken,
    });
  }

  // ============================================
  // PUBLIC TRACKING (NO LOGIN REQUIRED)
  // ============================================

  /**
   * Get public tracking information by container number
   * Does not require authentication - for public tracking page
   */
  async getPublicTracking(
    containerNumber: string
  ): Promise<ApiResponse<PublicTrackingInfo>> {
    return apiRequest.get(this.client, `${PUBLIC_URL}/container/${containerNumber}`, {
      headers: { skipAuth: 'true' },
    });
  }

  /**
   * Get public tracking by goods tracking number
   * Does not require authentication
   */
  async getPublicTrackingByGoods(
    goodsTrackingNumber: string
  ): Promise<ApiResponse<PublicTrackingInfo>> {
    return apiRequest.get(this.client, `${PUBLIC_URL}/goods/${goodsTrackingNumber}`, {
      headers: { skipAuth: 'true' },
    });
  }

  /**
   * Verify container number exists
   * Used for validation before showing tracking
   */
  async verifyContainerNumber(
    containerNumber: string
  ): Promise<ApiResponse<{
    exists: boolean;
    isInTransit: boolean;
  }>> {
    return apiRequest.get(this.client, `${PUBLIC_URL}/verify/${containerNumber}`, {
      headers: { skipAuth: 'true' },
    });
  }

  // ============================================
  // TRACKING UTILITIES
  // ============================================

  /**
   * Get estimated delivery date for a container
   */
  async getEstimatedDelivery(
    containerId: string
  ): Promise<ApiResponse<{
    estimatedDelivery: string;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    factors: string[];
  }>> {
    return apiRequest.get(this.client, `${BASE_URL}/containers/${containerId}/estimated-delivery`);
  }

  /**
   * Get delivery progress percentage
   */
  async getDeliveryProgress(
    containerId: string
  ): Promise<ApiResponse<{
    progressPercentage: number;
    currentStatus: TrackingStatus;
    daysInTransit: number;
    estimatedDaysRemaining: number | null;
  }>> {
    return apiRequest.get(this.client, `${BASE_URL}/containers/${containerId}/progress`);
  }
}

export const customerTrackingService = CustomerTrackingService.getInstance();
