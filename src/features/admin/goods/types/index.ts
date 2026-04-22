/**
 * Goods Feature Types - Comprehensive type definitions
 * Domain-driven design for goods management
 */

import { BaseFilters } from '@src/api/types';

// ============================================
// DOMAIN ENTITIES
// ============================================

/**
 * Goods dimensions in centimeters
 */
export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

/**
 * Goods status enum
 */
export type GoodsStatus =
  | 'RECEIVED_AT_WAREHOUSE'
  | 'ASSIGNED_TO_CONTAINER'
  | 'LOADED_IN_CONTAINER'
  | 'IN_TRANSIT'
  | 'ARRIVED_DESTINATION'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

/**
 * Payment status enum
 */
export type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID';

/**
 * Client information (populated)
 */
export interface ClientInfo {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

/**
 * Container information (populated)
 */
export interface ContainerInfo {
  _id: string;
  virtualContainerNumber: string;
  shippingLine: string;
  status: string;
}

/**
 * Core Goods entity
 */
export interface Goods {
  _id: string;
  goodsId: string;
  clientId: string | ClientInfo;
  receivedBy: string | { firstName?: string; lastName?: string };
  receivedByName?: string;
  receivedAt: string;
  warehouseLocation: string;
  dimensions?: Dimensions;
  actualCBM: number;
  weight: number;
  quantity: number;
  photos: string[];
  images?: string[];
  description: string;
  expressTrackingNumber?: string;
  shippingMode?: 'AIR' | 'SEA';
  status: GoodsStatus;
  containerId?: string | ContainerInfo;
  unitPrice: number;
  totalCost: number;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  qrCodeData: string;
  qrCodeImageUrl?: string;
  airwayBillId?: string | AirwayBillInfo;
  createdAt: string;
  updatedAt: string;
}

export interface AirwayBillInfo {
  _id: string;
  awbNumber: string;
  flightNumber: string;
  status: string;
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * Input for receiving new goods
 */
export interface ReceiveGoodsInput {
  clientId: string;
  description: string;
  shippingMode: 'AIR' | 'SEA';
  dimensions?: Dimensions;
  actualCBM?: number;
  weight: number;
  quantity: number;
  unitPrice: number;
  location: string;
  receivedByName: string;
  expressTrackingNumber?: string;
  receivedDate?: string;
}

/**
 * Input for updating location
 */
export interface UpdateLocationInput {
  location: string;
}

/**
 * Input for updating photo
 */
export interface UpdatePhotoInput {
  photoUri: string;
}

/**
 * Input for assigning to container
 */
export interface AssignToContainerInput {
  containerId: string;
  goodsIds: string[];
}

// ============================================
// FILTER & QUERY TYPES
// ============================================

/**
 * Goods filters extending base filters
 */
export interface GoodsFilters extends BaseFilters {
  status?: GoodsStatus;
  location?: string;
  clientId?: string;
  containerId?: string;
  paymentStatus?: PaymentStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

// ============================================
// UI STATE TYPES
// ============================================

/**
 * Form data for receiving goods
 */
export interface GoodsFormData {
  clientPhone: string;
  description: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  weight: string;
  quantity: string;
  unitPrice: string;
  location: string;
  receivedByName: string;
  expressTrackingNumber: string;
  receivedDate: string;
}

/**
 * Form validation errors
 */
export interface GoodsFormErrors {
  clientPhone?: string;
  description?: string;
  length?: string;
  width?: string;
  height?: string;
  cbm?: string;
  weight?: string;
  quantity?: string;
  unitPrice?: string;
  location?: string;
  receivedByName?: string;
  expressTrackingNumber?: string;
  receivedDate?: string;
}

/**
 * Goods list item (simplified for lists)
 */
export interface GoodsListItem {
  _id: string;
  goodsId: string;
  description: string;
  status: GoodsStatus;
  actualCBM: number;
  totalCost: number;
  photos: string[];
  images?: string[];
  clientName?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Goods API response wrapper
 */
export interface GoodsApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Paginated goods response
 */
export interface PaginatedGoodsResponse {
  goods: Goods[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ============================================
// EVENT/NOTIFICATION TYPES
// ============================================

/**
 * Goods status change event
 */
export interface GoodsStatusChangeEvent {
  goodsId: string;
  previousStatus: GoodsStatus;
  newStatus: GoodsStatus;
  timestamp: string;
  changedBy: string;
}

/**
 * Payment recorded event
 */
export interface PaymentRecordedEvent {
  goodsId: string;
  amount: number;
  previousBalance: number;
  newBalance: number;
  timestamp: string;
}
