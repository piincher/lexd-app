/**
 * Client Orders API
 * Client-facing order endpoints
 */

import { apiClient } from '@src/api/client';

const BASE_URL = '/api/v1/orders';

export interface Package {
  _id: string;
  trackingNumber: string;
  description: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  status: string;
  location?: string;
  createdAt: string;
}

export interface ClientOrder {
  _id: string;
  orderNumber: string;
  status: string;
  shippingMode: 'air' | 'sea';
  origin: string;
  destination: string;
  packages: Package[];
  timeline: Array<{
    status: string;
    timestamp: string;
    location?: string;
    description?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ClientOrderView {
  order: ClientOrder;
  activePackages: Package[];
  deliveredPackages: Package[];
}

export interface MyOrdersResponse {
  orders: ClientOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TrackOrderResult {
  found: boolean;
  order?: ClientOrder;
  package?: Package;
  currentStatus: string;
  estimatedDelivery?: string;
}

export const clientOrdersApi = {
  /**
   * Get order details for client view
   * GET /api/v1/orders/:id/client-view
   */
  getClientOrder: async (id: string): Promise<ClientOrderView> => {
    const response = await apiClient.get(`${BASE_URL}/${id}/client-view`);
    const order = response.data.data;

    const activePackages = order.packages?.filter(
      (p: Package) => p.status !== 'delivered' && p.status !== 'cancelled'
    ) || [];
    const deliveredPackages = order.packages?.filter(
      (p: Package) => p.status === 'delivered'
    ) || [];

    return {
      order,
      activePackages,
      deliveredPackages,
    };
  },

  /**
   * Get customer's orders
   * GET /api/v1/orders/my-orders
   */
  getMyOrders: async (page = 1, limit = 20): Promise<MyOrdersResponse> => {
    const response = await apiClient.get(`${BASE_URL}/my-orders`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  /**
   * Track order by code
   * GET /api/v1/orders/track/:code
   */
  trackOrder: async (code: string): Promise<TrackOrderResult> => {
    const response = await apiClient.get(`${BASE_URL}/track/${code}`);
    return response.data.data;
  },
};
