import { ShippingMode } from './route';
import { ShippingLine, SHIPPING_LINE_LABELS } from '@src/shared/constants/shippingLines';
import type { ThemeContextType } from '@src/constants/Theme';

export { ShippingLine, SHIPPING_LINE_LABELS };

/**
 * Shipping mode display names
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime (SEA)',
  AIR: 'Aérien (AIR)',
};

/**
 * Shipping mode icons
 */
export const SHIPPING_MODE_ICONS: Record<ShippingMode, string> = {
  SEA: 'boat',
  AIR: 'airplane',
};

/**
 * Shipping mode colors (theme-aware)
 * @param colors - Theme colors
 * @returns Record of shipping mode colors
 */
export const getShippingModeColors = (colors: ThemeContextType['colors']): Record<ShippingMode, string> => ({
  SEA: colors.status.info,
  AIR: colors.accent.sky,
});
