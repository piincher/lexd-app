import { amber, green, ink, semantic } from '@src/shared/constants/brand';

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_COLORS: Record<string, string> = {
  // NOTE: no brand token exists for the warehouse/container categorical hues — kept, flagged for design.
  RECEIVED_AT_WAREHOUSE: '#8B5CF6',
  PACKED: semantic.info,
  ASSIGNED_TO_CONTAINER: '#0EA5E9',
  LOADED_IN_CONTAINER: '#06B6D4',
  IN_TRANSIT: amber[500],
  ARRIVED_DESTINATION: green[400],
  READY_FOR_PICKUP: green[500],
  DELIVERED: green[700],
  PENDING: ink[400],
  ACTIVE: green[500],
  DRAFT: ink[300],
  CONFIRMED: semantic.info,
  CUSTOMS: amber[500],
  CANCELLED: semantic.error,
};

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'Recu',
  PACKED: 'Emballe',
  ASSIGNED_TO_CONTAINER: 'Assigne',
  LOADED_IN_CONTAINER: 'Charge',
  IN_TRANSIT: 'Transit',
  ARRIVED_DESTINATION: 'Arrive',
  READY_FOR_PICKUP: 'Retrait',
  DELIVERED: 'Livre',
  PENDING: 'En attente',
  ACTIVE: 'Actif',
  DRAFT: 'Brouillon',
  CONFIRMED: 'Confirme',
  CUSTOMS: 'Douane',
  CANCELLED: 'Annule',
};

export const getStatusColor = (status: string): string => STATUS_COLORS[status.toUpperCase()] || ink[400];

export const getStatusLabel = (status: string): string => STATUS_LABELS[status.toUpperCase()] || status;

export const getMonthName = (index: number): string => MONTH_NAMES[index] || '';
