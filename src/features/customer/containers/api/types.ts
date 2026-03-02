/**
 * Customer Container API Types
 * Request/Response types for container API endpoints
 */

import { CustomerContainer, CustomerContainerFilters } from '../types';

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

/**
 * Response for fetching customer's containers
 */
export interface GetMyContainersResponse {
  containers: CustomerContainer[];
  total: number;
}

/**
 * Response for fetching single container details
 */
export interface GetContainerDetailsResponse {
  container: CustomerContainer;
}

/**
 * Response for fetching container for specific goods
 */
export interface GetContainerForGoodsResponse {
  container: CustomerContainer | null;
  goodsInContainer: {
    goodsId: string;
    _id: string;
  };
}

/**
 * Packing list item for client view
 */
export interface ClientPackingListItem {
  itemNo: number;
  goodsId: string;
  description: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  actualCBM: number;
  weight: number;
  quantity: number;
  photos?: string[];
}

/**
 * Consignee information in packing list
 */
export interface PackingListConsignee {
  name: string;
  phone: string;
  email?: string;
  warehouseAddress: string;
  businessHours?: string;
}

/**
 * Container tracking summary for packing list
 */
export interface PackingListTracking {
  status: string;
  statusLabel: string;
  bookedAt: string;
  departedAt?: string;
  arrivedAt?: string;
  readyForPickupAt?: string;
  estimatedArrival?: string;
}

/**
 * Packing list summary
 */
export interface ClientPackingListSummary {
  totalItems: number;
  totalCBM: number;
  totalWeight: number;
  totalPackages: number;
}

/**
 * Response for client's packing list
 */
export interface ClientPackingListResponse {
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLine: string;
  shippingLineLabel: string;
  route: {
    origin: string;
    destination: string;
    estimatedTransitDays: number;
  };
  consignee: PackingListConsignee;
  tracking: PackingListTracking;
  items: ClientPackingListItem[];
  summary: ClientPackingListSummary;
  generatedAt: string;
  pickupInstructions?: string;
}

// ============================================
// API REQUEST TYPES
// ============================================

/**
 * Query parameters for getting my containers
 */
export interface GetMyContainersParams extends CustomerContainerFilters {
  page?: number;
  limit?: number;
}
