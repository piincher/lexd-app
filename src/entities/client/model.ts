/**
 * Client Entity Model
 * Core domain types for the Client entity (customer-facing view)
 */

// ============================================
// CLIENT ORDER (Customer-facing order view)
// ============================================

export interface ClientPackage {
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
  packages: ClientPackage[];
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
  activePackages: ClientPackage[];
  deliveredPackages: ClientPackage[];
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
  package?: ClientPackage;
  currentStatus: string;
  estimatedDelivery?: string;
}

// ============================================
// LIGHTWEIGHT CLIENT REFERENCE
// ============================================

export interface ClientRef {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
