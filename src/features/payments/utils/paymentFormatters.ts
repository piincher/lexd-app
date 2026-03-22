/**
 * Payment Formatters
 * Utility functions for formatting payment data
 */

import { PaymentMethod, PaymentStatus } from '../types';

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
  };
  return icons[method] || 'cash';
};

/**
 * Get status color
 */
export const getPaymentStatusColor = (status: PaymentStatus): string => {
  const colors: Record<PaymentStatus, string> = {
    PENDING: '#F59E0B',
    PROCESSING: '#3B82F6',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    CANCELLED: '#6B7280',
    REFUNDED: '#8B5CF6',
  };
  return colors[status] || '#6B7280';
};

/**
 * Get status label (French)
 */
export const getPaymentStatusLabel = (status: PaymentStatus): string => {
  const labels: Record<PaymentStatus, string> = {
    PENDING: 'En attente',
    PROCESSING: 'En cours',
    COMPLETED: 'Complété',
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
