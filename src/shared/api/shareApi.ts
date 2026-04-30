/**
 * Share API
 *
 * Public and authenticated endpoints for creating and resolving
 * share tokens for shipments (goods, containers, orders).
 */

import axiosInstance from '@src/api/client';

const API_URL = {
  create: '/share',
  resolve: (token: string) => `/public/share/${token}`,
};

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ShareTokenResponse {
  token: string;
  url: string;
  type: 'order' | 'goods' | 'container';
  resourceReference: string;
  createdAt: string;
  expiresAt?: string;
  isNew: boolean;
}

export interface SharedShipmentTimelineItem {
  status: string;
  location: string;
  timestamp: string;
  description?: string;
}

export interface SharedShipmentGoods {
  goodsId: string;
  description: string;
  category?: string;
  dimensions?: { length: number; width: number; height: number };
  weightKg?: number;
  cbm?: number;
  quantity?: number;
  status: string;
  shippingMode: string;
  receivedAt?: string;
  warehouseLocation?: string;
  container?: {
    virtualContainerNumber: string;
    shippingLine: string;
    status: string;
  } | null;
  airwayBill?: {
    awbNumber: string;
    airline: string;
    status: string;
  } | null;
}

export interface SharedShipmentContainer {
  containerNumber: string;
  shippingLine: string;
  status: string;
  shippingMode: string;
  origin?: string;
  destination?: string;
  timeline?: Record<string, string>;
  goodsCount: number;
  goods: Array<{ goodsId: string; description: string; status: string }>;
}

export interface SharedShipmentOrder {
  orderId: string;
  status: string;
  shippingMode: string;
  destinationCountry?: string;
  shipmentLine?: string;
  createdAt: string;
  currentStatus?: string;
  packageWeight?: number;
  quantity?: number;
  goodsCount: number;
  goods: Array<{ goodsId: string; description: string; status: string }>;
}

export interface SharedShipmentData {
  type: 'goods' | 'container' | 'order';
  data: SharedShipmentGoods | SharedShipmentContainer | SharedShipmentOrder;
  currentStatus: string;
  timeline: SharedShipmentTimelineItem[];
  estimatedDelivery?: string;
  sharedAt: string;
}

// ─── API ────────────────────────────────────────────────────────────────────

export const shareApi = {
  /**
   * Create a share token for a shipment resource
   * POST /api/v2/share
   */
  createShareToken: async (variables: {
    type: 'order' | 'goods' | 'container';
    resourceReference: string;
    label?: string;
    expiresInDays?: number;
  }): Promise<ShareTokenResponse> => {
    const response = await axiosInstance.post<ShareTokenResponse>(API_URL.create, variables);
    return response.data;
  },

  /**
   * Resolve a share token and return sanitized shipment data
   * GET /api/v2/public/share/:token
   */
  resolveShareToken: async (token: string): Promise<SharedShipmentData> => {
    const response = await axiosInstance.get<SharedShipmentData>(API_URL.resolve(token));
    return response.data;
  },
};
