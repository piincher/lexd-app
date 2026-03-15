/**
 * Formatters
 * Utility functions for formatting data (dates, status, etc.)
 * Note: formatCurrency is in currency.ts
 */

/**
 * Formats cubic meters (CBM) value with unit
 * @param cbm - The cubic meter value
 * @returns Formatted CBM string or '—' if null/undefined
 */
export const formatCBM = (cbm: number | null | undefined): string => {
  if (cbm === null || cbm === undefined) return '—';

  return `${cbm.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} m³`;
};

/**
 * Formats a date using French locale
 * @param date - Date to format (Date object or ISO string)
 * @returns Formatted date string (DD/MM/YYYY) or '—' if null/undefined
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  if (date === null || date === undefined) return '—';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formats a date and time using French locale
 * @param date - Date to format (Date object or ISO string)
 * @returns Formatted datetime string (DD/MM/YYYY HH:mm) or '—' if null/undefined
 */
export const formatDateTime = (date: Date | string | null | undefined): string => {
  if (date === null || date === undefined) return '—';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Status label mapping for French translations
 */
const STATUS_LABELS: Record<string, string> = {
  // Order statuses
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  DELIVERED: 'Livré',
  CANCELLED: 'Annulé',
  // Payment statuses
  PAID: 'Payé',
  UNPAID: 'Non payé',
  PARTIAL: 'Partiel',
  REFUNDED: 'Remboursé',
  // Shipment statuses
  RECEIVED: 'Reçu',
  PROCESSING: 'En traitement',
  SHIPPED: 'Expédié',
  // Generic
  ACTIVE: 'Actif',
  INACTIVE: 'Inactif',
  COMPLETED: 'Terminé',
};

/**
 * Formats a status code to a human-readable French label
 * @param status - Status code to format
 * @returns Formatted status label or '—' if null/undefined
 */
export const formatStatusLabel = (status: string | null | undefined): string => {
  if (status === null || status === undefined) return '—';

  return STATUS_LABELS[status] || status;
};

/**
 * Formats a tracking code with consistent formatting
 * @param code - Tracking code to format
 * @returns Uppercase tracking code or '—' if null/undefined
 */
export const formatTrackingCode = (code: string | null | undefined): string => {
  if (code === null || code === undefined) return '—';

  return code.toUpperCase().trim();
};
