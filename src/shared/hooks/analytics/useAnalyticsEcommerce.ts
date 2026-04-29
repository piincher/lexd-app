/**
 * Analytics E-commerce Hook
 *
 * Tracks purchase and transaction events.
 */

import { useCallback } from 'react';
import { trackPurchase } from '../../lib/analytics';

interface PurchaseItem {
  itemId: string;
  itemName: string;
  itemCategory?: string;
  quantity?: number;
  price?: number;
}

export function useAnalyticsEcommerce() {
  const logPurchase = useCallback(async (
    transactionId: string,
    value: number,
    currency: string = 'XOF',
    items?: PurchaseItem[]
  ): Promise<void> => {
    try {
      await trackPurchase(
        transactionId,
        value,
        currency,
        items?.map(item => ({
          item_id: item.itemId,
          item_name: item.itemName,
          item_category: item.itemCategory,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      );
    } catch (error) {
      console.warn('[Analytics] Failed to log purchase:', error);
    }
  }, []);

  return { logPurchase };
}
