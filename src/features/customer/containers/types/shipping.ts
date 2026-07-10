import { ShippingLine, SHIPPING_LINE_LABELS } from '@src/shared/constants/shippingLines';

export { ShippingLine, SHIPPING_LINE_LABELS };

/**
 * Shipping mode
 */
export type ShippingMode = 'SEA' | 'AIR';

/**
 * Shipping mode display labels (French)
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime',
  AIR: 'Aérien',
};
