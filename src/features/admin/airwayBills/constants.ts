import { Theme } from '@src/constants/Theme';
import { AirwayBillStatus, CargoBagStatus } from './types';

export const STATUS_TRANSITIONS: Record<AirwayBillStatus, AirwayBillStatus[]> = {
  CREATED: ['PACKING', 'READY_FOR_DEPARTURE'], PACKING: ['CREATED', 'READY_FOR_DEPARTURE'],
  READY_FOR_DEPARTURE: ['PACKING', 'IN_TRANSIT'], IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['READY_FOR_PICKUP'], READY_FOR_PICKUP: ['DELIVERED'], DELIVERED: [],
};

export const STATUS_LABELS: Record<AirwayBillStatus, string> = {
  CREATED: 'Créé', PACKING: 'Préparation', READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En transit', ARRIVED: 'Arrivé', READY_FOR_PICKUP: 'Prêt pour retrait', DELIVERED: 'Livré',
};

export const CARGO_BAG_STATUS_LABELS: Record<CargoBagStatus, string> = {
  PACKED: 'Emballé',
  CHECKED_IN: 'Enregistré',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  CLEARED: 'Dédouané',
};

export const CARGO_BAG_STATUS_CONFIG: Record<CargoBagStatus, { label: string; color: string }> = {
  PACKED: { label: 'Emballé', color: Theme.colors.text.secondary },
  CHECKED_IN: { label: 'Enregistré', color: '#3B82F6' },
  LOADED: { label: 'Chargé', color: '#D4AF37' },
  IN_TRANSIT: { label: 'En transit', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', color: '#16A34A' },
  CLEARED: { label: 'Dédouané', color: '#4ECDC4' },
};
