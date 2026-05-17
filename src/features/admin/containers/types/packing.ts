import { ConsigneeInfo } from './destination';
import { ShippingMode } from './route';

// ============================================
// PACKING LIST TYPES
// ============================================

/**
 * Packing list item (goods detail for document)
 */
export interface PackingListItem {
  itemNo: number;
  goodsId: string;
  description: string;
  clientName: string;
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
 * Packing list summary
 */
export interface PackingListSummary {
  totalItems: number;
  totalCBM: number;
  totalWeight: number;
  totalPackages: number;
}

/**
 * Complete packing list document
 */
export interface PackingList {
  containerNumber: string;
  shippingLine: string;
  shippingMode: ShippingMode;
  shippingLineLabel: string;
  consignee: ConsigneeInfo;
  generatedAt: string;
  generatedBy: string;
  items: PackingListItem[];
  summary: PackingListSummary;
  route: {
    origin: string;
    destination: string;
    estimatedTransitDays: number;
  };
  tracking: {
    status: string;
    statusLabel: string;
    estimatedArrival?: string;
  };
  pickupInstructions?: string;
}
