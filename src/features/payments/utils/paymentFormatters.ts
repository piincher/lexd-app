/**
 * Payment Formatters
 * Utility functions for formatting payment data
 */

import { Theme } from '@src/constants/Theme';
import type { AppTheme } from '@src/constants/Theme';
import { PaymentMethod, PaymentStatus } from '../types';

type ThemeColors = AppTheme['colors'];

/**
 * Format payment amount with currency
 */
export const formatPaymentAmount = (amount: number, currency: string): string => {
  return `${amount.toLocaleString('fr-FR')} ${currency}`;
};

/**
 * Format payment date
 */
export const formatPaymentDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format payment time
 */
export const formatPaymentTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format payment date and time
 */
export const formatPaymentDateTime = (dateString: string): string => {
  return `${formatPaymentDate(dateString)} à ${formatPaymentTime(dateString)}`;
};

/**
 * Get payment method display name (French)
 */
export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    ORANGE_MONEY: 'Orange Money',
    WAVE: 'Wave',
    CARD: 'Carte Bancaire',
    CASH: 'Espèces',
    REWARD_POINTS: 'Points récompense',
  };
  return labels[method] || method;
};

/**
 * Get payment method icon name
 */
export const getPaymentMethodIcon = (method: PaymentMethod): string => {
  const icons: Record<PaymentMethod, string> = {
    ORANGE_MONEY: 'cellphone',
    WAVE: 'wave',
    CARD: 'credit-card',
    CASH: 'cash',
    REWARD_POINTS: 'ticket-percent',
  };
  return icons[method] || 'cash';
};

/**
 * Get status color.
 * Pass theme `colors` object for theme-aware colors; otherwise falls back to static hex values.
 */
export const getPaymentStatusColor = (status: PaymentStatus, themeColors?: ThemeColors): string => {
  if (themeColors) {
    const mapping: Record<PaymentStatus, string> = {
      PENDING: themeColors.status.warning,
      PROCESSING: themeColors.status.info,
      COMPLETED: themeColors.status.success,
      FAILED: themeColors.status.error,
      CANCELLED: themeColors.text.disabled,
      REFUNDED: themeColors.primary.main,
    };
    return mapping[status] || themeColors.text.disabled;
  }
  const fallback: Record<PaymentStatus, string> = {
    PENDING: Theme.colors.status.warning,
    PROCESSING: Theme.colors.status.info,
    COMPLETED: Theme.colors.status.success,
    FAILED: Theme.colors.status.error,
    CANCELLED: Theme.colors.text.disabled,
    REFUNDED: Theme.colors.primary.main,
  };
  return fallback[status] || Theme.colors.text.disabled;
};

/**
 * Get status label (French)
 */
export const getPaymentStatusLabel = (status: PaymentStatus): string => {
  const labels: Record<PaymentStatus, string> = {
    PENDING: 'En attente',
    PROCESSING: 'En cours',
    COMPLETED: 'Payé',
    FAILED: 'Échoué',
    CANCELLED: 'Annulé',
    REFUNDED: 'Remboursé',
  };
  return labels[status] || status;
};

/**
 * Mask phone number for display
 */
export const maskPhoneNumber = (phone: string): string => {
  if (phone.length < 8) return phone;
  return phone.slice(0, 4) + '••••' + phone.slice(-4);
};

/**
 * Format transaction reference (truncate if too long)
 */
export const formatTransactionRef = (ref: string): string => {
  if (ref.length <= 12) return ref;
  return ref.slice(0, 6) + '...' + ref.slice(-6);
};
