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
