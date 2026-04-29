/**
 * Order Entity Model
 * Core domain types for the Order entity
 */

// ============================================
// BASE TYPES
// ============================================

export type OrderImages = { url: string; public_id: string }[];

export interface OrderCoordinate {
  latitude: string;
  location: string;
  longitude: string;
}

export interface OrderCurrentPosition {
  title: string;
  coordinates: OrderCoordinate[];
  id: string;
  time: string;
}

export type OrderRoute = Array<{
  id: string;
  title: string;
  time: string;
  coordinates: { latitude: number; longitude: number; location: string }[];
}>;

// ============================================
// LEGACY ORDER TYPE
// ============================================

export interface Order {
  clientName: string;
  clientPhone: string;
  packageWeight?: number;
  priceTotal?: number;
  partenaire: string;
  _id?: string;
  images: OrderImages;
  status?: "Active" | "Inactive" | "In Transit" | "Delivered" | "Pending" | "Cancelled";
  quantity?: number;
  shippingMode?: string;
  createdAt?: string;
  currentStatus?: string;
  typeOfPackage?: string;
  currentPosition?: OrderCurrentPosition;
  orderId?: string;
  code?: string;
  route: OrderRoute;
  dateOfReception?: string;
  userId: string;
  departureDate: string;
  category: {
    name: string;
    _id: string;
  };
  updatedAt?: string;
  packageCBM: string;
  dateOfReceipt: string;
  contenairNumber: string;
  paymentStatus?: "Paid" | "Unpaid" | "UNPAID" | "PARTIAL" | "PAID";
  unitPrice: number;
  shipmentLine?: string;
  destinationCountry?: string;
  // Goods-linked order fields
  calculatedTotal?: number;
  calculatedCBM?: number;
  goodsIds?: any[];
  isGoodsLinked?: boolean;
  isManual?: boolean;
  pricingSource?: "manual" | "goods-cbm";
  paidAmount?: number;
  balanceDue?: number;
  totalCost?: number;
  note?: string;
}

// ============================================
// CLIENT ORDER TYPES
// ============================================

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
  shippingMode: "air" | "sea";
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

// ============================================
// PAYMENT RECORD TYPES (linked to orders)
// ============================================

export interface PaymentRecord {
  orderId: string;
  amount: number;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
  proofImages?: string[];
  recordedAt: string;
}

export interface PaymentHistory {
  _id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
  recordedBy: string;
  recordedAt: string;
}
