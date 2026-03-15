import type { Order, OrderTotals, OrderGoods } from '@src/shared/types';

export type { Order, OrderTotals, OrderGoods };

/**
 * Order with goods details response
 */
export interface OrderWithGoods {
  order: Order;
  goods: OrderGoods[];
}

/**
 * Order with separated active/void goods
 */
export interface OrderWithGoodsSeparated {
  order: Order;
  activeGoods: OrderGoods[];
  voidedGoods: OrderGoods[];
  voidHistory: VoidHistoryItem[];
}

/**
 * Void history item
 */
export interface VoidHistoryItem {
  id: string;
  goodsId: string;
  reason: string;
  voidedAt: string;
  voidedBy: string;
}

/**
 * Order totals breakdown response
 */
export interface OrderTotalsBreakdown {
  orderId: string;
  unitPrice: number;
  activeGoods: OrderGoods[];
  voidedGoods: OrderGoods[];
  summary: {
    totalGoodsCount: number;
    activeGoodsCount: number;
    voidedGoodsCount: number;
    activeCBM: number;
    voidedCBM: number;
    originalTotal: number;
    currentTotal: number;
  };
}
