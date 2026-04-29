/**
 * Admin Orders Types
 * Type definitions for order management features
 */

import { Goods } from '@src/shared/types';

/**
 * Order totals breakdown data
 */
export interface OrderTotals {
  orderId: string;
  unitPrice: number;
  activeGoods: OrderGoodsItem[];
  voidedGoods: OrderGoodsItem[];
  summary: OrderSummary;
}

/**
 * Individual goods item in order totals breakdown
 */
export interface OrderGoodsItem {
  id: string;
  goodsId: string;
  description: string;
  cbm: number;
  cost: number;
}

/**
 * Summary of order totals
 */
export interface OrderSummary {
  totalGoodsCount: number;
  activeGoodsCount: number;
  voidedGoodsCount: number;
  activeCBM: number;
  voidedCBM: number;
  originalTotal: number;
  currentTotal: number;
}

/**
 * Route params for OrderTotalsBreakdown screen
 */
export interface OrderTotalsBreakdownRouteParams {
  orderId: string;
}

import type { imagesType } from '@src/shared/types/order';

export interface OrderFormValues {
  clientName: string;
  clientPhone: string;
  packageWeight: string;
  priceTotal?: number;
  partenaire: string;
  images?: imagesType;
  status?: string;
  quantity?: number;
  shippingMode?: string;
  createdAt?: string;
  typeOfPackage?: string;
  currentPosition?: {
    id: string;
    title: string;
  };
  orderId?: string;
  unitPrice: number;
}

/**
 * Route params for PaymentDetailScreen
 */
export interface PaymentDetailRouteParams {
  paymentId: string;
  orderId?: string;
  orderCode: string;
  clientName: string;
  clientPhone?: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
  referenceNumber?: string;
  receiptNumber?: string;
  notes?: string;
  receiptUrl?: string;
  proofImages?: string[];
  goodsIds?: Array<{
    goodsId: string;
    description: string;
  }>;
}
