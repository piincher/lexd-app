/**
 * Tracking API
 * API endpoints for container tracking with GPS and ETA
 */

import { apiClientV2 } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import { CustomerTrackingInfo } from '../types/tracking';

const axios = apiClientV2;
const BASE_URL = '/customer/tracking';

/**
 * GPS Location for real-time tracking
 */
export interface GPSLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
  speed?: number;
}

/**
 * ETA Calculation with factors
 */
export interface ETACalculation {
  estimatedArrival: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  factors: string[];
  daysRemaining: number | null;
  delayRisk: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
}

/**
 * Container tracking response with GPS and ETA
 */
export interface ContainerTrackingResponse extends CustomerTrackingInfo {
  gpsLocation?: GPSLocation;
  eta: ETACalculation;
  lastUpdated: string;
}

/**
 * Tracking API client
 */
export const trackingApi = {
  /**
   * Get container tracking info with GPS and ETA
   * @param containerId The container ID
   * @returns Container tracking with GPS coordinates and ETA
   */
  getContainerTracking: (containerId: string) =>
    axios.get<ApiResponse<ContainerTrackingResponse>>(
      `${BASE_URL}/containers/${containerId}/full`
    ),

  /**
   * Get real-time GPS location
   * @param containerId The container ID
   * @returns GPS coordinates if available
   */
  getGPSLocation: (containerId: string) =>
    axios.get<ApiResponse<GPSLocation>>(
      `${BASE_URL}/containers/${containerId}/gps`
    ),

  /**
   * Get ETA calculation
   * @param containerId The container ID
   * @returns ETA with confidence and factors
   */
  getETA: (containerId: string) =>
    axios.get<ApiResponse<ETACalculation>>(
      `${BASE_URL}/containers/${containerId}/eta`
    ),
};

export default trackingApi;
