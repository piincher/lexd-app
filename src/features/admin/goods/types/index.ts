/**
 * Goods Feature Types - Comprehensive type definitions
 * Domain-driven design for goods management
 */

import { BaseFilters } from '@src/api/types';
import { userData } from '@src/shared/types/user';

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
  | 'PACKED'
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

export interface GoodsClientDisplayInfo extends Partial<ClientInfo> {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
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
  clientId: string | ClientInfo | null;
  client?: GoodsClientDisplayInfo | null;
  clientName?: string;
  clientPhone?: string;
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
  condition?: 'new' | 'used' | 'damaged';
  intakeException?: {
    isException: boolean;
    reasons: string[];
    notes?: string;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
  };
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
  /** Set by the backend; UNIDENTIFIED when goods were received without a known client (CLIENT_UNKNOWN). */
  ownerStatus?: 'IDENTIFIED' | 'UNIDENTIFIED';
  unidentifiedNotes?: string;
  assignedClientAt?: string;
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
  clientId?: string | null;
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
  condition?: 'new' | 'used' | 'damaged';
  exceptionReasons?: ReceiveExceptionReason[];
  exceptionNotes?: string;
  /** Client-generated key for this submit session — lets the backend short-circuit a
   *  retried request and return the already-saved goods instead of creating a duplicate. */
  idempotencyKey?: string;
  /** Per-receipt WhatsApp opt-out. Default true (notification sent). Set false from the
   *  receive form's "Notifier par WhatsApp" toggle when the client doesn't want a message.
   *  Only affects WhatsApp — push + in-app notifications still fire. */
  notifyWhatsapp?: boolean;
  /** How the photos were obtained (camera vs gallery) — for the server-side
   *  watermark/photo-attestation audit trail. */
  source?: 'camera' | 'gallery';
  /** Client-side capture timestamp of the photos (ISO). */
  capturedAt?: string;
}

export type ReceiveExceptionReason =
  | 'CLIENT_UNKNOWN'
  | 'TRACKING_DOUBTFUL'
  | 'DAMAGED'
  | 'PRICE_TO_CONFIRM'
  | 'PHOTO_MISSING';

export interface DuplicateCandidate {
  _id: string;
  goodsId?: string;
  expressTrackingNumber?: string;
  description?: string;
  weight?: number;
  receivedAt?: string;
  client?: ClientInfo | string | null;
  reasons: string[];
}

/**
 * Input for assigning a client to previously-unidentified goods.
 * The backend re-fires the customer notification once the owner is identified.
 */
export interface AssignClientToGoodsInput {
  goodsId: string;
  clientId: string;
  notes?: string;
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
 * Hook options for receive goods form
 */
export interface UseReceiveGoodsFormOptions {
  initialQuantity?: number;
}

/**
 * Hook return type for receive goods form
 */
export interface UseReceiveGoodsFormReturn {
  formData: GoodsFormData;
  errors: GoodsFormErrors;
  selectedClient: userData | null;
  photoUris: string[];
  useDimensions: boolean;
  setFormField: (field: keyof GoodsFormData, value: string) => void;
  setSelectedClient: (client: userData | null) => void;
  addPhotoUri: (uri: string) => void;
  removePhotoUri: (uri: string) => void;
  setUseDimensions: (use: boolean) => void;
  clearFieldError: (field: keyof GoodsFormErrors) => void;
  clearAllErrors: () => void;
  resetForm: () => void;
  validateForm: () => boolean;
  calculatedCBM: number;
  totalCost: number;
  isFormValid: boolean;
  buildSubmitData: () => ReceiveGoodsInput | null;
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
