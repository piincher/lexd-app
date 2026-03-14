/**
 * Customer Orders Types
 */

export type OrderStatus = 'draft' | 'pending' | 'confirmed' | 'in_transit' | 'customs' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  orderNumber: string;
  status: OrderStatus;
  shippingMode: 'air' | 'sea';
  client: {
    name: string;
    phone: string;
    email?: string;
  };
  destination: {
    country: string;
    address: string;
  };
  pricing: {
    total: number;
    currency: string;
  };
  timeline: {
    status: string;
    timestamp: string;
    location?: string;
  }[];
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface OrderFilters {
  status?: string;
  dateRange?: string;
  searchQuery?: string;
}
