/**
 * Public Tracking API
 * 
 * Public endpoints that don't require authentication.
 * Allows anyone to track their shipments using tracking numbers.
 */

import { apiClient } from '@src/api/client';
import { TrackingResult } from '../hooks/usePublicTracking';

const BASE_URL = '/public';

export const publicTrackingApi = {
  /**
   * Track a shipment by tracking number
   * @param trackingNumber - The tracking number (goodsId, containerNumber, or orderId)
   */
  track: async (trackingNumber: string): Promise<TrackingResult> => {
    const response = await apiClient.get(`${BASE_URL}/track/${trackingNumber}`);
    return response.data;
  },

  /**
   * Validate a tracking number format
   * @param trackingNumber - The tracking number to validate
   */
  validateTrackingNumber: async (trackingNumber: string): Promise<{
    valid: boolean;
    type?: 'goods' | 'container' | 'order';
    message?: string;
  }> => {
    const response = await apiClient.get(`${BASE_URL}/validate/${trackingNumber}`);
    return response.data;
  },

  /**
   * Get public company information
   */
  getCompanyInfo: async (): Promise<{
    name: string;
    description: string;
    contact: {
      phone: string;
      email: string;
      whatsapp?: string;
      address: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  }> => {
    const response = await apiClient.get(`${BASE_URL}/company`);
    return response.data;
  },

  /**
   * Get shipping rates (public)
   */
  getShippingRates: async (): Promise<{
    air: {
      baseRate: number;
      currency: string;
      estimatedDays: string;
      minWeight: number;
    };
    sea: {
      baseRate: number;
      currency: string;
      estimatedDays: string;
      minVolume: number;
    };
  }> => {
    const response = await apiClient.get(`${BASE_URL}/rates`);
    return response.data;
  },

  /**
   * Submit a public contact form
   */
  submitContactForm: async (data: {
    name: string;
    email?: string;
    phone: string;
    message: string;
    type: 'quote' | 'support' | 'general';
  }): Promise<{ success: boolean; ticketId?: string; message: string }> => {
    const response = await apiClient.post(`${BASE_URL}/contact`, data);
    return response.data;
  },

  /**
   * Get FAQ content (public)
   */
  getFAQ: async (): Promise<{
    categories: Array<{
      id: string;
      name: string;
      questions: Array<{
        id: string;
        question: string;
        answer: string;
      }>;
    }>;
  }> => {
    const response = await apiClient.get(`${BASE_URL}/faq`);
    return response.data;
  },
};
