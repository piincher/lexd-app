// Import types from shared types (single source of truth)
// This avoids cross-feature imports that can cause circular dependencies
import type {
  Goods,
  GoodsStatus,
  GoodsFilters,
} from '@src/shared/types';

// Re-export shared types for admin goods API
export type { Goods, GoodsStatus, GoodsFilters };

/**
 * Input for receiving new goods
 */
export interface ReceiveGoodsInput {
  clientId?: string | null;
  description: string;
  shippingMode?: 'AIR' | 'SEA';
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  actualCBM?: number;
  weight?: number;
  quantity: number;
  unitPrice: number;
  location: string;
  photoUrl?: string;
  receivedByName?: string;
  expressTrackingNumber?: string;
  receivedDate?: string;
  condition?: 'new' | 'used' | 'damaged';
  exceptionReasons?: string[];
  exceptionNotes?: string;
  idempotencyKey?: string;
  /** Per-receipt WhatsApp opt-out. Missing/true keeps the default send behavior. */
  notifyWhatsapp?: boolean;
}

/**
 * Input for updating location
 */
export interface UpdateLocationInput {
  location: string;
}
