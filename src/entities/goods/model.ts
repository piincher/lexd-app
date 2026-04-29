/**
 * Goods Entity Model
 * Core domain types for the Goods entity
 */

// ============================================
// STATUS & ENUMS
// ============================================

export type GoodsStatus =
  | "RECEIVED_AT_WAREHOUSE"
  | "PACKED"
  | "ASSIGNED_TO_CONTAINER"
  | "LOADED_IN_CONTAINER"
  | "IN_TRANSIT"
  | "ARRIVED_DESTINATION"
  | "READY_FOR_PICKUP"
  | "DELIVERED";

// ============================================
// CORE GOODS ENTITY
// ============================================

export interface GoodsDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface GoodsPaymentHistoryItem {
  paymentId: string;
  amount: number;
  date: string;
}

export interface GoodsContainerRef {
  _id: string;
  virtualContainerNumber: string;
  shippingLine?: string;
  status?: string;
}

export interface GoodsLoadingPosition {
  section?: "FRONT" | "MIDDLE" | "BACK";
  description?: string;
  sequenceNumber?: number;
}

export interface GoodsAirwayBillRef {
  _id: string;
  awbNumber: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate?: string;
  estimatedArrivalDate?: string;
  actualArrivalDate?: string;
  status: string;
}

export interface GoodsClientRef {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Goods {
  _id: string;
  goodsId: string;
  clientId?: GoodsClientRef;
  warehouseLocation: string;
  dimensions?: GoodsDimensions;
  actualCBM: number;
  cbm?: number;
  weight: number;
  quantity: number;
  description: string;
  expressTrackingNumber?: string;
  shippingMode?: "AIR" | "SEA";
  status: GoodsStatus;
  photos: string[];
  images?: string[];
  unitPrice?: number;
  totalCost: number;
  amountPaid?: number;
  balanceDue?: number;
  paymentStatus: "UNPAID" | "PARTIAL" | "PAID";
  paymentHistory?: GoodsPaymentHistoryItem[];
  containerId?: GoodsContainerRef;
  loadingPosition?: GoodsLoadingPosition;
  receivedAt?: string;
  receivedByName?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
  pickedUpBy?: string;
  pickupNotes?: string;
  qrCode?: string;
  qrCodeImageUrl?: string;
  qrCodeData?: string;
  airwayBillId?: GoodsAirwayBillRef;
  createdAt: string;
  location?: GoodsLocation;
}

// ============================================
// LOCATION
// ============================================

export interface GoodsLocation {
  type: "WAREHOUSE" | "CONTAINER";
  warehouseLocation?: string;
  containerInfo?: {
    containerNumber: string;
    shipmentType: "air" | "sea";
  };
}

// ============================================
// FILTERS & RESPONSES
// ============================================

export interface GoodsFilters {
  status?: GoodsStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ScanQRResponse {
  type: "goods" | "container";
  data: Goods | any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

// ============================================
// DTOs
// ============================================

export interface CreateGoodsInput {
  clientId?: string;
  warehouseLocation?: string;
  actualCBM: number;
  cbm?: number;
  weight: number;
  quantity: number;
  description: string;
  photos?: string[];
  images?: string[];
  totalCost?: number;
  containerId?: string;
}

export interface UpdateGoodsInput {
  warehouseLocation?: string;
  actualCBM?: number;
  cbm?: number;
  weight?: number;
  quantity?: number;
  description?: string;
  status?: GoodsStatus;
  photos?: string[];
  totalCost?: number;
  containerId?: string;
  location?: GoodsLocation;
  unitPrice?: number;
  shippingMode?: "AIR" | "SEA";
  dimensions?: { length: number; width: number; height: number };
  receivedByName?: string;
  photosToKeep?: string[];
  newPhotoUris?: string[];
}

// ============================================
// ADMIN GOODS DTOs
// ============================================

export interface ReceiveGoodsInput {
  clientId: string;
  description: string;
  shippingMode?: "AIR" | "SEA";
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  actualCBM?: number;
  weight: number;
  quantity: number;
  unitPrice: number;
  location: string;
  photoUrl?: string;
  receivedByName?: string;
}

export interface UpdateLocationInput {
  location: string;
}

// ============================================
// AIRWAY BILL RELATED (displayed on goods)
// ============================================

export interface AirwayBillGoodsItem {
  _id: string;
  goodsId: string;
  status?: string;
}

export interface TrackingWaypoint {
  _id?: string;
  order: number;
  segmentType: "AIR" | "CUSTOMS" | "WAREHOUSE" | "ROAD" | "CONTAINER";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED" | "CANCELLED";
  description?: string;
  shortName?: string;
  estimatedArrival?: string | null;
  actualArrival?: string | null;
  location: {
    city?: string;
    country?: string;
    portCode?: string;
    warehouse?: string;
  };
}

export interface AirwayBill {
  _id: string;
  awbNumber: string;
  flightNumber?: string;
  airline?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  status: string;
  waypoints?: TrackingWaypoint[];
  currentWaypointIndex?: number;
  waypointProgressPercentage?: number;
  goodsIds: (string | AirwayBillGoodsItem)[];
}
