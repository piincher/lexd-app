const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_COLORS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: '#8B5CF6',
  PACKED: '#3B82F6',
  ASSIGNED_TO_CONTAINER: '#0EA5E9',
  LOADED_IN_CONTAINER: '#06B6D4',
  IN_TRANSIT: '#F59E0B',
  ARRIVED_DESTINATION: '#10B981',
  READY_FOR_PICKUP: '#22C55E',
  DELIVERED: '#059669',
  PENDING: '#6B7280',
  ACTIVE: '#22C55E',
  DRAFT: '#9CA3AF',
  CONFIRMED: '#3B82F6',
  CUSTOMS: '#F59E0B',
  CANCELLED: '#EF4444',
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

export const getStatusColor = (status: string): string => STATUS_COLORS[status.toUpperCase()] || '#6B7280';

export const getStatusLabel = (status: string): string => STATUS_LABELS[status.toUpperCase()] || status;

export const getMonthName = (index: number): string => MONTH_NAMES[index] || '';
