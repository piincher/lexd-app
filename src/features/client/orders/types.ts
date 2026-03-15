/**
 * Client Orders Types
 */

export type OrderStatus = 'draft' | 'pending' | 'confirmed' | 'in_transit' | 'customs' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  orderCode: string;
  status: OrderStatus;
  totalCBM: number;
  totalCost: number;
  createdAt: string;
  currency?: string;
}

export interface OrderFilters {
  status?: string;
  dateRange?: string;
  searchQuery?: string;
}
